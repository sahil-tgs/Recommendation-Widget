import { useState, useEffect } from 'react';
import RecommendationWidget from '../components/RecommendationWidget';

const Demo = () => {
  const [widgets, setWidgets] = useState([]);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/widgets');
        const data = await response.json();
        setWidgets(data);
        if (data.length > 0) {
          setSelectedWidgetId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching widgets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgets();
  }, []);

  const selectedWidget = widgets.find(w => w.id === selectedWidgetId);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (widgets.length === 0) {
    return (
      <div className="p-4">
        <p className="text-gray-600">
          No widgets found. Please create one in the Control Panel first.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6 bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Widget
          </label>
          <select
            value={selectedWidgetId || ''}
            onChange={(e) => setSelectedWidgetId(e.target.value)}
            className="w-full max-w-xs p-2 border rounded"
          >
            {widgets.map(widget => (
              <option key={widget.id} value={widget.id}>
                {widget.name}
              </option>
            ))}
          </select>
        </div>

        {selectedWidget && (
          <div className="bg-gray-50 rounded-lg p-4">
            <RecommendationWidget config={selectedWidget} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Demo;