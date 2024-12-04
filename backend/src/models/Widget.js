const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apiEndpoint: {
    type: String,
    required: true
  },
  maxProducts: {
    type: Number,
    default: 5,
    min: 1,
    max: 20
  },
  columns: {
    type: Number,
    default: 5,
    min: 2,
    max: 6
  },
  theme: {
    type: String,
    enum: ['light', 'dark', 'neutral'],
    default: 'light'
  }
}, {
  timestamps: true
});

exports.Widget = mongoose.model('Widget', widgetSchema);