import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

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

    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
