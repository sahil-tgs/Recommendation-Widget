// server/models/Widget.js
class Widget {
    constructor(id, config) {
      this.id = id;
      this.config = config;
    }
    
    static storage = new Map();
    
    static create(config) {
      const id = Date.now().toString();
      const widget = new Widget(id, config);
      this.storage.set(id, widget);
      console.log("Created widget:", widget);
      return widget;
    }
    
    static find(id) {
      return this.storage.get(id);
    }
  }
  
  module.exports = Widget;