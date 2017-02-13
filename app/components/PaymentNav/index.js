import React from 'react'
import './style.scss'
import auth from 'utils/auth.js'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Headroom from 'react-headroom'

class PaymentNav extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes = {
    pages: React.PropTypes.arrayOf(React.PropTypes.shape({
      titie: React.PropTypes.string,
      url: React.PropTypes.string,
      children: React.PropTypes.array
    })),
    loginUser: React.PropTypes.shape({
      userName: React.PropTypes.string
    })
  }

  logout = () => {
    event.preventDefault()
    console.log('logout!')
    auth.logout(function () {
      this.context.router.replace('/login')   // 默认转到login
    }.bind(this))
  }

  useChinese = () => {
    i18next.changeLanguage('zh', (err, t) => {
      if (err) {
        console.log(err)
      }
    })
  }

  useEnglish = () => {
    i18next.changeLanguage('en', (err, t) => {
      if (err) {
        console.log(err)
      }
    })
  }

  render () {
    console.log(this.props)

    return (
      <Headroom>
        <header className='payment-nav'>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <div className='ctg-logo'><span /></div>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                {
                  this.props.pages ? this.props.pages.map(function (page, index) {
                    if (!page.children) {
                      return (
                        <LinkContainer key={index} to={page.url}>
                          <NavItem href={page.url}>{page.title}</NavItem>
                        </LinkContainer>
                      )
                    } else {
                      return (
                        <NavDropdown key={index} id={'payemnt-nav-' + index} title={page.title}>
                          {page.children.map(function (subPage, subIndex) {
                            return (
                              <LinkContainer key={index + subIndex} to={subPage.url}>
                                <MenuItem>{subPage.title}</MenuItem>
                              </LinkContainer>
                            )
                          })}
                        </NavDropdown>
                      )
                    }
                  }) : ''
                }
              </Nav>
              <Nav pullRight >
                <NavItem>
                  <span ref='chinese' className='payment-language' onClick={this.useChinese}>中文</span>
                  &nbsp;
                  <span ref='english' className='payment-language' onClick={this.useEnglish} >English</span>
                </NavItem>
                <NavItem>
                  <label className='payment-navbar-welcome'>welcome：</label>
                  {this.props.loginUser ? this.props.loginUser.userName : ''}
                </NavItem>
                <NavItem>
                  <p onClick={this.logout} className='glyphicon glyphicon-off' />
                </NavItem>
              </Nav >
            </Navbar.Collapse>
          </Navbar>
        </header>
      </Headroom>
     )
  }
}

export default PaymentNav
