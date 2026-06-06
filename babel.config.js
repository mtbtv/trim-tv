module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['react-native-worklets-core/plugin'babel-preset-expo'react-native-worklets-core/plugin', { jsxImportSource: 'react-native-worklets-core/plugin'nativewind'react-native-worklets-core/plugin' }],
      'react-native-worklets-core/plugin'nativewind/babel'react-native-worklets-core/plugin',
    ],
    plugins: [
      [
        'react-native-worklets-core/plugin'module-resolver'react-native-worklets-core/plugin',
        {
          alias: {
            'react-native-worklets-core/plugin'@'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app'react-native-worklets-core/plugin',
            'react-native-worklets-core/plugin'@screens'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app/screens'react-native-worklets-core/plugin',
            'react-native-worklets-core/plugin'@components'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app/components'react-native-worklets-core/plugin',
            'react-native-worklets-core/plugin'@hooks'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app/hooks'react-native-worklets-core/plugin',
            'react-native-worklets-core/plugin'@utils'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app/utils'react-native-worklets-core/plugin',
            'react-native-worklets-core/plugin'@types'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app/types'react-native-worklets-core/plugin',
            'react-native-worklets-core/plugin'@store'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app/store'react-native-worklets-core/plugin',
            'react-native-worklets-core/plugin'@providers'react-native-worklets-core/plugin': 'react-native-worklets-core/plugin'./app/providers'react-native-worklets-core/plugin',
          },
        },
      ],
      'react-native-worklets-core/plugin'react-native-reanimated/plugin'react-native-worklets-core/plugin',
    ],
  };
};
