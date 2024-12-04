// File: frontend/app/control-panel/page.tsx
'use client';

import { useState, useEffect } from 'react';
import WidgetConfigForm from '@/components/WidgetConfigForm';
import { WidgetConfig } from '@/types/widget';
import { fetchWidgets } from '@/lib/api';

export default function ControlPanel() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);

  useEffect(() => {
    fetchWidgets().then(setWidgets);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Widget Control Panel</h1>
          <a 
            href="/" 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to Demo
          </a>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <WidgetConfigForm />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Existing Widgets</h2>
          <div className="grid gap-4">
            {widgets.map(widget => (
              <div key={widget.id} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold mb-2">{widget.name}</h3>
                <p className="text-gray-600">Type: {widget.type}</p>
                <p className="text-gray-600">Layout: {widget.display.layout}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
