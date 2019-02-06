import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

class NotFoundPage extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const title = '404'
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="404" />
        <h1>{title}</h1>
        <p>お探しのページは見つかりませんでした。検索フォームから記事の検索を試みてください。</p>
      </Layout>
    )
  }
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
