// Prisma Client ko import kar rahe hain generated files se.
import { PrismaClient } from '../../node_modules/.prisma/client';
// PostgreSQL ke liye adapter import kar rahe hain taaki JS database se baat kar sake.
import { PrismaPg } from '@prisma/adapter-pg';
// 'pg' library import kar rahe hain jo connection pool manage karegi.
import pg from 'pg';

// Ye function Prisma Client ka ek naya instance (connection) banata hai.
const prismaClientSingleton = () => {
  // Pool banate hain connection string use karke jo .env file mein hai.
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  // Driver adapter set kar rahe hain Prisma 7 ke naye rules ke mutabik.
  const adapter = new PrismaPg(pool);
  // PrismaClient ko adapter ke saath return kar rahe hain.
  return new PrismaClient({ adapter });
};

// Global environment mein 'prisma' variable define kar rahe hain.
// Isse baar-baar naye connections nahi bante (especially development mode mein).
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Agar global prisma pehle se hai toh wahi use karo, nahi toh naya banao.
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma; // Isse hum poore app mein kahin bhi database use kar sakte hain.

// Development mode mein prisma ko global variable mein save kar lete hain.
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
