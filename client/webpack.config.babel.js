import path from 'path'
import webpack from 'webpack'
import HTML from 'html-webpack-plugin'
import Template from 'html-webpack-template'
import Unused from 'unused-files-webpack-plugin'
import 'core-js'

const ROOT = path.resolve(__dirname, '..')
const CLIENT = path.join(ROOT, 'client')
const SRC = path.join(ROOT, 'client', 'src')
const DIST = path.join(ROOT, 'build', 'client')
const NODE_MODULES = path.join(ROOT, 'node_modules')

export default env => {
  console.log('calling webpack with env:', env)
  const plugins = [
    new webpack.EnvironmentPlugin({
      NODE_ENV: env === 'prod' ? 'production' : 'development'
    }),
    new webpack.DefinePlugin({
      'process.env.MAPBOX_KEY': JSON.stringify(process.env.MAPBOX_KEY)
    }),
    new HTML({
      title: 'Test Mapboxgl',
      inject: true,
      template: Template
    }),
    new Unused({
      patterns: ['client/src/**/*.*']
    })
  ]
  const moduleRules = [
    {
      test: /\.mjs$/,
      type: 'javascript/auto'
    },
    {
      test: /\.js$/,
      include: [SRC, path.resolve(NODE_MODULES, 'array-move')],
      loader: 'babel-loader'
    },
    {
      test: /(leaflet\.css|mapbox-gl\.css|mapbox-gl-draw\.css)/,
      include: [
        path.resolve(NODE_MODULES, 'leaflet', 'dist'),
        path.resolve(NODE_MODULES, 'mapbox-gl', 'dist'),
        path.resolve(NODE_MODULES, '@mapbox', 'mapbox-gl-draw', 'dist')
      ],
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.css$/,
      include: SRC,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.(png|svg|ico|jpg)$/,
      include: [
        SRC,
        path.resolve(CLIENT, 'images'),
        path.resolve(NODE_MODULES, 'leaflet', 'dist', 'images'),
        path.resolve(NODE_MODULES, '@mapbox')
      ],
      loaders: 'file-loader'
    },
    {
      test: /\.(pdf)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    }
  ]

  let entry = [
    'whatwg-fetch',
    'core-js/es/promise',
    'core-js/es/set',
    'core-js/es/object',
    'core-js/es/array/find',
    'core-js/es/array/find-index',
    'core-js/es/string/includes',
    'core-js/es/symbol',
    'core-js/es/function',
    'core-js/es/parse-int',
    'core-js/es/parse-float',
    'core-js/es/number',
    'core-js/es/math',
    'core-js/es/string',
    'core-js/es/date',
    'core-js/es/array',
    'core-js/es/regexp',
    'core-js/es/map',
    'core-js/es/weak-map',
    './client/src/index.js'
  ]

  if (env === 'dev') {
    moduleRules.push({
      test: /\.(js|jsx)$/,
      include: SRC,
      loader: require.resolve('babel-loader'),
      options: {
        // This is a feature of `babel-loader` for Webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        plugins: ['react-hot-loader/babel']
      }
    })
  }

  return {
    entry: entry,
    devtool: 'source-map',
    resolve: {
      alias: {
        // TODO: is this neeeded?
        //'react-relay': 'react-relay/react-relay.min.js',
        'react-dom': path.resolve(__dirname, '..', 'node_modules', 'react-dom'),
        react: path.resolve(__dirname, '..', 'node_modules', 'react')
      }
    },
    output: {
      path: DIST,
      filename: '[name][hash].js',
      publicPath: '/'
    },
    module: {
      rules: moduleRules
    },
    plugins,
    mode: env === 'prod' ? 'production' : 'development'
  }
}
