const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.ts')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[contenthash:4].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    open: true,
    hot: true,
    port: 3000,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new CleanWebpackPlugin(),
    // new WriteFilePlugin(),
  ],
};
