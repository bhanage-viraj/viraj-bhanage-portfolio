import { execFile } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { getJob, RESUME_FILE } from "@/lib/intern-tracker";

const execFileAsync = promisify(execFile);
const FOLDER = /^[A-Za-z0-9._-]+$/;

type Body = { id?: string };

export async function POST(request: Request) {
  if (process.env.VERCEL || process.platform !== "darwin") {
    return Response.json(
      { opened: false, reason: "local-mac" },
      { status: 409 },
    );
  }

  let body: Body = {};
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ opened: false }, { status: 400 });
  }

  const job = body.id ? getJob(body.id) : undefined;
  if (!job || !FOLDER.test(job.resume)) {
    return Response.json({ opened: false }, { status: 404 });
  }

  const root = path.resolve(process.cwd(), "resumes", "pdf");
  const filePath = path.resolve(root, job.resume, RESUME_FILE);
  if (!filePath.startsWith(`${root}${path.sep}`)) {
    return Response.json({ opened: false }, { status: 400 });
  }

  try {
    await access(filePath);
    await execFileAsync("open", [filePath]);
    return Response.json({ opened: true, file: `${job.resume}/${RESUME_FILE}` });
  } catch {
    return Response.json(
      { opened: false, file: `${job.resume}/${RESUME_FILE}` },
      { status: 404 },
    );
  }
}
