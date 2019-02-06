import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import YearlyArchiveList from '../components/YearlyArchiveList'
import Layout from '../components/Layout'
import SEO from '../components/seo'

class Archives extends React.Component {
  render() {
    const title = 'Archives'
    const { data } = this.props
    
    return (
      <Layout location={this.props.location} title={title}>
        <SEO title={title} />
        <h1>{title}</h1>
        <YearlyArchiveList posts={data.allMarkdownRemark.edges} />
      </Layout>
    )
  }
}

export default Archives


export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: { type: {eq: "post" }}}
    ) {
      edges {
        node {
          fields {
            slug
            path
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
