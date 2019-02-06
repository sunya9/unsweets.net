import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import archivesStyles from '../css/archives.module.scss'
import { getDateStr } from '../util'

function ArticleList({ posts, omitYear }) {
  return (
    <ul className={archivesStyles.archives}>
      {posts.map(({ node: post }) => {
        const title = post.frontmatter.title || post.fields.slug
        return (
          <li key={post.fields.slug}>
            <div>
              <Link to={post.fields.path}>
                {title}
              </Link>
              <time dateTime={post.frontmatter.date}>{getDateStr(post, omitYear)}</time>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
import {from} from 'rxjs';

ArticleList.defaultProps = {
  posts: () => [],
  omitYear: false
}

ArticleList.propTypes = {
  posts: PropTypes.array,
  omitYear: PropTypes.bool
}

export default ArticleList
