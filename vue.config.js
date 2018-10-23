// vue.config.js
module.exports = {
    devServer: {
      proxy: {
        "/v1": {
          target: "http://localhost:8080",
          secure: false
        }
      }
    }
  };