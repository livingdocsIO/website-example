const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const BuildDesignPlugin = require('./lib/build_design_plugin')

const isDev = process.env.NODE_ENV !== 'production'
const isTargetingEditor = process.env.DESIGN_TARGET === 'editor'
const distPath = path.resolve('./design/dist')
const HMRClient =
  'webpack-hot-middleware/client?reload=true'

const scriptPath = (filename) => ([
  isDev && HMRClient,
  `./design/source/scripts/${filename}`
].filter(Boolean))

module.exports = {
  context: __dirname,
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  entry: Object.assign({}, {
    scripts: scriptPath('index.js')
  }, isDev ? {
    helpers: [
      HMRClient,
      './design/source/helpers/index.js'
    ]
  } : {}),
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'commons'
        },
        vendors: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendors',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  output: {
    path: distPath,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [[require.resolve('babel-preset-env'), {
            targets: {
              // same as core editor
              browsers: ['chrome>=40', 'safari>=6', 'firefox>=24', 'ie>=11', 'opera>=19']
            }
          }]]
        }
      }]
    }, {
      test: /chartist/,
      use: 'imports-loader?define=>false'
    }, {
      test: /\.(png|jpe?g|svg|gif|eot|svg|ttf|otf|woff|woff2)$/,
      loader: 'file-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: [isDev && {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'resolve-url-loader',
          options: {
            root: path.resolve('./design/source/stylesheets')
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [require('autoprefixer')]
            }
          }
        }].filter(Boolean)
      })
    }, {
      test: /styles\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [isDev && {
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'resolve-url-loader',
          options: {
            root: path.resolve('./design/source/stylesheets')
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [require('autoprefixer')]
            }
          }
        }, {
          loader: 'sass-loader'
        }].filter(Boolean)
      })
    }]
  },
  resolve: {
    extensions: [
      '.scss',
      '.css',
      '.js'
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distPath]),
    new BuildDesignPlugin({
      src: path.resolve('./design/source'),
      dest: distPath,
      rewriteImageSources: {
        disable: !isTargetingEditor,
        base: isTargetingEditor && require('./conf').get('design:repository')
      }
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: isDev
    }),
    new CopyWebpackPlugin([{
      from: '**/*',
      to: distPath
    }], {
      context: 'design/source/assets'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ].concat(
    isDev ? [
      new webpack.HotModuleReplacementPlugin(),
      new OpenBrowserPlugin({
        url: `http://0.0.0.0:${process.env.PORT || 8080}`,
        ignoreErrors: true
      })
    ] : []
  )
}
