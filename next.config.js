// * @type {import('next').NextConfig}

class VeliteWebpackPlugin {
  static started = false;
  constructor(/** @type {import('velite').Options} */ options = {}) {
    this.options = options;
  }
  apply(/** @type {import('webpack').Compiler} */ compiler) {
    // executed three times in nextjs
    // twice for the server (nodejs / edge runtime) and once for the client
    compiler.hooks.beforeCompile.tapPromise('VeliteWebpackPlugin', async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === 'development';
      const { build } = await import('velite');
      await build({ ...this.options, watch: dev, clean: !dev });
    });
  }
}

/** @type {import('next').NextConfig} */
module.exports = {
  turbopack: {},
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin({}));
    return config;
  },
  async redirects() {
    return [
      {
        source: '/cv',
        destination: '/CV_Oskar_Puchalski.pdf',
        permanent: true,
      },
    ];
  },
};
