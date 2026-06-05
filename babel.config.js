module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './app',
            '@screens': './app/screens',
            '@components': './app/components',
            '@hooks': './app/hooks',
            '@utils': './app/utils',
            '@types': './app/types',
            '@store': './app/store',
            '@providers': './app/providers',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
