const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mf-internet',

  filename: 'remoteEntry.js',

  exposes: {
    './InternetPage': './src/app/presentation/pages/internet/internet.page.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});