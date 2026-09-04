import { NextResponse } from "next/server";
import { scrapeKaggleProfile } from "@/lib/kaggle";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const stats = await scrapeKaggleProfile();
  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
