import React from 'react'
import { Link } from 'gatsby'
import PageHeader from './PageHeader'
import PageFooter from './PageFooter'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    return (
      <div>
        <PageHeader root={rootPath === location.pathname} />
        <main>
          <div className="container">
            {children}
          </div>
        </main>
        <PageFooter />
      </div>
    )
  }
}

export default Layout
