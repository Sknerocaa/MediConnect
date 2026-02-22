import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientOptions = process.env.DATABASE_URL 
  ? undefined 
  : { datasources: { db: { url: "postgresql://mock:mock@localhost:5432/mock" } } };

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
