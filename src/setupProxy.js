const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/getToken',
    createProxyMiddleware({
      target: 'https://localhost:3001',
      changeOrigin: true,
    })
  );
};