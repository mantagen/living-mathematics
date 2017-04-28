var path = require('path');

module.exports = {
  entry: './src/app/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets/js')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  }
};
