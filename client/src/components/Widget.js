import React from 'react';

const Widget = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:4000/myntra');
      setProducts(response.data.related[0].products || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-medium px-4 py-3">Similar Products</h2>
      <div className="grid grid-cols-5 gap-4 p-4">
        {products.map(product => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <img 
                src={product.defaultImage.src.replace('($height)', '360').replace('($width)', '280')} 
                alt={product.brand.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="p-2">
              <h3 className="font-medium text-gray-900">{product.brand.name}</h3>
              <p className="text-sm text-gray-600 truncate mt-1">{product.info}</p>
              <div className="flex items-center mt-1">
                <span className="font-bold">₹{product.price.discounted}</span>
                {product.price.discount && (
                  <>
                    <span className="text-sm text-gray-500 line-through ml-2">₹{product.price.mrp}</span>
                    <span className="text-sm text-orange-500 ml-2">{product.price.discount.label}</span>
                  </>
                )}
              </div>
              {product.rating && (
                <div className="mt-1">
                  <span className="bg-green-600 text-white text-xs px-1 py-0.5 rounded">
                    {product.rating.toFixed(1)} ★
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widget;