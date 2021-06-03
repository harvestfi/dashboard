module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@emotion',
  ],
  env: {
    production: {
      plugins: ['@emotion'],
    },
    development: {
      plugins: [['@emotion', { sourceMap: true }]],
    },
  },
}
