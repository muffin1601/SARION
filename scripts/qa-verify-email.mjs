import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
const email = process.argv[2];
if (!email) { console.error("usage: node qa-verify-email.mjs <email>"); process.exit(1); }
const result = await db.user.updateMany({ where: { email }, data: { emailVerified: true } });
console.log("Updated rows:", result.count);
await db.$disconnect();
