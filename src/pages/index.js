import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Article from '../components/Article'
import ArticleList from '../components/ArticleList'
import archivesStyles from '../css/archives.module.scss'
import { getDateStr } from '../util'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const [firstPost] = posts
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <Article post={firstPost.node} index={true} />
        <h1 style={{marginTop: '1.5em'}}>Recent Entries</h1>
        <ArticleList posts={posts.slice(1)} />
        <Link to="/archives" className="button button-outline button-wave">Archives</Link>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: { type: {eq: "post" }}}
      limit: 10
    ) {
      edges {
        node {
          excerpt(format: HTML)
          fields {
            slug
            path
            type
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`
