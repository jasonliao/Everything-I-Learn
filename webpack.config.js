var webpack = require('webpack');
var path = require('path');

var sassLoaders = [
  'style-loader',
  'css-loader',
  'sass-loader'
];

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/dev-server',
    './src/app/index.js'
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }, {
      test: /\.(scss|css)$/,
      include: [
        path.resolve(__dirname, './src'),
        path.resolve(__dirname, './node_modules')
      ],
      loader: sassLoaders.join('!')
    }, {
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.css'],
    modulesDirectories: ['src', 'node_modules']
  },
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
