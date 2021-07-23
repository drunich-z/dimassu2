const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

/*
const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
  },
};
*/

const esLintPlugin = () => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: "development",
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    main: './index.ts',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: isDev ? 'assets/resource/[name][ext]' : 'assets/resource/[name][contenthash][ext]',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  devServer: {
    port: 4200
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    ...esLintPlugin(),
    new MiniCssExtractPlugin({ 
      filename: filename('css') 
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, 'src/assets/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        },
        { 
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist/')
        },
        { 
          from: path.resolve(__dirname, 'src/assets/resource'),
          to: path.resolve(__dirname, 'dist/assets/resource')
        },
      ],
    }),
    new CleanWebpackPlugin({ 
      cleanStaleWebpackAssets: false 
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
};
