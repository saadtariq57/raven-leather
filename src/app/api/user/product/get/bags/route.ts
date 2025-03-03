// /app/api/user/product/get/Bags/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../../../../DB/db.config";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "20", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const sort = searchParams.get("sort") || "relevance";

  // Determine the orderBy clause based on the sort parameter.
  // We type-cast the sort order values so that they are recognized as literal types.
  let orderByClause: { price?: "asc" | "desc"; id?: "asc" | "desc" } = {};
  if (sort === "low-to-high") {
    orderByClause = { price: "asc" as const };
  } else if (sort === "high-to-low") {
    orderByClause = { price: "desc" as const };
  } else {
    // "relevance" or any unrecognized value defaults to latest products.
    orderByClause = { id: "desc" as const };
  }

  try {
    const products = await prisma.product.findMany({
      where: { category: "bag" },
      include: { images: true, sizes: true },
      skip,
      take: limit,
      orderBy: orderByClause,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Bags fetched successfully.",
        products,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error occurred while fetching Bags: " + error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred while fetching Bags: " + error.message,
      },
      { status: 500 }
    );
  }
}
