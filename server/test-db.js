import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

async function testConnection() {
  try {
    const reports = await prisma.report.findMany();
    console.log("✅ Connected to DB! Reports:", reports);
  } catch (err) {
    console.error("❌ Database connection error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
