module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@trivago/prettier-plugin-sort-imports'),
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
    '^next/(.+)',
    '<THIRD_PARTY_MODULES>',

    // business logic & apis
    '^@hooks(.*)$',

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
