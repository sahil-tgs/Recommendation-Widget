import { useState, useEffect } from 'react';

const ProductCard = ({ product, imageSize = 'medium' }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative w-full h-48">
        <img
          src={imageError ? `/api/placeholder/400/600` : product.searchImage}
          alt={product.productName}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{product.brand}</h3>
        <p className="text-sm text-gray-600 mt-1 truncate">
          {product.productName}
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-lg font-bold">₹{product.price}</span>
          {product.discountDisplayLabel && (
            <span className="text-sm text-green-600">
              {product.discountDisplayLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const RecommendationWidget = ({ config }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      if (!config) return;
      
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/proxy-products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        if (mounted) {
          setProducts(data.data.products.slice(0, config.maxProducts));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [config?.maxProducts, config?.id]);

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  const themes = {
    light: 'bg-white',
    dark: 'bg-gray-900',
    neutral: 'bg-gray-50'
  };

  if (loading) {
    return (
      <div className="animate-pulse p-4">
        <div className={`grid ${gridCols[config?.columns || 4]} gap-4`}>
          {[...Array(config?.maxProducts || 4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="h-48 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading products. Please try again later.
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="p-4 text-gray-500">
        No products available.
      </div>
    );
  }

  return (
    <div className={`p-4 ${themes[config?.theme || 'light']}`}>
      <div className={`grid ${gridCols[config?.columns || 4]} gap-4`}>
        {products.map((product) => (
          <ProductCard 
            key={product.productId}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationWidget;