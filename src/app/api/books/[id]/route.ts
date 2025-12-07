// /src/app/api/books/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // <-- Next.js 16 requires await

  if (!id) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookStore"); // make sure DB name is correct

    // Try to find by string ID first (as in the JSON data)
    let book = await db.collection("books").findOne({ id: id });

    // If not found and the id is an ObjectId, try that
    if (!book && ObjectId.isValid(id)) {
      book = await db.collection("books").findOne({ _id: new ObjectId(id) });
    }

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}
