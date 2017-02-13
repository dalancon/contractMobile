import React from 'react';
import './style.scss';
import { Link } from 'react-router';

class PaymentToolbar extends React.Component {
  static propTypes = {
    btns: React.PropTypes.arrayOf(React.PropTypes.shape({
      tip: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      split: React.PropTypes.bool,
      badge: React.PropTypes.number
    }))
  }

  render () {
    return (
      <div className='payment-toolbar'>
        <div className='payment-toolbar-space' style={{height: '25%'}} />
        <ul className='payment-toolbar-list'>
          {
            this.props.btns.map(function (btn) {
              return (
                <li key={btn.url} className='payment-toolbar-item'>
                  <div className='payment-toolbar-item-icon'>
                    <Link to={btn.url} className={'glyphicon ' + btn.icon} />
                    <div className={(btn.badge && btn.badge !== 0) ? 'payment-toolbar-badge' : 'hide'}>
                      {btn.badge}
                    </div>
                  </div>
                  <div className='payment-toolbar-item-tip'>
                    <span>{btn.tip}</span>
                    <div className='payment-toolbar-item-arrow'>◆</div>
                  </div>
                  <div className={btn.split ? 'payment-toolbar-item-split' : 'hide'} />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

PaymentToolbar.defaultProps = {
  btns: [
    {
      tip: '按钮的提示',
      url: '#',
      icon: 'glyphicon-asterisk',
      split: true
    }
  ]
}
export default PaymentToolbar
