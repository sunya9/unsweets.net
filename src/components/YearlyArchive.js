import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import ArticleList from './ArticleList'

function YearlyArchive({ year, posts }) {
  return (
    <div>
      <h2>{year}</h2>
      <ArticleList posts={posts} omitYear={true} />
    </div>
  )
}

YearlyArchive.propTypes = {
  year: PropTypes.number,
  posts: PropTypes.array
}

YearlyArchive.defaultProps = {
  posts: () => []
}

export default YearlyArchive
