import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import headerStyles from '../css/header.module.scss'
import { Info, List, Rss, Search } from 'react-feather'

function Header({ root }) {
  return (
    <StaticQuery
      query={headerQuery}
      render={data => {
        const { title, description, siteUrl } = data.site.siteMetadata
        const HeadingTag = root ? 'h1' : 'p'
        const SubHeadingTag = root ? 'h2' : 'p'
        return (
          <header className={headerStyles.header}>
            <div className="container">
              <HeadingTag className={headerStyles.title}>
                { root
                  ? <span>{title}</span>
                  : <Link to="/">{title}</Link>
                }
              </HeadingTag>
              <SubHeadingTag className={headerStyles.description}>{description}</SubHeadingTag>
                <nav className={headerStyles.nav}>
                  <ul>
                    <li>
                      <Link to="/about">
                        <Info />
                      </Link>
                    </li>
                    <li>
                      <Link to="/archives" >
                        <List />
                      </Link>
                    </li>
                    <li>
                      <a href="/rss.xml" >
                        <Rss />
                      </a>
                    </li>
                  </ul>
                  <div className={headerStyles.searchView}>
                    <form className={headerStyles.searchForm} action="//google.com/search" method="get" acceptCharset="UTF-8">
                      <input type="search" placeholder="Search" className={headerStyles.searchFormInput} name="q" />
                      <input type="hidden" name="sitesearch" value={siteUrl} />
                      <button type="submit" className={headerStyles.searchFormSubmit}>
                        <Search />
                      </button>
                    </form>
                  </div>
                </nav>
            </div>
          </header>
        )
      }}
    />
  )
}

Header.defaultProps = {
  root: false
}

Header.propTypes = {
  root: PropTypes.bool
}

export default Header

const headerQuery = graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
  }
`
