const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV;

const isDev = mode === 'development';

const generateFilename = ext => isDev ?
  `[name].${ext}` :
  `[name].[contenthash].${ext}`;

module.exports = {
	entry: {
    main: './src/index.js',
  },
	output: {
		filename: `./js/${generateFilename('js')}`,
		path: path.resolve(__dirname, './dist'),
    assetModuleFilename: `./plugins/[hash][ext][query]`,
    clean: true,
	},
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: !isDev,
      }
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${generateFilename('css')}`,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "src/plugins", to: "plugins" },
    //     // { from: "other", to: "public" },
    //   ],
    // }),
  ],
  mode,
  devServer: {
        static: './dist',
        open: true,
        port: 8081,
        hot: true,
        compress: true,
        overlay: true,
        writeToDisk: false,
        historyApiFallback: true
    },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          }
        }, 'css-loader',
            'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: './img/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext][query]'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ]
  }
};