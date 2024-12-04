// File: frontend/types/widget.ts
export interface WidgetConfig {
    id: string;
    name: string;
    type: 'similar' | 'recommended' | 'crossSell';
    sourceApi: {
      endpoint: string;
      method: 'GET' | 'POST';
      params?: Record<string, string>;
    };
    display: {
      layout: 'grid' | 'carousel';
      itemsPerRow: number;
      maxItems: number;
    };
    fieldMapping: {
      id: string;
      title: string;
      price: string;
      image: string;
      rating?: string;
      reviews?: string;
    };
  }
  
  export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    rating?: number;
    reviews?: number;
  }
  
  export interface CreateWidgetDto {
    name: string;
    type: WidgetConfig['type'];
    sourceApi: WidgetConfig['sourceApi'];
    display: WidgetConfig['display'];
    fieldMapping: WidgetConfig['fieldMapping'];
  }
  