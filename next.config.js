// next.config.js
module.exports = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
