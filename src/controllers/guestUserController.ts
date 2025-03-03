import { prisma } from "../../DB/db.config";

export async function create_guestUser( session_id: string ) {
    const guestUser = await prisma.guestUser.create({
        data: {
            session_id,
            expiresAt: new Date( Date.now() + 3600000 )
        }
    });

    return guestUser
}

export async function get_guestUser( session_id: string ) {
    const guestUser = await prisma.guestUser.findUnique({
        where: {
            session_id,
        }
    });

    return guestUser
}

export async function delete_guestUser( session_id: string ) {
    const guestUserDeleted = await prisma.guestUser.delete({
        where: {
            session_id
        }
    });

    if(guestUserDeleted){
        return true;
    }
}