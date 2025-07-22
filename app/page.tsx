"use client";
/// <reference types="@react-three/fiber" />
// BoostRev AI - 3D Enhanced MVP with Vercel-Ready Setup
// Tech: React + Tailwind + React Three Fiber + AI + Dropshipping Hooks

import React, { useState, useEffect, Suspense } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent } from './components/ui/card';
import axios from 'axios';
import { ThreeElements } from '@react-three/fiber';

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

      {/* Hero Banner Image */}
      <section className="w-full flex justify-center mt-6">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="BoostRev AI Hero"
          className="rounded-xl shadow-lg w-full max-w-3xl object-cover"
        />
      </section>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Synced Products Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">📦 Synced Products</h2>
          <ul className="space-y-4">
            {storeData.map((item) => (
              <li key={item.id} className="bg-white p-4 rounded shadow border">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-500">Sales: {item.sales}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* AI Listing Enhancer Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg border mb-8">
          <h2 className="text-xl font-semibold mb-4">🧠 AI Listing Enhancer</h2>
          <label className="block mb-2 text-sm font-medium text-gray-700">Upload product image</label>
          <Input type="file" onChange={handleUpload} className="bg-white p-2 rounded border" />
          {productImage && (
            <div className="mt-4">
              <img src={productImage} alt="Uploaded" className="w-40 rounded shadow" />
            </div>
          )}
          {aiCopy && <p className="mt-2 text-sm bg-gray-100 p-2 rounded">{aiCopy}</p>}
        </section>

        {/* Trending Suggestions Section */}
        <section className="bg-white p-6 rounded-xl shadow-lg border mb-8 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">📈 Trending Suggestions</h2>
          <Button onClick={fetchTrending}>Fetch Trends</Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {trendingProducts.map((prod, idx) => (
              <Card key={idx} className="bg-white shadow-md p-4">
                <CardContent>
                  <h3 className="text-lg font-bold">{prod.title}</h3>
                  <p className="text-sm text-gray-500">{prod.revenuePotential}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
