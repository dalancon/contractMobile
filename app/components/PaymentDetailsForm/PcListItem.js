import React from 'react'
import { Collapse } from 'react-bootstrap'
import formatter from 'utils/formatter.js'
import classNames from 'classnames'
import './style.scss'

/** 表格筛选条目*/
class PcListItem extends React.Component {
  static propTypes = {
    index: React.PropTypes.number.isRequired,
    value: React.PropTypes.number,
    remark: React.PropTypes.string,
    poItem: React.PropTypes.string.isRequired,
    incurredFcostsTotal: React.PropTypes.number.isRequired,
    ptdCommitmentQty: React.PropTypes.number.isRequired,
    description: React.PropTypes.string,
    unitDescription: React.PropTypes.string,
    incurredPrice: React.PropTypes.number,
    incurredQtyTotal: React.PropTypes.number,
    unitOfMeasure: React.PropTypes.string,
    ptdCommitmentFrate: React.PropTypes.number,
    currency: React.PropTypes.string,
    onChange: React.PropTypes.func,   // 输入细项信息时触发
    onRemark: React.PropTypes.func,   // 输入备注信息时触发
    onToggle: React.PropTypes.func,   // 展开备注项时触发
    expand: React.PropTypes.bool     // 是否展开
  }

  setDefaultIncurredFcosts = (e) => {
    if (!this.props.value) {
      let value = this.props.incurredPrice - this.props.incurredFcostsTotal
      this.props.onChange(value, this.props.index)
    }
  }

  setDefaultIncurredQty = (e) => {
    if (!this.props.value) {
      let value = this.props.incurredPrice - this.props.incurredFcostsTotal
      this.props.onChange(value, this.props.index)
    }
  }

  _onChange = (e) => {
    e.preventDefault()
    this.props.onChange(e.target.value, this.props.index)
  }

  _onRemark = (e) => {
    e.preventDefault()
    this.props.onRemark(e.target.value, this.props.index)
  }

  _onToggle = () => {
    this.setState({ expand: !this.props.expand })
    this.props.onToggle(!this.props.expand, this.props.index)
  }

  valueValidation () {
    var value = this.props.value
    if (this.props.unitOfMeasure === 'LOT') {
      const maxValue = this.props.incurredPrice - this.props.incurredFcostsTotal
      if (value > maxValue) {
        return {
          validType: 1,
          validMsg: '警告：金额超过可接收的范围'
        }
      } else if (value < 0) {
        return {
          validType: 1,
          validMsg: '警告：金额为负值'
        }
      } else {
        return {
          validType: 0,
          validMsg: ''
        }
      }
    } else {
      const maxValue = this.props.ptdCommitmentQty - this.props.incurredQtyTotal
      if (value > maxValue) {
        return {
          validType: 1,
          validMsg: '警告：数量超过可接收的范围'
        }
      } else if (value < 0) {
        return {
          validType: 1,
          validMsg: '警告：数量为负值'
        }
      } else {
        return {
          validType: 0,
          validMsg: ''
        }
      }
    }
  }

  remarkValidation () {
    if (this.props.remark && this.props.remark.length > 100) {
      return {
        validType: 1,
        validMsg: '限100个字符！'
      }
    } else {
      return {
        validType: 0,
        validMsg: ''
      }
    }
  }

  incurredFcostsSum () {
    var costs = this.props.value ? parseFloat(this.props.value) * this.props.ptdCommitmentFrate : 0
    return formatter.formatMoney(costs)
  }

  render () {
    var valid1 = this.valueValidation()
    var vaild2 = this.remarkValidation()

    const remarkClasses = classNames({
      'hide': this.props.expand,
      'glyphicon': true,
      'glyphicon-edit': true,
      'remark-show-button': true
    })

    return (
      <td colSpan='9' style={{borderTop: 'none'}}>
        <div className='col-md-11 col-sm-12'>
          <div className='form-group col-md-6 col-sm-12'>
            <label className='control-label'>支付数量：</label>
            {
              this.props.unitOfMeasure === 'LOT'
              ? (<span className='form-control-static'>1</span>)
              : (<div style={{display: 'inline-block'}}>
                <input type='number' step='1' onChange={this._onChange} onFocus={this.setDefaultIncurredQty}
                  className='form-control' name={'pcList[' + this.props.index + '].incurredQty'}
                  value={this.props.value || ''} />
                <div style={{display: 'inline-block'}}>
                  {
                    valid1.validType !== 0
                    ? (<label className={valid1.validType === 1 ? 'warning' : 'error'}>{valid1.validMsg}</label>)
                    : (<label />)
                  }
                </div>
              </div>)
            }
          </div>
          <div className='form-group col-md-6 col-sm-12'>
            <label className='control-label'>支付金额：</label>
            {
              this.props.unitOfMeasure === 'LOT'
              ? (
                <div style={{display: 'inline-block'}}>
                  <input onChange={this._onChange} onFocus={this.setDefaultIncurredFcosts}
                    step='0.01' className='form-control' type='number'
                    name={'pcList[' + this.props.index + '].incurredFcosts'} value={this.props.value || ''} />
                  <div style={{display: 'inline-block'}}>
                    {
                      valid1.validType !== 0
                      ? (<label className={valid1.validType === 1 ? 'warning' : 'error'}>{valid1.validMsg}</label>)
                      : (<label />)
                    }
                  </div>
                </div>
              ) : (<span className='form-control-static'>{this.incurredFcostsSum()}</span>)
            }
          </div>
        </div>
        <div className='col-md-1 col-sm-12'>
          <a onClick={this._onToggle} className={remarkClasses}>备注</a>
          <input type='hidden' name={'pcList[' + this.props.index + '].poItem'} value={this.props.poItem} />
        </div>
        <Collapse in={this.props.expand}>
          <div className='form-group col-md-12 col-sm-12' >
            <div className='row remark-container'>
              <div className='col-lg-10'>
                <input className='form-control incurredRemark valid' type='text' onChange={this._onRemark}
                  value={this.props.remark} name={'pcList[' + this.props.index + '].remark'} />
              </div>
              <div className='col-lg-2'>
                <p className={(vaild2.validType === 0 ? ' ' : 'error ') + 'form-control-static'}>限100个字符</p>
              </div>
            </div>
          </div>
        </Collapse>
      </td>
    )
  }
}

PcListItem.defaultProps = {
  onChange: function (value) {
    console.log(value)
  }
}

export default PcListItem
