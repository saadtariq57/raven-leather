import { NextRequest } from "next/server";
import { prisma } from "../../DB/db.config";

export async function createAddress(request: NextRequest) {
    const { user_id, fullName, email, phoneNo, address, city, countryRegion } = await request.json();

    if (!user_id || !fullName || !email || !phoneNo || !address || !city || !countryRegion) {
        throw new Error("All fields are required.");
    }

    return await prisma.address.create({
        data: { user_id, fullName, email, phoneNo, address, city, countryRegion }
    });
}

export async function getAddressByUser(userId: number) {
    return await prisma.address.findFirst({
        where: { user_id: userId }
    });
}

export async function updateAddress(request: NextRequest) {
    const { user_id, fullName, email, phoneNo, address, city, countryRegion } = await request.json();

    return await prisma.address.update({
        where: { user_id: Number(user_id) },
        data: { fullName, email, phoneNo, address, city, countryRegion }
    });
}

export async function deleteAddress(addressId: number) {
    return await prisma.address.delete({
        where: { id: addressId }
    });
}
