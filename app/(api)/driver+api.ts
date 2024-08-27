import { env } from '@/contants/env';
import { neon } from '@neondatabase/serverless';

export const GET = async () => {
  try {
    const sql = neon(env.DATABASE_URL as string);
    const response = await sql`SELECT * FROM drivers`;

    return Response.json({ data: response });
  } catch (error) {
    return Response.json({ error });
  }
};
