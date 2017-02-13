import React, { PropTypes } from 'react'
import './style.scss'

class PaymentBreadcrumb extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render () {
    return (
      <div className='payment-breadcrumb'>
        <ol className='breadcrumb '>
          <li className='active'>{this.props.title}</li>
        </ol>
      </div>
    )
  }
}

PaymentBreadcrumb.defaultProps = {
  title: '页面标题'
}

export default PaymentBreadcrumb
