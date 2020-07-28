const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  mode: "production",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'jsAnimationController.js'
  },
  //devtool: 'nosources-source-map', // might come in handy
  devtool: '',
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        lib: {
          test: /[\\/]lib[\\/]/,
          name: 'lib',
          chunks: 'all'
        }
      }
    }
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.css', '.sql']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "ts-loader",
      exclude: /node_modules/
    }, {
      test: /\.sql/i,
      use: 'raw-loader',
    }, {
      test: /\.cs$/i,
      use: 'raw-loader',
    }, {
      test: /\.html/i,
      use: 'html-loader',
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }]
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: 'sass-loader',
        options: {
          prependData: '@import "node_modules/slickgrid-es6/dist/slick.grid.variables.scss";'
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(gif|png|jpe?g|svg)$/i,
      exclude: /fontawesome-webfont\.svg$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'img/'
        }
      }]
    }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: '(c) Symolo e.K. \nhash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]\n'
    })
  ]
};
