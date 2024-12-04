import { useState, useEffect } from 'react';

const ControlPanel = () => {
  const [widgets, setWidgets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    apiEndpoint: '',
    maxProducts: 5,
    columns: 5,
    theme: 'light'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWidgets();
  }, []);

  const fetchWidgets = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/widgets');
      const data = await response.json();
      setWidgets(data);
    } catch (error) {
      console.error('Error fetching widgets:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingId 
        ? `http://localhost:3001/api/widgets/${editingId}`
        : 'http://localhost:3001/api/widgets';
      
      const method = editingId ? 'PUT' : 'POST';
      
      console.log('Submitting form:', {
        url,
        method,
        body: formData
      });

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save widget');
      }
      
      await fetchWidgets();
      resetForm();
    } catch (error) {
      console.error('Error saving widget:', error);
      alert('Error saving widget: ' + error.message);
    }
  };

  const handleEdit = (widget) => {
    setFormData({
      name: widget.name,
      apiEndpoint: widget.apiEndpoint,
      maxProducts: widget.maxProducts,
      columns: widget.columns,
      theme: widget.theme
    });
    setEditingId(widget.id); // Changed from _id to id
  };

  const resetForm = () => {
    setFormData({
      name: '',
      apiEndpoint: '',
      maxProducts: 5,
      columns: 5,
      theme: 'light'
    });
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Widget Control Panel</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block mb-1">Widget Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">API Endpoint</label>
          <input
            type="text"
            value={formData.apiEndpoint}
            onChange={(e) => setFormData({...formData, apiEndpoint: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Max Products</label>
          <input
            type="number"
            value={formData.maxProducts}
            onChange={(e) => setFormData({...formData, maxProducts: parseInt(e.target.value)})}
            min="1"
            max="20"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Columns</label>
          <select
            value={formData.columns}
            onChange={(e) => setFormData({...formData, columns: parseInt(e.target.value)})}
            className="w-full p-2 border rounded"
          >
            {[2,3,4,5,6].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Theme</label>
          <select
            value={formData.theme}
            onChange={(e) => setFormData({...formData, theme: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {editingId ? 'Update Widget' : 'Create Widget'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Existing Widgets</h2>
        {widgets.map(widget => (
          <div 
            key={widget.id}  // Changed from _id to id
            className="p-4 border rounded hover:bg-gray-50 bg-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{widget.name}</h3>
                <p className="text-sm text-gray-600">{widget.apiEndpoint}</p>
              </div>
              <button
                onClick={() => handleEdit(widget)}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;