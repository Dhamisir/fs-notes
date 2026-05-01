import { NextResponse } from "next/server";
import { getNotionData } from "@/utils/externalApi/notion";

let NOTION_DATA_RESPONSE = [];
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const refreshKey = searchParams.get("refreshKey");
    const shouldBypassCache = Boolean(refreshKey);

    let data = [];
    if (!shouldBypassCache && NOTION_DATA_RESPONSE.length > 0) {
      data = NOTION_DATA_RESPONSE;
    } else {
      NOTION_DATA_RESPONSE = await getNotionData();
      data = NOTION_DATA_RESPONSE;
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error("fetchMocks API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch mock data" },
      { status: 500 },
    );
  }
}
