module.exports = [
  {
    url: "/consumer",
    proxy: {
      target: "http://localhost:3001",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        "^/consumer":"/"
      }
    }
  },
  {
    url: "/producer",
    proxy: {
      target: "http://localhost:3000",
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        "^/producer":"/"
      }
    }
  }
]
