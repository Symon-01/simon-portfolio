/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://simondesigns.co.ke',
  generateRobotsTxt: true,
  exclude: ['/test-*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}