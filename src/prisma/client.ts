import { PrismaClient } from '@prisma/client'

const createPrismaClient = ()=>{
    const prisma = new PrismaClient();
    return prisma
}

export default createPrismaClient()