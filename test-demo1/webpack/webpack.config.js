const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { join } = require("path");
const relative = (p) => join(__dirname, "../", p);
const { pagesEntry, componentEntry } = require("./getEntry");

module.exports = {
  entry: {
    ...pagesEntry,
    ...componentEntry,
    ...{ app: relative("./src/app.ts") },
  },
  output: {
    path: relative("dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        /** ES6转ES5处理 */
        test: /\.(js|wxs)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWepackAssets: false }),
    // new CopyWebpackPlugin([{ from: "**/*.wxml", to: "" }]),
  ],
  mode: "development",
};
