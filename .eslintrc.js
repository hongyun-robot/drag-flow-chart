module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'vue/no-multiple-template-root': 0,
  },
};
