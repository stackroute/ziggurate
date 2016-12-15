const path = require('path');

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: {
    app: [path.join(__dirname, 'client', 'app.jsx')]
  },
  output: {
    path: path.join(__dirname, 'client', 'assets'),
    publicPath: '/assets',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '/index', '/index.js', '/index.jsx']
  },
  plugins: []
};
