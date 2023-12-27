import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    // @ts-ignore
    if (!global.prisma) {
        // @ts-ignore    
        global.prisma = new PrismaClient();
    }
    // @ts-ignore
    prisma = global.prisma;
} else {
    prisma = new PrismaClient();
}

export default prisma;
