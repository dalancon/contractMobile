import React from 'react';
import $ from 'jquery';

/** ConditionTag */
class ConditionTag extends React.Component {
  static propTypes = {
    condition: React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      field: React.PropTypes.string.isRequired,
      required: React.PropTypes.bool,
      multiple: React.PropTypes.bool,
      toggle: React.PropTypes.bool,
      sub: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          text: React.PropTypes.string.isRequired,
          value: React.PropTypes.string.isRequired,
        })
      ),
    }),
    candidate: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
      })
    ),
    onSelectCondition: React.PropTypes.func,
    onUnSelectCondition: React.PropTypes.func,
  }

  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  showRequiredConditions = () => {
    $(this.refs.subMenu).css('left', $(this.refs.btn).position().left)
    $(this.refs.subMenu).css('width', $(this.refs.btn).css('width'))
    $(this.refs.subMenu).show()
  }

  hideRequiredConditions = () => {
    $(this.refs.subMenu).hide()
  }

  _onSelectCondition = (e) => {
    const key = $('.pro-required-submenu').find('a').index(e.currentTarget)
    const value = [this.props.candidate[key].value]
    this.props.onSelectCondition(this.props.condition.field, value)
  }

  _onUnSelectCondition = (e) => {
    const value = this.props.condition.sub.map(function (x) {
      return x.value
    })
    this.props.onUnSelectCondition(this.props.condition.field, value)
  }

  render () {
    const cond = this.props.condition
    const showText = cond.sub.map(function (x) { return x.text }).join(',')
    const title = cond.text + ':' + showText
    const component = this

    if (cond.required) {
      return (
        <div>
          <a ref='btn' className='pro icon-tag J_Ajax pro-required' onMouseOver={this.showRequiredConditions}
            onMouseOut={this.hideRequiredConditions} title={title}>
            {cond.text}：<span>{showText}</span><span className='glyphicon glyphicon-menu-down' />
          </a>
          <div ref='subMenu' className='pro-required-submenu'
            onMouseEnter={this.showRequiredConditions} onMouseLeave={this.hideRequiredConditions}>
            {
              this.props.candidate.map(
                function (sub, index) {
                  return (
                    <a key={index} className='item icon-tag J_Ajax J_baikeiTrigger'
                      onClick={component._onSelectCondition}>
                      <span className='text'>{sub.text}</span>
                    </a>
                  )
                }
              )
            }
          </div>
        </div>)
    } else {
      return (
        <a className='pro icon-tag J_Ajax' onClick={this._onUnSelectCondition} title={title} >
          {cond.text}：<span>{showText}</span><span className='glyphicon glyphicon-remove' />
        </a>
      )
    }
  }
}

export default ConditionTag
