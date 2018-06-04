var path = require("path");
var webpack = require("webpack");
var autoprefixer = require("autoprefixer");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var express = require("express");

var IS_DEV = process.env.NODE_ENV == "development";

const plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new HtmlWebpackPlugin({
    template: "index.html",
    inject: true,
    filename: "index.html",
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }),
  new ExtractTextPlugin({
    filename: "assets/css/style.css",
    disable: IS_DEV
  })
];

if (!IS_DEV) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );

  plugins.push(
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "static"),
        to: path.resolve(__dirname, "dist/static"),
        ignore: [".*"]
      }
    ])
  );

  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  );
}

module.exports = {
  entry: "./src/main.js",
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./dist"),
    filename: "assets/js/figma.js"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true,
          postcss: [autoprefixer("last 10 versions", "Firefox >= 18", "ie 10")]
        }
      },
      {
        test: /\.(s)?css$|\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [
                    autoprefixer("last 10 versions", "Firefox >= 18", "ie 10")
                  ];
                }
              }
            }
          ]
        })
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(eot|ttf|otf|woff2?)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "assets/fonts/[name].[ext]",
              limit: 8192,
              publicPath: "../../"
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "assets/images/[name].[ext]",
              limit: 8192,
              publicPath: "../../"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve("src")
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    overlay: true,
    clientLogLevel: "none",
    proxy: {
      "/api": "http://localhost:3002",
      "/ws/*": {
        target: "ws://localhost:3002",
        ws: true
      }
    },
    setup: function(app) {
      app.use("static", express.static(path.resolve(__dirname, "static")));
    }
  },
  performance: {
    hints: false
  },
  plugins
};
