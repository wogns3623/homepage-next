const { merge } = require('lodash');

module.exports = {
  plugins: [
    merge(require('@trivago/prettier-plugin-sort-imports'), require('prettier-plugin-tailwindcss')),
  ],
  arrowParens: 'avoid',
  jsxSingleQuote: true,
  bracketSameLine: true,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  endOfLine: 'auto',
  importOrder: [
    '^react$',
    '^(next|next/.+)$',
    '<THIRD_PARTY_MODULES>',

    // business logic & apis
    '^@(?:hooks|helpers|utils|types)(.*)$',

    // components
    '^@(?:components|styles)(.*)$',

    // assets
    '^@(?:public)(.*)$',

    // others
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
