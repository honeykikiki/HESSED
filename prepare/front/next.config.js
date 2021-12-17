const withCSS = require('@zeit/next-css');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack5: false,
  webpack(config, { isServer }) {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      };
    }
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map',
    };
  },
});

// module.exports = nextConfig = {
//   compress: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   future: {
//     webpack5: true,
//   },
//   webpack: (config, { webpack }) => {
//     config.plugins.push(
//       new webpack.IgnorePlugin({
//         mode: prod ? 'production' : 'development',
//         devtool: prod ? 'hidden-source-map' : 'eval-source-map',
//         resourceRegExp: /.*/,
//         contextRegExp: /__tests__/,
//       }),
//     );
//     return config;
//   },
// };
