export async function POST(req: Request) {
  const { productId, userId } = await req.json();
  // In real world: call AliExpress / Spocket API here
  return Response.json({
    status: 'success',
    message: `Order placed for Product #${productId} by User ${userId}`,
  });
} 