// File: frontend/components/RecommendationWidget.tsx
'use client';

import { useEffect, useState } from 'react';
import { WidgetConfig, Product } from '@/types/widget';
import { fetchWidgetConfig, fetchProducts } from '@/lib/api';

interface Props {
  widgetId: string;
  productId: string;
}

export default function RecommendationWidget({ widgetId, productId }: Props) {
  const [config, setConfig] = useState<WidgetConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWidget() {
      try {
        // Get widget configuration
        const widgetConfig = await fetchWidgetConfig(widgetId);
        setConfig(widgetConfig);

        // Fetch products using config
        const productData = await fetchProducts(widgetConfig, productId);
        setProducts(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load widget');
      } finally {
        setLoading(false);
      }
    }

    loadWidget();
  }, [widgetId, productId]);

  if (loading) {
    return <div className="animate-pulse p-4">Loading widget...</div>;
  }

  if (error || !config) {
    return <div className="text-red-500 p-4">{error || 'Widget configuration not found'}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-4">{config.name}</h3>
        <div className={`grid grid-cols-${config.display.itemsPerRow} gap-4`}>
          {products.slice(0, config.display.maxItems).map((product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-48 object-cover mb-2"
              />
              <h4 className="font-medium text-sm">{product.title}</h4>
              <div className="mt-2">
                <span className="font-bold">₹{product.price}</span>
              </div>
              {product.rating && (
                <div className="mt-1">
                  <span className="bg-green-600 text-white px-2 py-0.5 rounded text-sm">
                    {product.rating} ★ ({product.reviews})
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}