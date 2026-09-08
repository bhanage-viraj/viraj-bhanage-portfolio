import { loadMarks, upsertMark, type JobMark } from "@/lib/intern-marks";
import type { JobStatus } from "@/lib/intern-tracker";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const headers = { "Cache-Control": "no-store" };

type Body = Partial<JobMark> & {
  id?: string;
  clear?: boolean;
};

export async function GET() {
  try {
    const marks = await loadMarks();
    return Response.json({ marks }, { headers });
  } catch {
    return Response.json({ marks: {}, error: "read-failed" }, { status: 503, headers });
  }
}

export async function POST(request: Request) {
  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "bad-json" }, { status: 400, headers });
  }

  if (!body.id) {
    return Response.json({ error: "missing-id" }, { status: 400, headers });
  }

  try {
    const marks = await upsertMark(body.id, {
      status: body.status as JobStatus | undefined,
      appliedOn: body.appliedOn,
      note: body.note,
      clear: body.clear,
    });
    return Response.json({ marks }, { headers });
  } catch (error) {
    const message = error instanceof Error ? error.message : "write-failed";
    const status =
      message === "unknown-job" || message === "bad-status" ? 400 : 503;
    return Response.json({ error: message }, { status, headers });
  }
}
