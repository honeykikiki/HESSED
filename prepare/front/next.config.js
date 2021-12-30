const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withPWA = require('next-pwa');

const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map',
      plugins: [
        ...config.plugins,
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      ],
    };
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
        },
      },
    ],
    [withBundleAnalyzer()],
  ],
  nextConfig,
);

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
