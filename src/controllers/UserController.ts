import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../DB/db.config"

// export const createUser = async (request: NextRequest) => {
//     const { fullName, email, password } = await request.json();

//     //If user does not exists, create new user
//     const newUser = await prisma.user.create({
//         data: {
//             fullName,
//             email: email,
//             password: password
//         }
//     });

//     if(newUser){
//         return NextResponse.json({
//             success: true,
//             message: "New user created."
//         }, { status: 200 })
//     }
// }

export const getUser = async (id: number) => {
    const user = await prisma.user.findFirst({ 
        where: {
            id: id,
        }
     });

    return user;
}

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        where: {
            isVerified: true
        },
        include: {
            address: true
        }
    });
    return users;
}

export const updateUser = async (request: NextRequest, id: any) => {
    
    const { fullName, email, password } = await request.json();

    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            fullName,
            email,
            password
        }
    });

    if(updatedUser){
        return NextResponse.json({
            success: true,
            message: "User updated successfully.",
            data: updatedUser
        }, { status: 200 })
    }
}

export const deleteUser = async (id: number) => {
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })

    return deleteUser
}