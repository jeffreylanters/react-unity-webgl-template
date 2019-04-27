module.exports = {
  entry: ["./source/App.js"],
  output: {
    path: __dirname + "/distribution",
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./distribution"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
};
