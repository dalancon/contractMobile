import React from 'react'
import classNames from 'classnames'
import ConditionLink from './ConditionLink'
import './style.scss'

/** 表格筛选条目*/
class GroupItem extends React.Component {
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
          value: React.PropTypes.string.isRequired
        })
      )
    }),
    onSubmit: React.PropTypes.func
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      'multiple': false,  // 是否是多选状态
      'expand': false,  // 是否是展开状态
      'value': new Set()
    }
  }

  cancel = () => {
    this.setState({
      'multiple': false,
      'expand': false,
      'value': new Set()
    })
  }

  submit = () => {
    this.props.onSubmit(this.props.condition.field, Array.from(this.state.value))
  }

  selectValue (value) {
    if (this.state.value.has(value)) {
      this.state.value.delete(value)
      this.setState({'value': this.state.value})
    } else {
      this.setState({'value': this.state.value.add(value)})
    }
  }

  showMore = () => {
    this.setState({'expand': true})
  }

  showMulti = () => {
    this.setState({'multiple': true, 'expand': true})
  }

  hideMore = () => {
    this.setState({'expand': false})
  }

  clickCondition = (value) => {
    this.selectValue(value)
    this.submit()
  }

  render () {
    let component = this

    const rowClasses = classNames({
      'multi-mode': this.state.multiple,
      'hide-toggle': !this.props.condition.toggle,
      'expand-mode': this.state.expand,
      'row J_Row': true
    })

    return (
      <div className='group'>
        <div className={rowClasses}>
          <div className='head'>
            <h4>
              <span className='title'>{this.props.condition.text}</span>:
            </h4>
          </div>
          <div className='body'>
            <div className='items J_Items'>
              <div className='items-inner g-clearfix'>
                {
                  this.props.condition.sub.map(function (x, index) {
                    return (
                      <ConditionLink key={index} choosed={component.state.value.has(x.value)} text={x.text}
                        value={x.value} onClickCondition={component.clickCondition} />
                    )
                  })
                }
              </div>
            </div>
            <div className='btns'>
              <span className='submit J_SubmitMulti' onClick={this.submit}>提交</span>
              <span className='cancel J_CloseMulti' onClick={this.cancel}>取消</span>
            </div>
          </div>
          {
            this.props.condition.multiple === true ? (
              <div className='foot'>
                <span className='switch-multi J_OpenMulti' onClick={this.showMulti}>
                  多选
                </span>
                <span className='show-more J_ToggleItems' onClick={this.showMore}>
                  更多<span className='icon-btn-arrow-down-2' />
                </span>
                <span className='show-less J_ToggleItems' onClick={this.hideMore}>
                  收起<span className='icon-btn-arrow-up-2' />
                </span>
              </div>) : (<div className='foot' />)
          }
        </div>
      </div>
    )
  }
}

GroupItem.defaultProps = {
  condition: {}
}

export default GroupItem
