// /src/app/api/books/[id]/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("bookStore"); // Make sure this matches your MongoDB DB name

    // Try to find by string ID first (as in the JSON data)
    let book = await db.collection("books").findOne({ id: id });

    // If not found and id is valid ObjectId, try that
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
