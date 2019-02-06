import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import YearlyArchive from './YearlyArchive'

function YearlyArchiveList({ posts }) {
  const groupedPosts = posts
      .reduce((group, post) => {
        const year = new Date(post.node.frontmatter.date).getFullYear()
        if(!(year in group)) group[year] = [post]
        else group[year].push(post)
        return group
      }, {})
  return (
    <div>
      {Object.keys(groupedPosts).sort().reverse().map(year => (
          <YearlyArchive
            key={year}
            year={+year}
            posts={groupedPosts[year]}
          />
        ))}
    </div>
  )
}

YearlyArchiveList.propTypes = {
  posts: PropTypes.array
}

YearlyArchiveList.defaultProps = {
  posts: () => []
}

export default YearlyArchiveList
