import NextBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';

const isDev = process.env.NEXT_PUBLIC_NODE_ENV === 'development';
const withNextIntl = createNextIntlPlugin();

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

let remotePatterns = [];

if (isDev) {
  remotePatterns.push({
    protocol: 'http',
    hostname: 'localhost',
    port: '4009',
    pathname: '**',
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  //严格模式主要用于识别不安全的生命周期、过时的API等情况。但在开发模式下，会让组件执行两次，意味着会多次调用接口，因此需关闭该模式
  reactStrictMode: false,
  assetPrefix: `${process.env.NEXT_PUBLIC_PREFIX}`,
  sassOptions: {},
  webpack(config) {
    !isDev &&
      config.module.rules.unshift({
        test: /\.(tsx?)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'string-replace-loader',
            options: {
              multiple: [
                {
                  search:
                    /(?<=build-ignore-start)([\s\S]*?)(?=build-ignore-end)/g,
                  replace: ' ',
                  flags: 'g',
                },
              ],
            },
          },
        ],
        enforce: 'pre',
      });
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    ); // 针对 SVG 的处理规则
    fileLoaderRule.exclude = /\.svg$/i;

    // 多项目打包调整，使用同一份 react|react-dom|react-router-dom
    // todo prelogin plat-form-ui
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: 'polyflow-reactseries-vendors',
          chunks: 'all',
        },
      },
    };
    return config;
  },
  images: {
    remotePatterns,
  },
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
