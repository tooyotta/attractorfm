// gatsby-plugin-podcast-rss-feed setting
const feedOptions = {
  title: 'title',
  description: 'description',
  feed_url: 'https://attractor.fm/rss.xml',
  site_url: 'https://attractor.fm',
  image_url: 'https://attractor.fm/icon.png',
  docs: 'https://attractor.fm/rss/docs.html',
  managingEditor: 'Naoya Toyota',
  webMaster: 'Naoya Toyota',
  copyright: '©2021 Naoya Toyota',
  language: 'ja',
  categories: ['Tech News','Technology','Science'],
  pubDate: 'May 20, 2019 04:00:00 GMT',
  ttl: '60',
  custom_namespaces: {
    'itunes': 'http://www.itunes.com/dtds/podcast-1.0.dtd'
  },
  custom_elements: [
    {'itunes:subtitle': ''},
    {'itunes:author': 'Naoya Toyota'},
    {'itunes:summary': '浅知恵雑談系ポッドキャスト'},
    {'itunes:owner': [
      {'itunes:name': 'Naoya Toyota'},
      {'itunes:email': 'info@attractor.fm'}
    ]},
    {'itunes:image': {
      _attr: {
        href: 'http://example.com/podcasts/everything/AllAboutEverything.jpg'
      }
    }},
    {'itunes:category': [
      {_attr: {
        text: 'News'
      }},
      {'itunes:category': {
        _attr: {
          text: 'Tech News'
        }
      }}
    ]},
    {'itunes:category': [
      {_attr: {
        text: 'Technology'
      }},
      {'itunes:category': {
        _attr: {
          text: 'Science'
        }
      }}
    ]},
    {'itunes:explicit': 'false'}
  ]
}

// Original config
module.exports = {
  siteMetadata: {
    title: `attractor.fm podcast`,
    author: {
      name: `Naoya Toyota`,
      summary: `しがない雑談Podcast`,
    },
    description: `世界の陰謀論をお届けしない番組です`,
    siteUrl: `https://attractor.fm`,
    social: {
      twitter: `attractorfm`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "G-48WPC67Z9H", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
      },
    },
    {
      resolve: `gatsby-plugin-podcast-rss-feed`,
      options: {
          feedOptions
      },
    }
  ],
}