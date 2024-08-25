const replaceColor = {
  395664: '--title-text',
  '9CABB2': '--description-text',
};
module.exports = {
  svgoConfig: {
    plugins: [
      'minifyStyles'
    ],
  },
  jsx: {
    babelConfig: {
      plugins: [
        [
          '@svgr/babel-plugin-replace-jsx-attribute-value',
          {
            values: Object.entries(replaceColor).map(([color, variable]) => ({
              value: `#${color}`,
              newValue: `var(${variable}, #${color})`,
            })),
          },
        ],
      ],
    },
  },
};
