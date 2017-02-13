import React from 'react'
import './style.scss'
import { Link } from 'react-router'

/** 页面内部tab导航*/
class PaymentNavTab extends React.Component {
  static propTypes = {
    links: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired
    }))
  }

  render () {
    // let activeIndex = this.props.activeIndex
    // let clickTab = this.props.clickTab

    return (
      <div className='payment-nav-tab'>
        <ul className='nav nav-tabs nav-justified'>
          {
            this.props.links.map(function (link) {
              return (
                <li key={link.url} role='presentation'>
                  <Link to={link.url} activeClassName='active' >{link.title}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

PaymentNavTab.defaultProps = {
  links: [
    {
      title: '页面标题',
      url: '#',
      value: ''
    }
  ]
}

export default PaymentNavTab
