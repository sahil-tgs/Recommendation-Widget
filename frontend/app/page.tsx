// File: frontend/app/page.tsx
export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Product Page Demo</h1>
          <a 
            href="/control-panel" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Control Panel
          </a>
        </div>
        
        {/* Main product */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold">Killer Men Round Toe Derby Shoes</h2>
          <p className="text-gray-600">Product ID: 31602544</p>
        </div>
        
        {/* Recommendation Widget */}
        <RecommendationWidget 
          widgetId="default"
          productId="31602544"
        />
      </div>
    </div>
  );
}
