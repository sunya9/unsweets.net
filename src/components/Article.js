import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import Disqus from 'disqus-react'
import articleStyles from '../css/article.module.scss'
import { Twitter, Facebook } from 'react-feather'
import { getDateStr } from '../util'

function getHeading(post, isIndex) {
  const inner = isIndex
    ? <Link className="article-title" to={post.fields.path} itemProp="url">{post.frontmatter.title}</Link>
    : post.frontmatter.title
  return <h1 itemProp="name">{inner}</h1>
}

function openWindow(e) {
  e.preventDefault()
  const { href } = e.target
  const D = 550,
    A = 450,
    C = screen.height,
    B = screen.width,
    H = Math.round((B / 2)-(D / 2)),
    G = C > A ? Math.round((C / 2)-(A / 2)) : 0
  window.open(href,'',`left=${H},top=${G},width=${D},height=${A},personalbar=0,toolbar=0,scrollbars=1,resizable=1`)
}

function Article({ post, index }) {
  const dateStr = getDateStr(post)

  const isPost = post.fields && post.fields.type === 'post'
  return (
    <StaticQuery
      query={postQuery}
      render={config => {
        const absPath = `${config.site.siteMetadata.siteUrl}${post.fields.path}`
        const { disqusShortname } = config.site.siteMetadata.social
        const disqusConfig = {
          url: absPath,
          identifier: absPath,
          title: post.frontmatter.title,
      };
        return (
          <article className="article" itemScope itemProp="blogPost">
            <header className={articleStyles.header}>
              {getHeading(post, index)}
              {isPost &&
                <time className={articleStyles.date} dateTime={post.frontmatter.date} itemProp="datePublished">
                  {dateStr}
                </time>
              }
              {post.frontmatter.categories &&
                <div className={articleStyles.category}>
                  <ul>
                    {
                      post.frontmatter.categories.map(category => (
                        <li>
                        <Link to={`/categories/${category.toLowerCase()}`}>
                          {category}
                        </Link>
                      </li>
                      ))
                    }
                  </ul>
                </div>
              }
            </header>
            <div className={articleStyles.body} itemProp="articleBody">
              {index
                ? (
                  <div>
                    <p dangerouslySetInnerHTML={{__html: post.excerpt}} />
                    <Link className="button button-outline button-wave" to={`${post.fields.path}#more`}>Read more</Link>
                  </div>
                )
                : (
                  <div dangerouslySetInnerHTML={{__html: post.html}} />
                )
              }
            </div>
            { isPost && !index &&
              <footer className={articleStyles.footer}>
                <aside>
                  <ul className={articleStyles.share}>
                    <li className="article-share-twitter">
                      <a href={`https://twitter.com/intent/tweet?url=${absPath}&amp;text=${post.frontmatter.title}&amp;related=${config.site.siteMetadata.social.twitter}`} onClick={openWindow}>
                        <Twitter />
                      </a>
                    </li>
                    <li className="article-share-facebook">
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${absPath}`} onClick={openWindow}>
                        <Facebook />
                      </a>
                    </li>
                  </ul>
                </aside>
              </footer>
            }

            {(!index && isPost && disqusShortname) &&
              <section id="comments" className={articleStyles.comments}>
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
              </section>
            }
          </article>
        )
      }}
    />
  )
}

Article.propTypes = {
  post: PropTypes.object,
  index: PropTypes.bool
}


export default Article

const postQuery = graphql`
  query postQuery {
    site {
      siteMetadata {
        siteUrl
        social {
          disqusShortname
        }
      }
    }
  }
`
