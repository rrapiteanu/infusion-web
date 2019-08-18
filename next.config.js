const withImages = require("next-images");
const withSass = require("@zeit/next-sass");

const nextConfig = {
  target: "serverless",
  env: {
    API_URL: process.env.API_URL || "http://localhost:4000",
    WS_URL: process.env.WS_URL || "ws://localhost:4000/socket"
  }
};

module.exports = withSass(withImages(nextConfig));
