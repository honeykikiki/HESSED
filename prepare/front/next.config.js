const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  pwa: {
    dest: 'public',
  },
});

module.exports = withBundleAnalyzer(withPWA(), {
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
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
