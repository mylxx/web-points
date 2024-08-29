const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development';
const babelPlugins = isDev
  ? [
      [
        'babel-plugin-jsxfileattribute',
        {
          exclude: ['ThemeProvider'],
          showCompleteFilePath: true,
          isShowAwakeIdeMsg: false,
        },
      ],
    ]
  : basePlugins;

module.exports = {
  presets: ['next/babel'],
  plugins: babelPlugins,
};
