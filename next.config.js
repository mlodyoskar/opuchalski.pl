// * @type {import('next').NextConfig}

module.exports = {
    async redirects() {
        return [
            {
                source: '/cv',
                destination: '/CV_Oskar_Puchalski.pdf',
                permanent: true,
            },
        ]
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}