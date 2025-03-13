import { NextRequest } from "next/server";
import { prisma } from "../../DB/db.config";
import { auth } from "@/auth";

export async function addCartItem(request: NextRequest) {
    /* session_id is directly stored in cookies whereas to get user_id, first you
          need to fetch it from the auth() */

    const { product_id, quantity, size } = await request.json();

    const response = await auth();
    const user_id = Number(response?.user.id);
    const session_id = request.headers.get("x-session-id");

    if (!user_id && !session_id) {
        throw new Error("Both user_id and session_id cannot be null.");
    }

    if (user_id) {
         // Check if the cart item exists
         const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                user_product_unique: {
                    user_id,
                    product_id,
                    size: size || "", 
                }
            }
        });

        const cartItem = await prisma.cartItem.upsert({
            where: {
                user_product_unique: {
                    user_id,
                    product_id,
                    size: size || "",

                },
            },
            update: {
                quantity: {
                    increment: quantity,
                },
            },
            create: {
                user_id,
                product_id,
                quantity,
                size: size || "",
            },
        });

        if(!existingCartItem){
            return { cartItem, status: "new"}
        }

        return {cartItem, status: "updated"};
    }

    if (session_id && !user_id) {
         // Check if the cart item exists
         const existingCartItem = await prisma.cartItem.findUnique({
            where: {
                session_product_unique: {
                    session_id,
                    product_id,
                    size: size || "", 
                }
            }
        });

        const cartItem = await prisma.cartItem.upsert({
            where: {
                session_product_unique: {
                    session_id,
                    product_id,
                    size: size || "",

                },
            },
            update: {
                quantity: {
                    increment: quantity,
                }
            },
            create: {
                session_id,
                product_id,
                quantity,
                size: size || "",
            },
        });

        if(!existingCartItem){
            return { cartItem, status: "new"}
        }

        return {cartItem, status: "updated"};
    }
}

export async function incrementCartItemQuantity(cartItem_id: number) {
    const cartItem = await prisma.cartItem.update({
        where: {
            id: cartItem_id,
        },
        data: {
            quantity: {
                increment: 1,
            },
        },
    });

    return cartItem;
}

export async function decrementCartItemQuantity(id: number) {
    const cartItem = await prisma.cartItem.update({
        where: {
            id,
        },
        data: {
            quantity: {
                decrement: 1,
            },
        },
    });

    // If quantity is decreased to 0 then it should be deleted
    if (cartItem.quantity < 1) {
        await prisma.cartItem.delete({
            where: { id },
        });

        return true;
    } else {
        return cartItem;
    }
}

export async function deleteCartItem(id: number) {
    const cartItemDeleted = await prisma.cartItem.delete({
        where: {
            id,
        },
    });

    if (cartItemDeleted) {
        return true;
    }
}
export async function deleteManyCartItems(ids: number[]) {    
    const cartItemDeleted = await prisma.cartItem.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
    
    return cartItemDeleted;
}

// Fetching cart items with Ids
export async function getCartItemsByIds(ids: number[]) {
    
    const cartItems = await prisma.cartItem.findMany({
        where: {
            id: {
                in: ids,
            }
        },
        include: {
            product: {
                include: {
                    images: true,
                    sizes: true,
                },
            },
        },
    });

    return cartItems;
}


// Fetching a specific user's cart items
export async function getUserCartItems(user_id: number) {
    const cartItems = await prisma.cartItem.findMany({
        where: {
            user_id,
        },
        include: {
            product: {
                include: {
                    images: true,
                    sizes: true,
                },
            },
        },
    });

    return cartItems;
}

// Fetching a guest user's cart items
export async function getGuestCartItems(session_id: string) {
    const cartItems = await prisma.cartItem.findMany({
        where: {
            session_id,
        },
        include: {
            product: {
                include: {
                    images: true,
                    sizes: true,
                },
            },
        },
    });

    return cartItems;
}

export async function getUserCartItemsCount(user_id: number) {
    const cartItems = await prisma.cartItem.count({
        where: {
            user_id,
        },
    });

    return cartItems;
}

// Fetching a guest user's cart items
export async function getGuestCartItemsCount(session_id: string) {
    const cartItems = await prisma.cartItem.count({
        where: {
            session_id,
        },
    });

    return cartItems;
}
