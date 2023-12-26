module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        root: ['.'],
        extensions: [
          '.ts',
          '.ios.ts',
          '.android.ts',
          '.tsx',
          '.ios.tsx',
          '.android.tsx',
          '.js',
          '.jsx',
          '.ios.js',
          '.android.js',
          '.json',
          '.svg',
          '.jpg',
          '.png',
        ],
        alias: {
          '@assets': './app/assets',
          '@components': './app/components',
          '@config': './app/config',
          '@constants': './app/constants',
          '@entrypoint': './app/entrypoint',
          '@hooks': './app/hooks',
          '@models': './app/models',
          '@navigation': './app/navigation',
          '@screens': './app/screens',
          '@services': './app/services',
          '@store': './app/store',
          '@utils': './app/utils',
        },
      },
    ],
    'jest-hoist',
  ],
};
