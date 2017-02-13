import React from 'react'
import classNames from 'classnames'

/** ConditionLink */
class ConditionLink extends React.Component {
  // 上一级传如果属性
  static propTypes = {
    text: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    choosed: React.PropTypes.bool,
    onClickCondition: React.PropTypes.func
  }

  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  _onClick = () => {
    this.props.onClickCondition(this.props.value)
  }

  render () {
    const conditionClasses = classNames({
      'icon-hover': this.props.choosed,
      'item icon-tag J_Ajax J_baikeiTrigger': true
    })

    return (
      <a onClick={this._onClick} className={conditionClasses} >
        <span className='icon-btn-check-small' />
        <span className='text'>{this.props.text}</span>
      </a>
    )
  }
}

export default ConditionLink
