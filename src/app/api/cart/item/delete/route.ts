import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../DB/db.config";

export async function POST(request: NextRequest) {
  try {
    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No ids provided." },
        { status: 400 }
      );
    }

    const result = await prisma.cartItem.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    if (result.count > 0) {
      return NextResponse.json(
        { success: true, message: "Cart items deleted." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, message: "No cart items deleted." },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Error occurred while deleting cart items: " + error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Error occurred while deleting cart items: " + error.message,
      },
      { status: 500 }
    );
  }
}
