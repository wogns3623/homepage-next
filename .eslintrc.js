module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],

  settings: {
    'import/resolver': {
      [require.resolve('./scripts/eslint-resolver.js')]: {},
    },
  },
};
