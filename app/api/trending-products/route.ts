export async function GET() {
  return Response.json([
    { title: 'Smart Water Bottle', revenuePotential: '$15K/month' },
    { title: 'Neon Mood Light', revenuePotential: '$9K/month' },
    { title: 'Pet Hair Vacuum', revenuePotential: '$18K/month' },
  ]);
} 