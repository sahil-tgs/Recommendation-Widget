// File: frontend/lib/api.ts
const API_BASE_URL = 'http://localhost:3001/api';

export async function fetchWidgetConfig(widgetId: string): Promise<WidgetConfig> {
  const response = await fetch(`${API_BASE_URL}/widgets/${widgetId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch widget configuration');
  }
  return response.json();
}

export async function fetchWidgets(): Promise<WidgetConfig[]> {
  const response = await fetch(`${API_BASE_URL}/widgets`);
  if (!response.ok) {
    throw new Error('Failed to fetch widgets');
  }
  return response.json();
}

export async function createWidget(data: CreateWidgetDto): Promise<WidgetConfig> {
  const response = await fetch(`${API_BASE_URL}/widgets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create widget');
  }
  return response.json();
}

export async function fetchProducts(config: WidgetConfig, productId: string): Promise<Product[]> {
  const endpoint = config.sourceApi.endpoint.replace('{productId}', productId);
  const response = await fetch(`https://www.myntra.com${endpoint}`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  
  // Transform data according to field mapping
  return data.related
    .filter((item: any) => item.type === config.type)
    .map((item: any) => ({
      id: item.product.id,
      title: item.product.name,
      price: item.product.price,
      image: item.product.images[0],
      rating: item.product.rating?.value,
      reviews: item.product.rating?.count
    }));
}