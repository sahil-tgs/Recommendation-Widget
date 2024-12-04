// File: backend/src/index.ts

import express from 'express';
import cors from 'cors';
import { widgetRoutes } from './routes/widget.routes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/widgets', widgetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});