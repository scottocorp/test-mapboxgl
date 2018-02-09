var webpack = require('webpack')
import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import HTMLWebpackTemplate from 'html-webpack-template'

require('dotenv').config({ path: path.join(__dirname, '.env') })

export default env => {
  const plugins = [
    new HTMLWebpackPlugin({
      inject: false,
      title: 'Site Survey',
      template: HTMLWebpackTemplate,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no'
        },
        { name: 'description', content: 'Site Survey' }
      ]
    }),
    // new webpack.EnvironmentPlugin(['MAPZEN_KEY', 'MAPBOX_KEY', 'ENDPOINT_BASE'])
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': env && env === 'production'
        ? JSON.stringify('production')
        : JSON.stringify('development'),
      'process.env.MAPZEN_KEY': JSON.stringify(process.env.MAPZEN_KEY),
      'process.env.MAPBOX_KEY': JSON.stringify(process.env.MAPBOX_KEY),
      'process.env.ENDPOINT_BASE': JSON.stringify(process.env.ENDPOINT_BASE),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(
        process.env.AUTH0_CLIENT_ID
      ),
      'process.env.AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
      'process.env.AUTH0_AUDIENCE': JSON.stringify(process.env.AUTH0_AUDIENCE),
      'process.env.AUTH0_REDIRECT_URL': JSON.stringify(
        process.env.AUTH0_REDIRECT_URL
      )
    })
  ]

  if (env === 'production') {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      })
    )
  }

  return {
    entry: path.resolve(__dirname, './src/index.js'),
    devtool: 'cheap-module-source-map',
    output: {
      filename: '[hash].js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader'
        },
        {
          test: /(global\.css|fonts\.css|leaflet\.css|bootstrap\.css|react-select\.css)/,
          include: [
            path.resolve(__dirname, 'node_modules', 'leaflet'),
            path.resolve(__dirname, 'node_modules', 'bootstrap'),
            // path.resolve(__dirname, 'node_modules', 'react-select'),
            path.resolve(__dirname, 'src')
          ],
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.(?:png|jpg|svg|json|csv)/,
          include: [
            path.resolve(__dirname, 'node_modules', 'leaflet'),
            path.resolve(__dirname, 'node_modules', 'bootstrap'),
            // path.resolve(__dirname, 'node_modules', 'react-select'),
            path.resolve(__dirname, 'data'),
            path.resolve(__dirname, 'src')
          ],
          exclude: [path.resolve(__dirname, 'src/messages.json')],
          use: 'file-loader'
        },
        {
          test: /\.(?:ttf|svg|woff2?|eot)$/,
          loader: 'file-loader',
          include: [
            path.resolve(__dirname, 'fonts'),
            path.resolve(__dirname, 'node_modules', 'bootstrap')
          ]
        }
      ]
    },
    plugins
  }
}
