import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import footerStyles from '../css/footer.module.scss'
import { Twitter, GitHub } from 'react-feather'

export default function Footer() {
  return (
    <StaticQuery
      query={footerQuery}
      render={data => {
        const { social } = data.site.siteMetadata
        return (
          <footer className={footerStyles.footer}>
            <div className="container">
              <small className={footerStyles.copyright}>
                © _X_y_z_.
              </small>
              <ul className={footerStyles.snsLinks}>
                { social.twitter &&
                  <li>
                    <a href={`https://twitter.com/${social.twitter}`} className="twitter" title={`@${social.twitter}`}>
                      <Twitter />
                    </a>
                  </li>
                }
                { social.github &&
                  <li>
                    <a href={`https://github.com/${social.github}`} className="github"  title={social.github}>
                      <GitHub />
                    </a>
                  </li>
                }
              </ul>
            </div>
          </footer>
        )
      }}
    />
  )
}

const footerQuery = graphql`
  query FooterQuery {
    site {
      siteMetadata {
        social {
          twitter
          github
        }
      }
    }
  }
`
