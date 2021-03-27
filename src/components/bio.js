/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)


const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.png"
        width={80}
        height={80}
        quality={95}
        alt="symbol logo"
      />
      {author?.name && (
        <p>
          attractor.fm podcast is about 雑談<br/>
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            <FontAwesomeIcon icon={['fab', 'twitter']} className="social-icon" />
          </a>
          <a href={`https://instagram.com/${social?.twitter || ``}`}>
            <FontAwesomeIcon icon={['fab', 'instagram']} className="social-icon" />
          </a>
          <a href={`https://facebook.com/${social?.twitter || ``}`}>
            <FontAwesomeIcon icon={['fab', 'facebook']} className="social-icon" />
          </a>
          <a href="https://www.youtube.com/channel/UCh9m0sUiUZuDSK-dN8l2BDA">
            <FontAwesomeIcon icon={['fab', 'youtube']} className="social-icon" />
          </a>

        </p>
      )}
    </div>
  )
}

export default Bio
