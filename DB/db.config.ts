import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient({
    log: ["query"],
    omit: {
        user: {
            password: true
        }
    }
})