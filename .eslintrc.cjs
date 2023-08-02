module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
      'plugin:eslint-plugin-george/base',
      'plugin:eslint-plugin-george/typescript',
      'plugin:eslint-plugin-george/react',
      'plugin:eslint-plugin-george/cypress',
      'plugin:eslint-plugin-george/prettier'

    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
