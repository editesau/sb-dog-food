module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/function-component-definition': [1, { namedComponents: 'arrow-function' }],
    'no-console': 1,
    'import/no-cycle': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'no-return-await': 0,
    'no-underscore-dangle': 0,
  },
}
