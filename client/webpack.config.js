const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "./src/index.tsx"),
  // target: "web",
  mode: "development",
  output: {
    path: path.join(__dirname, "./public/build"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          // {
          //   loader: "@teamsupercell/typings-for-css-modules-loader",
          // },
          "css-loader",
          // {
          //   loader: "css-loader",
          //   options: { modules: true },
          // },
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "/public/build"),
    compress: true,
    port: 3001,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "BukLub",
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./src/style.css",
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],
};
