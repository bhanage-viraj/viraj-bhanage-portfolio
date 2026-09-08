import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import {
  INTERN_DESK_COOKIE,
  internDeskSlug,
} from "@/lib/intern-desk-guard";
import { getJob } from "@/lib/intern-tracker";

type Params = { id: string };

export async function GET(
  _request: Request,
  { params }: { params: Promise<Params> },
) {
  const slug = internDeskSlug();
  if (process.env.NODE_ENV === "production") {
    const token = (await cookies()).get(INTERN_DESK_COOKIE)?.value;
    if (!slug || token !== slug) {
      return new Response("Not found", { status: 404 });
    }
  }

  const { id } = await params;
  const job = getJob(id);
  if (!job) {
    return new Response("Not found", { status: 404 });
  }

  const filePath = path.join(
    process.cwd(),
    "resumes",
    "pdf",
    job.resume,
  );

  try {
    const file = await readFile(filePath);
    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${job.resume}"`,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  } catch {
    return new Response("Resume missing", { status: 404 });
  }
}
