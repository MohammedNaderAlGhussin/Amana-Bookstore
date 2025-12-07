import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // change to your domain if needed
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const ids = searchParams.get("ids");

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    let query = {};
    if (ids) {
      const idList = ids.split(",");
      query = { id: { $in: idList } };
    }

    const books = await db.collection("books").find(query).toArray();

    return new NextResponse(JSON.stringify(books), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Error fetching books:", error);

    return new NextResponse(
      JSON.stringify({ error: "Failed to fetch books" }),
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}

// Required for CORS preflight
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}
