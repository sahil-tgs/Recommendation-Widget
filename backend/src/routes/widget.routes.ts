// File: backend/src/routes/widget.routes.ts

import { Router } from 'express';
import { WidgetConfig, CreateWidgetDto } from '../types/widget';

const router = Router();

// In-memory store for widget configurations
const widgets = new Map<string, WidgetConfig>();

// Create widget
router.post('/', (req, res) => {
  const widgetData: CreateWidgetDto = req.body;
  const id = Date.now().toString();
  
  const widget: WidgetConfig = {
    id,
    ...widgetData
  };
  
  widgets.set(id, widget);
  res.status(201).json(widget);
});

// Get widget by ID
router.get('/:id', (req, res) => {
  const widget = widgets.get(req.params.id);
  if (!widget) {
    return res.status(404).json({ message: 'Widget not found' });
  }
  res.json(widget);
});

// Update widget
router.put('/:id', (req, res) => {
  const id = req.params.id;
  if (!widgets.has(id)) {
    return res.status(404).json({ message: 'Widget not found' });
  }
  
  const updatedWidget: WidgetConfig = {
    ...widgets.get(id)!,
    ...req.body,
    id
  };
  
  widgets.set(id, updatedWidget);
  res.json(updatedWidget);
});

export { router as widgetRoutes };