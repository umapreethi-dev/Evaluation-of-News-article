const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
  output: {
    libraryTarget: "var",
    library: "Client",
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: "/js$",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: "/.html$/",
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].scss" }),
    new WorkboxPlugin.GenerateSW({
      // urlManipulation: ({url}) => {
      //   if (url === "/") {
      //     return "auto./index.html"
      //   } else if (url === "main.js") {
      //     return "automain.js"
      //   }
      //   // Your logic goes here...
      // }
      //additionalManifestEntries: [{"url": "index.html"}, {"url": "main.js"}],
      navigateFallback: 'index.html',
      runtimeCaching: [{
        // Match any request that ends with .png, .jpg, .jpeg or .svg.
        urlPattern: /\.(?:html)$/,

        // Apply a cache-first strategy.
        handler: 'CacheFirst',

        options: {
          // Use a custom cache name.
          cacheName: 'html',

          // Only cache 10 images.
          expiration: {
            maxEntries: 10,
          },
        },
      }],
      //include: ["index.html"]
    })
  ]
};
