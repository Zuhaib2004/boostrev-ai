export async function POST(req: Request) {
  const { image } = await req.json();
  const description = `🔥 Boost your product listing: ${image.replace(/\.\w+$/, '')} is now ready with premium copy, SEO, and emotional hooks.`;
  return Response.json({ description });
} 