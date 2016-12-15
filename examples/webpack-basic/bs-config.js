
// http://www.browsersync.io/docs/options/

module.exports = {

  browser: 'default', // use default browser for the OS
  // if instead you want to launch a different browser
  // change to one of the following
  // browser: ['google chrome'], // OS X, Windows
  // browser: ['google-chrome'], // linux
  // browser: ['chrome'], // win7
  // browser: ['google chrome canary'],
  // browser: ['firefox'],
  // browser: ['safari'],

  ghostMode: false,
  port: 3005,
  // proxy: 'localhost:8005',
  reloadDelay: 500,
  reloadDebounce: 500,
  files: [
    'webpack.config.js',
    'public/*.html',
    'dist/*.js'
  ],
  server: {
    baseDir: './public',
    routes: {
      '/dist': './dist'
    }
  }
};
