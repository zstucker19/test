import path from 'path'
import webpack from 'webpack';



export default {
  devtools: ['eval-source-map','source-map'],
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, '/client/index.js')
  ],
  output: {
    path: '/',
    publicPath: '/',
    libraryTarget: 'umd',
    libraryName: 'PlacesAutocomplete'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'server/shared')
        ],
        loaders: [ 'react-hot', 'babel' ]
      },
      {
        test: /\.json$/,
        include: [
          path.join(__dirname, 'node_modules/react-places-autocomplete/dist')
        ],
        loader: 'json'
       
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: [
          path.join(__dirname, 'node_modules/react-places-autocomplete/dist')
        ],
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  resolve: {
    extentions: [ '', '.js' ]
  }
}


