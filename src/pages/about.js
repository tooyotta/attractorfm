import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Nav from "../components/nav"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Nav />
      <Bio />
      <div className="about">
        <h2>hoge</h2>
        <StaticImage
        className="artwork"
        layout="fixed"
        formats={["PNG"]}
        src="../images/attractorfm.png"
        width={300}
        height={300}
        quality={95}
        alt="artwork"
      />
        
        <p>hoge is about the human.</p>
        <h3>Radio personality</h3>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
