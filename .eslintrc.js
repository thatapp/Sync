module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
  },
  env: {
    mocha: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['spec/**/*', 'spec-integration/**/*'] }],
    camelcase: 0,
    'max-len': [1, { code: 180 }],
  },
};
