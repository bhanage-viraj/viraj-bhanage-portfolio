import { get, put } from "@vercel/blob";
import { getJob, type JobStatus } from "@/lib/intern-tracker";

export type JobMark = {
  status: JobStatus;
  appliedOn?: string;
  note?: string;
};

export type Marks = Record<string, JobMark>;

const PATH = "intern-desk/marks.json";

const STATUSES = new Set<JobStatus>([
  "to_apply",
  "applied",
  "interview",
  "offer",
  "rejected",
  "hold",
]);

function blobReady() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.BLOB_STORE_ID ||
      process.env.VERCEL_OIDC_TOKEN,
  );
}

function isStatus(value: unknown): value is JobStatus {
  return typeof value === "string" && STATUSES.has(value as JobStatus);
}

function parseMarks(raw: unknown): Marks {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const next: Marks = {};
  for (const [id, value] of Object.entries(raw as Record<string, unknown>)) {
    if (!getJob(id) || !value || typeof value !== "object" || Array.isArray(value)) {
      continue;
    }
    const row = value as Record<string, unknown>;
    if (!isStatus(row.status)) continue;
    const mark: JobMark = { status: row.status };
    if (typeof row.appliedOn === "string" && row.appliedOn.trim()) {
      mark.appliedOn = row.appliedOn.trim();
    }
    if (typeof row.note === "string") mark.note = row.note;
    next[id] = mark;
  }
  return next;
}

async function readBlob(): Promise<Marks> {
  if (!blobReady()) return {};
  const result = await get(PATH, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return {};
  const text = await new Response(result.stream).text();
  if (!text.trim()) return {};
  try {
    const parsed = JSON.parse(text) as unknown;
    if (parsed && typeof parsed === "object" && "marks" in parsed) {
      return parseMarks((parsed as { marks: unknown }).marks);
    }
    return parseMarks(parsed);
  } catch {
    return {};
  }
}

async function writeBlob(marks: Marks) {
  if (!blobReady()) {
    throw new Error("marks-store-missing");
  }
  await put(PATH, JSON.stringify({ marks, updatedAt: new Date().toISOString() }), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
    contentType: "application/json",
  });
}

export async function loadMarks(): Promise<Marks> {
  return readBlob();
}

export async function upsertMark(
  id: string,
  patch: Partial<JobMark> & { clear?: boolean },
): Promise<Marks> {
  if (!getJob(id)) throw new Error("unknown-job");
  if (patch.status && !isStatus(patch.status)) throw new Error("bad-status");

  const marks = await readBlob();
  if (patch.clear) {
    delete marks[id];
    await writeBlob(marks);
    return marks;
  }

  const current = marks[id] ?? {
    status: getJob(id)?.status ?? "to_apply",
  };
  const next: JobMark = {
    status: patch.status ?? current.status,
    appliedOn:
      patch.appliedOn !== undefined ? patch.appliedOn : current.appliedOn,
    note: patch.note !== undefined ? patch.note : current.note,
  };
  if (!next.appliedOn) delete next.appliedOn;
  if (!next.note) delete next.note;
  marks[id] = next;
  await writeBlob(marks);
  return marks;
}
