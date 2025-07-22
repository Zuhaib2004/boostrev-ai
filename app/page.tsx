"use client";
/// <reference types="@react-three/fiber" />
// BoostRev AI - 3D Enhanced MVP with Vercel-Ready Setup
// Tech: React + Tailwind + React Three Fiber + AI + Dropshipping Hooks

import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import axios from 'axios';
import { ThreeElements } from '@react-three/fiber';

function SpinningBox(props: ThreeElements['mesh']) {
  return (
    // @ts-ignore
    <mesh rotation={[0.4, 0.2, 0]} {...props}>
      {/* @ts-ignore */}
      <boxGeometry args={[2, 2, 2]} />
      {/* @ts-ignore */}
      <meshStandardMaterial color="#4f46e5" />
    {/* @ts-ignore */}
    </mesh>
  );
}

export default function Dashboard() {
  const [storeData, setStoreData] = useState<{ id: number; title: string; sales: number }[]>([]);
  const [productImage, setProductImage] = useState<string | null>(null);
  const [aiCopy, setAiCopy] = useState<string>('');
  const [trendingProducts, setTrendingProducts] = useState<{ title: string; revenuePotential: string }[]>([]);

  useEffect(() => {
    setStoreData([
      { id: 1, title: 'Minimalist Hoodie', sales: 120 },
      { id: 2, title: 'Eco Tumbler', sales: 80 },
    ]);
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProductImage(URL.createObjectURL(file));
    const response = await axios.post<{ description: string }>('/api/ai-description', { image: file.name });
    setAiCopy(response.data.description);
  };

  const fetchTrending = async () => {
    const response = await axios.get<{ title: string; revenuePotential: string }[]>('/api/trending-products');
    setTrendingProducts(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600">BoostRev AI</h1>
        <p className="text-gray-600">Your one-click dropshipping assistant</p>
      </header>

      <section className="w-full h-[400px]">
        <Canvas>
          {/* @ts-ignore */}
          <ambientLight intensity={0.5} />
          {/* @ts-ignore */}
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <SpinningBox />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </section>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">📦 Synced Products</h2>
          <ul className="space-y-2">
            {storeData.map((item) => (
              <li key={item.id} className="bg-white p-3 rounded shadow">
                {item.title} – Sales: {item.sales}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🧠 AI Listing Enhancer</h2>
          <Input type="file" onChange={handleUpload} />
          {productImage && <img src={productImage} alt="Uploaded" className="mt-4 w-40" />}
          {aiCopy && <p className="mt-2 text-sm bg-gray-100 p-2 rounded">{aiCopy}</p>}
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📈 Trending Suggestions</h2>
          <Button onClick={fetchTrending}>Fetch Trends</Button>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {trendingProducts.map((prod, idx) => (
              <Card key={idx}>
                <CardContent>
                  <p className="font-bold">{prod.title}</p>
                  <p>{prod.revenuePotential}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
