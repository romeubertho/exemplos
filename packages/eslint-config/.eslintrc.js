const fs = require('fs');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'prettier',
    'plugin:relay/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'relay', 'import'],
  rules: {
    curly: ['error', 'all'],
    'relay/generated-flow-types': 'off',
    'react/jsx-filename-extension': 'off',
    'function-paren-newline': 'off',
    'react/forbid-prop-types': 'off',
    'no-confusing-arrow': 'off',
    'react/no-find-dom-node': 'off',
    'object-curly-newline': 'off',
    'react/display-name': 'off',
    'import/no-named-as-default': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['warn', { code: 120, ignorePattern: '^import\\W.*' }],
    'react/jsx-one-expression-per-line': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-curly-newline': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/no-unresolved': 'error',
    'arrow-body-style': 'off',
    quotes: ['error', 'single', 'avoid-escape'],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/typescript',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/arrow-body-style': 'off',
        '@typescript-eslint/no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
        '@typescript-eslint/no-use-before-define': ['off'],
        camelcase: 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['packages/*/tsconfig.json', fs.existsSync('tsconfig.json') && 'tsconfig.json'].filter(Boolean),
      },
      'babel-module': {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
