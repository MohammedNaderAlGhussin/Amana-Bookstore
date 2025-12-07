import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    let query = {};
    if (bookId) {
      query = { bookId: bookId };
    }

    const reviews = await db.collection("reviews").find(query).toArray();

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookId, author, rating, title, comment, verified } = body;

    // Basic validation
    if (!bookId || !author || !rating || !title || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newReview = {
      bookId,
      author,
      rating,
      title,
      comment,
      verified: verified || false,
      timestamp: new Date().toISOString(),
      id: `review-${Date.now()}`, // Generate a simple ID if needed, or rely on _id
    };

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    await db.collection("reviews").insertOne(newReview);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}
