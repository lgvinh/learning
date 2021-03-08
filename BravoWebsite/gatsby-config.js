require('dotenv').config({
  path: '.env'
});

// require .env.development or .env.production
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const WEBSITE_KEYWORDS = [
  'HR Platform',
  'Human Resources Platform',
  'Talent HR Solutions',
  'Global Talent Solutions, Talent Management Solutions',
  'Best Survey Platform',
  'Growth Platform',
  'Platform Growth Strategy',
  'Online HR Software',
  'Online HR Management Software',
  'Contact Us',
  'Terms of service',
  'Privacy policy'
];

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.bravosuite.io',
    author: 'BravoSUITE',
    title: 'Human Resources Platform (HR Platform) - BravoSUITE',
    description: 'The Tool That Brings You The Ultimate Business Experience - BravoSUITE',
    keywords: WEBSITE_KEYWORDS
  },
  plugins: [
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url:
          process.env.WPGRAPHQL_URL,
        verbose: true,
        develop: {
          hardCacheMediaFiles: true
        },
        debug: {
          graphql: {
            writeQueriesToDisk: true
          }
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === 'development'
                ? 50 // Lets just pull 50 posts in development to make it easy on ourselves.
                : 5000 // and we don't actually need more than 5000 in production for this particular site
          }
        }
      }
    },
    'gatsby-plugin-chakra-ui',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/ // See below to configure properly
        }
      }
    },
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-antd',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        useResolveUrlLoader: true
      }
    },
    {
      resolve: 'gatsby-plugin-recaptcha',
      options: {
        async: true,
        defer: true
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Human Resources Platform - BravoSUITE',
        short_name: 'HR Platform',
        start_url: '/',
        background_color: '#FFF',
        theme_color: '#F7F7F7',
        display: 'standalone',
        scope: '/',
        icon: 'static/favicon.ico',
        icon_options: {
          purpose: 'any maskable'
        }
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/**/*.html': [
            'Cache-Control: public',
            'Cache-Control: max-age=0',
            'Cache-Control: must-revalidate'
          ],
          '/*.js': [
            'Cache-Control: public',
            'Cache-Control: max-age=31536000',
            'Cache-Control: immutable'
          ],
          '/sw.js': [
            'Cache-Control: public',
            'Cache-Control: max-age=0',
            'Cache-Control: must-revalidate'
          ],
          '/page-data/**/*.json': [
            'Cache-Control: public',
            'Cache-Control: max-age=0',
            'Cache-Control: must-revalidate'
          ],
          '/page-data/app-data.json': [
            'Cache-Control: public',
            'Cache-Control: max-age=0',
            'Cache-Control: must-revalidate'
          ],
          '/static/*': [
            'Cache-Control: public',
            'Cache-Control: max-age=31536000',
            'Cache-Control: immutable'
          ],
          '/images/*': [
            'Cache-Control: public',
            'Cache-Control: max-age=31536000',
            'Cache-Control: immutable'
          ],
          '/svg/*': [
            'Cache-Control: public',
            'Cache-Control: max-age=31536000',
            'Cache-Control: immutable'
          ]
        }
      }
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                  context {
                    modifiedGmt
                  }
                }
              }
            }
          }
        `,
        serialize: ({ site, allSitePage }) => allSitePage.edges.map((edge) => ({
          url: `${site.siteMetadata.siteUrl}${edge.node.path}`,
          lastmodISO: (edge.node.context.modifiedGmt) ? edge.node.context.modifiedGmt : null
        }))
      }
    }
  ]
};
