import React from 'react'
import './style.scss'

class PaymentFooter extends React.Component {
  render () {
    return (
      <div className='payment-footer'>
        <div className='copy-right'>
          版权所有
          <a href='http://www.ctgpc.com.cn/' target='_blank'>中国长江三峡集团公司</a>
          All rights reserved. 服务热线：0717-6761000
        </div>
      </div>
    )
  }
}

export default PaymentFooter
