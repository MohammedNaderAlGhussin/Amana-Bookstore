export const getBooks = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

// src/services/bookServices.ts
export async function getBook(id: string) {
  if (!id) throw new Error("Book ID is required");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch book: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
