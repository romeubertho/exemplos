/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const WebpackBeforeBuildPlugin = require('before-build-webpack');
const path = require('path');
const execa = require('execa');
const DotEnv = require('dotenv-webpack');

const webpackConfig = require('./webpack.config');

const isProduction = process.env.NODE_ENV.toUpperCase() === 'PRODUCTION';
const isDevelopment = process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT';

const getEnvFromCurrentEnvironment = () => {
  if (isProduction) {
    return '.env.homolog';
  }

  return '.env.development';
};

module.exports = merge(webpackConfig, {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval' : 'source-map',
  cache: isDevelopment,
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    filename: 'bundle.js',
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    host: '0.0.0.0',
    hot: true,
    port: 8081,
  },
  plugins: [
    new DotEnv({
      path: getEnvFromCurrentEnvironment(),
      safe: true,
      silent: true,
    }),
    isDevelopment &&
      new WebpackBeforeBuildPlugin(async (_stats, stop) => {
        try {
          const { stdout } = await execa('yarn', ['update']);
          // eslint-disable-next-line no-console
          console.log(stdout, '\n');
        } finally {
          stop();
        }
      }),
  ].filter(Boolean),
});
