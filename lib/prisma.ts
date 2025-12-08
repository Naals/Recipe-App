// lib/prisma.ts

import { PrismaPg } from "@prisma/adapter-pg";
import {env} from "prisma/config";
import {PrismaClient} from "@/generated/client";

const adapter = new PrismaPg({
    connectionString: env("DATABASE_URL")!,
});

const prisma = new PrismaClient({
    adapter,
});

export default prisma;