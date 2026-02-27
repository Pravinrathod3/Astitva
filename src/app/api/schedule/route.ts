import { NextResponse } from "next/server";
import { getScheduleData } from "@/data/events";

// GET /api/schedule
export async function GET(req: Request) {
  try {
    // Return the schedule data directly from the shared data source
    const data = getScheduleData();

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("/api/schedule error:", err);
    return NextResponse.json({ error: "Failed to fetch schedule" }, { status: 500 });
  }
}
