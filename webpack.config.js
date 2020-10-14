const path = require("path");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const { NoEmitOnErrorsPlugin, ProgressPlugin } = require("webpack");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
          options: { 
            presets: ["@babel/env"],
          cacheDirectory: true,
        
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|csv|jpe?g)$/,
        use: [
          {
            options: {
              name: "[name].[ext]",
              outputPath: "images/"
            },
            loader: "file-loader"
          }
        ]
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "build/"),
    publicPath: "/",
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hot: true,
    watchOptions: {
      aggregateTimeout: 600,
      poll: 1000,
    },
    open: false,
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new SimpleProgressWebpackPlugin( { 
      format: 'expanded'
    } ),
    new HardSourceWebpackPlugin({
      cacheDirectory: "node_modules/.cache/hard-source/[confighash]",
      configHash: function (webpackConfig) {
        // node-object-hash on npm can be used to build this.
        return require("node-object-hash")({ sort: false }).hash(webpackConfig);
      },
    }),
  ],
};
