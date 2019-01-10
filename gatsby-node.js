const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
                path
                type
              }
              frontmatter {
                title
                date
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      const isPost = post.node.fields.type === 'post'
      createPage({
        path: post.node.fields.path,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous: isPost && previous && previous.fields.type === 'post' ? previous : null,
          next: isPost && next && next.fields.type === 'post' ? next : null,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    const type = node.frontmatter.date ? 'post' : 'page'

    const path = type === 'post'
      ? (() => {
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()
        const month = `${date.getMonth() + 1}`.padStart(2, '0')
        return `/${year}/${month}${value}`
      })()
      : value

    createNodeField({
      name: `path`,
      node,
      value: path,
    })
    createNodeField({
      name: `type`,
      node,
      value: type,
    })
  }
}
