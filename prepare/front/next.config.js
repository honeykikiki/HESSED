const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  compress: true,
  ignoreDuringBuilds: true,
  webpack(config) {
    const prod = process.env.NODE_ENV === 'production';
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval-source-map',
      // plugins: [
      //   ...config.plugins,
      //   new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
      // ],
    };
  },
});
