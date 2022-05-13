module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
  plugins: ['@wogns3623/better-exhaustive-deps'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    '@wogns3623/better-exhaustive-deps/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useLoadableCallback|useSetter|useSingletonEffect)',
        staticHooks: {
          useLazyState: [false, true, false],
          useLiftedState: [false, true],
          useRefOf: true,
          useSuspense: [true, true],
          useSynchronizedState: [false, true],
        },
      },
    ],
  },
};
