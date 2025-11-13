// /frontend/babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], // Target current Node version for tests
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }] // Required for React JSX transformation
  ],
};