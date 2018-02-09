import webpack from 'webpack'
import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import HTMLWebpackTemplate from 'html-webpack-template'
import Visualizer from 'webpack-visualizer-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'

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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        env && env === 'production'
          ? JSON.stringify('production')
          : JSON.stringify('development'),
      'process.env.MAPBOX_KEY': JSON.stringify(process.env.MAPBOX_KEY),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify(
        process.env.AUTH0_CLIENT_ID
      ),
      'process.env.AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
      'process.env.AUTH0_AUDIENCE': JSON.stringify(process.env.AUTH0_AUDIENCE),
      'process.env.AUTH0_REDIRECT_URL': JSON.stringify(
        process.env.AUTH0_REDIRECT_URL
      ),
      'process.env.NEARMAP_LAMBDA_ENDPOINT': JSON.stringify(
        process.env.NEARMAP_LAMBDA_ENDPOINT
      ),
      'process.env.TILELAYER_ENDPOINT': JSON.stringify(
        process.env.TILELAYER_ENDPOINT
      ),
      'process.env.S3_BUCKET': JSON.stringify(process.env.S3_BUCKET),
      'process.env.NEARMAP_API_KEY': JSON.stringify(
        process.env.NEARMAP_API_KEY
      ),
      'process.env.CONFIG_TABLE_NAME': JSON.stringify(
        process.env.CONFIG_TABLE_NAME
      )
    })
  ]

  if (env === 'production') {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new UglifyJsPlugin()
      // }),
      // new webpack.optimize.UglifyJsPlugin({
      //   beautify: false,
      //   mangle: {
      //     screw_ie8: true,
      //     keep_fnames: true
      //   },
      //   compress: {
      //     screw_ie8: true
      //   },
      //   comments: false
      // })
    )
  }
  plugins.push(new Visualizer())
  plugins.push(new LodashModuleReplacementPlugin())

  return {
    entry: path.resolve(__dirname, './src/index.js'),
    devtool: 'cheap-module-source-map',
    output: {
      filename: '[hash].js',
      path: path.join(__dirname, '..', 'build', 'client'),
      publicPath: '/'
    },
    resolve: {
      alias: {
        'react-dom': path.resolve(__dirname, '..', 'node_modules', 'react-dom'),
        react: path.resolve(__dirname, '..', 'node_modules', 'react')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, '..', 'node_modules', 'luxon')
          ],
          loader: 'babel-loader'
        },
        {
          test: /(global\.css|fonts\.css|leaflet\.css|bootstrap\.css|react-bootstrap-table.min\.css|_datepicker\.css|leaflet-measure\.css|react-select\.css|slick\.css|slick-theme\.css)/,
          include: [
            path.resolve(
              __dirname,
              '..',
              'node_modules',
              'slick-carousel',
              'slick'
            ),
            path.resolve(__dirname, '..', 'node_modules', 'react-dates'),
            path.resolve(
              __dirname,
              '..',
              'node_modules',
              'react-select',
              'dist'
            ),
            path.resolve(__dirname, '..', 'node_modules', 'react-dates'),
            path.resolve(
              __dirname,
              '..',
              'node_modules',
              'leaflet-measure',
              'dist'
            ),
            path.resolve(__dirname, '..', 'node_modules', 'leaflet'),
            path.resolve(__dirname, '..', 'node_modules', 'bootstrap'),
            path.resolve(
              __dirname,
              '..',
              'node_modules',
              'react-bootstrap-table'
            ),
            path.resolve(__dirname, 'src')
          ],
          loaders: ['style-loader', 'css-loader']
        },
        {
          test: /\.(?:png|jpg|svg|json|csv|gif)/,
          include: [
            path.resolve(__dirname, '..', 'node_modules', 'leaflet'),
            path.resolve(__dirname, '..', 'node_modules', 'bootstrap'),
            path.resolve(
              __dirname,
              '..',
              'node_modules',
              'slick-carousel',
              'slick'
            ),
            path.resolve(__dirname, 'data'),
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'images')
          ],
          exclude: [path.resolve(__dirname, 'src/messages.json')],
          use: 'file-loader'
        },
        {
          test: /\.(?:ttf|svg|woff2?|eot)$/,
          loader: 'file-loader',
          include: [
            path.resolve(__dirname, 'fonts'),
            path.resolve(__dirname, '..', 'node_modules', 'bootstrap'),
            path.resolve(
              __dirname,
              '..',
              'node_modules',
              'slick-carousel',
              'slick'
            )
          ]
        }
      ]
    },
    plugins
  }
}
