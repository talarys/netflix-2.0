module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['next/core-web-vitals', 'plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    '@next/next/no-img-element': 'off',
    'no-shadow': 'off',
    'react/jsx-props-no-spreading': 'off',
    'global-require': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'no-console': 'off',
  },
};
