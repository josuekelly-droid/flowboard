// test-env.ts
import "dotenv/config";

console.log("DATABASE_URL:", process.env.DATABASE_URL?.substring(0, 50) + "...");
console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET ? "✅ Défini" : "❌ Manquant");