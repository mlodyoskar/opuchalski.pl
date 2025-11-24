// * @type {import('next').NextConfig}

module.exports = {
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
