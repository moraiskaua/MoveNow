import { env } from '@/contants/env';
import { neon } from '@neondatabase/serverless';

export const POST = async (request: Request) => {
  try {
    const sql = neon(env.DATABASE_URL as string);
    const { name, email, clerkId } = await request.json();

    if (!name || !email || !clerkId) {
      return Response.json({ error: 'Missing required fields', status: 400 });
    }

    const response = await sql`
      INSERT INTO users (
        name,
        email,
        clerk_id
      ) VALUES (
        ${name},
        ${email},
        ${clerkId}
      )
  `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    return Response.json({ error: error }, { status: 500 });
  }
};
