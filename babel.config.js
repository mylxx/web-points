const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development';

const basePlugins = [
  [
    'babel-plugin-injectcomponentcode',
    {
      importComponentFilePath: '@/components/PageWrapper',
      importComponentName: 'PageWrapper',
      isImportDefault: true,
    },
  ],
];
const babelPlugins = isDev
  ? [
      ...basePlugins,
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
