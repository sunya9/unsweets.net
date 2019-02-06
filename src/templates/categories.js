import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import YearlyArchiveList from '../components/YearlyArchiveList'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import PropTypes from 'prop-types'

class Categories extends React.Component {
  render() {
    const { pageContext: { category }, data, location } = this.props

    const title = `Category::${category}`
    return (
      <Layout location={location} title={title}>
        <SEO title={title} />
        <h1>{title}</h1>
        <YearlyArchiveList posts={data.allMarkdownRemark.edges} />
      </Layout>
    )
  }
}

export default Categories

Categories.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired
  })
}


export const pageQuery = graphql`
  query CategoryQuery($category: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {fields: { type: {eq: "post" }}, frontmatter: {categories: {in: [$category]}}}
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
