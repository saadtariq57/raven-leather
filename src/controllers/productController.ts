import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../DB/db.config";
import { deleteFile_from_Cloudinary, uploadStream_to_Cloudinary } from "@/utils/file-upload/cloudinary";
import { generateSlug } from "@/lib/generateSlug";

export const createProduct = async (request: NextRequest) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const color = formData.get("color") as string;
    const priceString = formData.get("price") as string;
    const price = Number(priceString);
    const quantity = Number(formData.get("quantity") as string);
    const description = formData.get("description") as string;
    const status = (formData.get("status") as string) === "true";
    const category = formData.get("category") as string;
    const sizes = JSON.parse(formData.get("sizes") as string);
    const imageFiles = formData.getAll("images") as File[];

    if (imageFiles && imageFiles.length > 0) {
        const cloudinaryUploads = await Promise.all(
            imageFiles.map(async (imageFile) => {
                // Convert file to buffer
                const fileBuffer = await imageFile.arrayBuffer();
                const buffer = Buffer.from(fileBuffer);

                // Upload to Cloudinary
                const imageUploaded = await uploadStream_to_Cloudinary(buffer)
                return imageUploaded;
            })
        )

        // Create product WITHOUT slug first, so we get the generated ID
        const newProduct = await prisma.product.create({
            data: {
                name,
                color,
                price,
                quantity: quantity || null, // Only if there's a single quantity (no sizes)
                sizes: sizes
                    ? {
                        create: sizes.map((size: { size: string; quantity: number }) => ({
                            size: size.size,
                            quantity: size.quantity,
                        })),
                    }
                    : undefined,
                images: {
                    create: cloudinaryUploads.map((upload: any) => ({
                        public_id: upload.public_id,
                        display_name: upload.display_name,
                        url: upload.url,
                    })),
                },
                description,
                status,
                category,
            },
        });

        if (!newProduct) {
            return NextResponse.json({ success: false, message: "Failed to add product." }, { status: 500 });
        }

        // Generate slug using the product ID
        const slug = generateSlug(name, newProduct.id);

        // Update the product with the slug
        const productWithSlug = await prisma.product.update({
            where: { id: newProduct.id },
            data: { slug },
        });

        return NextResponse.json({
            success: true,
            message: "Product created successfully.",
            product: productWithSlug,
        }, { status: 200 })
    }
}

export const getProduct = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id
        },
        include: {
            sizes: true,
            images: true
        }
    });


    if (product) {
        return NextResponse.json({
            success: true,
            message: "Product fetched successfully.",
            product,
        }, { status: 200 })
    }
}

export const getProductDirect = async (id: number) => {
    const product = await prisma.product.findFirst({
        where: {
            id
        },
        include: {
            sizes: true,
            images: true
        }
    });

    if (!product) {
        throw new Error(`Product with ID ${id} not found`);
    }

    return product;

}

export const updateProduct = async (id: number, request: NextRequest) => {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const color = formData.get("color") as string;
    const priceString = formData.get("price") as string;
    const price = Number(priceString);
    const description = formData.get("description") as string;
    const status = (formData.get("status") as string) === "true";
    const category = formData.get("category") as string;
    const quantity = Number(formData.get("quantity") as string);
    const sizes = JSON.parse(formData.get("sizes") as string);
    const imageFiles = formData.getAll("images") as File[];

    // Fetch the existing product
    const existingProduct = await prisma.product.findUnique({
        where: { id },
        include: { images: true },
    });

    if (!existingProduct) {
        return NextResponse.json({ success: false, message: "Product not found." }, { status: 404 });
    }

    // Handle Image Updates
    if (imageFiles && imageFiles.length > 0) {
        // Upload new images
        const cloudinaryUploads = await Promise.all(
            imageFiles.map(async (imageFile) => {
                // Convert file to buffer
                const fileBuffer = await imageFile.arrayBuffer();
                const buffer = Buffer.from(fileBuffer);

                // Upload to Cloudinary
                const imageUploaded = await uploadStream_to_Cloudinary(buffer)
                return imageUploaded;
            })
        )

        // Delete old images from Cloudinary
        await Promise.all(
            existingProduct.images.map(async (image) => await deleteFile_from_Cloudinary(image.public_id))
        );

        // Remove old images from DB
        await prisma.image.deleteMany({ where: { product_id: id } });

        // Add new images to the update
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                name,
                color,
                price,
                quantity: quantity || null,
                sizes: sizes
                    ? {
                        updateMany: sizes.map((size: any) => ({
                            where: { size: size.size },
                            data: { quantity: size.quantity },
                        })),
                    }
                    : undefined,
                images: {
                    create: cloudinaryUploads.map((upload: any) => ({
                        public_id: upload.public_id,
                        display_name: upload.display_name,
                        url: upload.url,
                    })),
                },
                description,
                status,
                category,
            },
            include: { sizes: true },
        });

        return NextResponse.json({
            success: true,
            message: "Product updated successfully.",
            updatedProduct,
        }, { status: 200 });
    }

    // If no new images, update everything except images
    const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
            name,
            color,
            price,
            quantity: quantity || null,
            sizes: sizes
                ? {
                    updateMany: sizes.map((size: any) => ({
                        where: { size: size.size },
                        data: { quantity: size.quantity },
                    })),
                }
                : undefined,
            description,
            status,
            category,
        },
        include: { sizes: true },
    });

    return NextResponse.json({
        success: true,
        message: "Product updated successfully.",
        updatedProduct,
    }, { status: 200 });
};



export const deleteProduct = async (id: number) => {
    const deletedProdect = await prisma.product.delete({
        where: {
            id
        },
        include: {
            images: true
        }
    });

    if (deletedProdect) {
        const cloudinaryDeleted = await Promise.all(
            deletedProdect.images.map(async (image) => {
                return await deleteFile_from_Cloudinary(image.public_id);
            })
        )

        if (cloudinaryDeleted) {
            return NextResponse.json({
                success: true,
                message: "Product deleted successfully.",
            }, { status: 200 })
        }

    }
}

export const getBestSellingProducts = async () => {
    const products = await prisma.product.findMany({
        orderBy: {
            allTimeSales: "desc"
        },
        take: 3,
        include: {
            images: true
        }
    });

    if (products) {
        return NextResponse.json({
            success: true,
            message: "Most selling products fetched successfully.",
            products,
        }, { status: 200 })
    }
}
