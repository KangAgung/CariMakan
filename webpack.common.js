const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/i,
        exclude: '/node_modules/',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              publicPath: '/images',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
      title: 'Cari Makan',
      favicon: path.resolve(__dirname, 'src/public/images/icons/favicon.png'),
      meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1',
        author: 'KangAgung',
        description: 'Cari Makan is a Web App that give you information about Restaurant around you.',
      },
    }),
    new WebpackPwaManifest({
      name: 'Cari Makan',
      short_name: 'Cari Makan',
      description: 'Cari Makan is a Web App that give you information about Restaurant around you.',
      display: 'standalone',
      background_color: '#0d47a1',
      theme_color: '#1565c0',
      ios: true,
      icons: [
        {
          src: path.resolve('src/public/images/icons/icon-512.png'),
          destination: path.join('images', 'icons'),
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true,
        },
        {
          src: path.resolve('src/public/images/icons/maskable-icon.png'),
          destination: path.join('images', 'icons'),
          size: '192x192',
          purpose: 'maskable',
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/icons/**', '**/images/homepage-*.jpg'],
          },
        },
      ],
    }),
    new ImageminWebpackPlugin({
      test: /\.(png|jpe?g)$/,
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true,
        }),
        ImageminPngquant({
          quality: [0.3, 0.7],
        }),
      ],
    }),
    new InjectManifest({
      swDest: './service-worker.js',
      swSrc: './src/scripts/service-worker.js',
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
    }),
    new BundleAnalyzerPlugin(),
  ],
};
