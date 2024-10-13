// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://<Provide IP address of backend instance here>:3000', // Provide IP address here 
      changeOrigin: true,
    })
  );
};