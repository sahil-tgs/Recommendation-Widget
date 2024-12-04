// File: frontend/components/WidgetConfigForm.tsx
'use client';

import { useState } from 'react';
import { CreateWidgetDto } from '@/types/widget';
import { createWidget } from '@/lib/api';

export default function WidgetConfigForm() {
  const [formData, setFormData] = useState<CreateWidgetDto>({
    name: '',
    type: 'similar',
    sourceApi: {
      endpoint: '/gateway/v2/product/{productId}/related',
      method: 'GET'
    },
    display: {
      layout: 'grid',
      itemsPerRow: 4,
      maxItems: 8
    },
    fieldMapping: {
      id: 'product.id',
      title: 'product.name',
      price: 'product.price',
      image: 'product.images[0]',
      rating: 'product.rating.value',
      reviews: 'product.rating.count'
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createWidget(formData);
      // Reset form or show success message
    } catch (error) {
      console.error('Failed to create widget:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Widget Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value as any})}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="similar">Similar Products</option>
          <option value="recommended">Recommended</option>
          <option value="crossSell">Cross Sell</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Layout</label>
        <select
          value={formData.display.layout}
          onChange={(e) => setFormData({
            ...formData, 
            display: {...formData.display, layout: e.target.value as any}
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="grid">Grid</option>
          <option value="carousel">Carousel</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Widget
      </button>
    </form>
  );
}