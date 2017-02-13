import React from 'react'
import './style.scss'

class PageHeader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    subTitle: React.PropTypes.string
  }

  render () {
    return (
      <div className='payment-page-header'>
        <h2> {this.props.title} <small>{this.props.subTitle ? ('——' + this.props.subTitle) : ''}</small></h2>
      </div>
    )
  }
}

PageHeader.defaultProps = {
  title: '页面标题'
}

export default PageHeader
