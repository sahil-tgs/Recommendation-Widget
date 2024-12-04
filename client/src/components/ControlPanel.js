// client/src/components/ControlPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ControlPanel = ({ widgetId }) => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        const res = await axios.get(`http://localhost:4000/api/widget/${widgetId}/config`);
        setConfig(res.data);
    };

    const updateConfig = async (changes) => {
        const res = await axios.put(`http://localhost:4000/api/widget/${widgetId}/config`, {
            ...config,
            ...changes
        });
        setConfig(res.data);
    };

    if (!config) return <div>Loading...</div>;

    return (
        <div className="p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Widget Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block mb-2">Columns</label>
                    <input 
                        type="number" 
                        value={config.uiConfig.columns}
                        onChange={e => updateConfig({ 
                            uiConfig: { ...config.uiConfig, columns: parseInt(e.target.value) }
                        })}
                        className="border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block mb-2">Max Products</label>
                    <input 
                        type="number"
                        value={config.uiConfig.maxProducts}
                        onChange={e => updateConfig({
                            uiConfig: { ...config.uiConfig, maxProducts: parseInt(e.target.value) }
                        })}
                        className="border rounded p-2"
                    />
                </div>
                <div>
                    <label className="block mb-2">Theme</label>
                    <select 
                        value={config.uiConfig.theme}
                        onChange={e => updateConfig({
                            uiConfig: { ...config.uiConfig, theme: e.target.value }
                        })}
                        className="border rounded p-2"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Primary Color</label>
                    <input 
                        type="color"
                        value={config.uiConfig.primaryColor}
                        onChange={e => updateConfig({
                            uiConfig: { ...config.uiConfig, primaryColor: e.target.value }
                        })}
                        className="border rounded p-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlPanel;