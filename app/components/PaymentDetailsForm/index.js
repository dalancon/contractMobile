import React from 'react'
import PcListItem from './PcListItem'
import formatter from 'utils/formatter.js'
import './style.scss'

/** 申请和修改页面中用到的支付单明细的信息表单*/
class PaymentDetailsForm extends React.Component {
  static propTypes = {
    pcList: React.PropTypes.arrayOf(React.PropTypes.shape({
      poItem: React.PropTypes.string.isRequired,
      incurredFcostsTotal: React.PropTypes.number.isRequired,
      ptdCommitmentQty: React.PropTypes.number.isRequired,
      description: React.PropTypes.string,
      unitDescription: React.PropTypes.string,
      incurredPrice: React.PropTypes.number,
      incurredQtyTotal: React.PropTypes.number,
      unitOfMeasure: React.PropTypes.string,
      ptdCommitmentFrate: React.PropTypes.number,
      currency: React.PropTypes.string
    })),
    validStatus: React.PropTypes.bool.isRequired,
    type: React.PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      searchText: '',
      type: '',
      value: [],
      remark: [],
      expand: []
    }
  }

  componentDidMount () {
    $(this.refs.typeSwitcher).bootstrapSwitch({
      size: 'small',
      onText: '全部',
      offText: '已填',
      offColor: 'primary'
    }).on('switchChange.bootstrapSwitch', function (event, state) {
      if (state === false) {
        this.setState({
          type: 'filled'
        })
      } else {
        this.setState({
          type: 'all'
        })
      }
    }.bind(this))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pcList !== nextProps.pcList) {
      var value = nextProps.pcList.map(function (x) {
        if (x.unitOfMeasure === 'LOT') {
          return (x.incurredFcosts ? x.incurredFcosts : null)
        } else {
          return (x.incurredQty ? x.incurredQty : null)
        }
      })

      var remark = nextProps.pcList.map(function (x) {
        return x.remark ? x.remark : undefined
      })

      this.setState({
        searchText: '',
        value: value,
        remark: remark,
        expand: []
      })
    }

    if (this.state.type !== nextProps.type) {
      this.setState({
        type: nextProps.type
      })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.validStatus === true) {
      if (!this.isValidate()) {
        this.refs.errorMsg.scrollIntoView(false)
        return
      }
    }

    $(this.refs.typeSwitcher).bootstrapSwitch('state', this.state.type === 'all')
  }

  // 根据状态searchText和type来过滤pcList
  filterPcList () {
    var value = this.state.value
    var expand = this.state.expand
    var remark = this.state.remark
    var result = Object.assign([], this.props.pcList)

    result.forEach(function (x, i) {
      x.index = i
      x.value = value[i]
      x.remark = remark[i]
      x.expand = expand[i]
    })

    if (this.state.type === 'filled') {
      result = result.filter((x, i) => {
        if (value[i] && value[i] !== 0) {
          return true
        } else {
          return false
        }
      })
    }

    let text = $.trim(this.state.searchText).toLowerCase()
    if (text) {
      result = result.filter((x, i) => {
        if (x.poItem.toLowerCase().search(text) !== -1 || x.description.toLowerCase().search(text) !== -1) {
          return true
        } else {
          return false
        }
      })
    }

    // 将pcList翻倍
    var temp = Object.assign([], result)
    temp.forEach(function (x, i, a) { result.splice(2 * i, 0, x) })

    return result
  }

  isValidate () {
    var validate = this.state.value.some(function (x) { return (x != null && x !== '') })
    return validate
  }

  errorMsg () {
    if (this.props.validStatus === true) {
      if (!this.isValidate()) {
        return '至少需要填写一条支付细项！'
      }
    }
  }

  setSearchText = (e) => {
    this.setState({searchText: e.target.value})
  }

  setPcList = (value, index) => {
    let pcList = this.state.value
    pcList[index] = Number(value)
    this.setState({
      value: pcList
    })
  }

  setRemark = (value, index) => {
    var remark = this.state.remark
    remark[index] = value
    this.setState({
      remark: remark
    })
  }

  setToggle = (value, index) => {
    var expand = this.state.expand
    expand[index] = value
    this.setState({
      expand: expand
    })
  }

  // 计算支付总金额
  paymentCostSum () {
    let sum = 0
    var pcList = this.props.pcList
    this.state.value.forEach(function (x, index) {
      if (pcList[index].unitOfMeasure === 'LOT') {
        sum += parseFloat(x || 0)
      } else {
        sum += parseFloat(x || 0) * pcList[index].ptdCommitmentFrate
      }
    })
    return formatter.formatMoney(sum)
  }

  // 计算合同总金额
  contractSum () {
    let sum = 0
    this.props.pcList.forEach(function (x) {
      sum += x.incurredPrice
    })

    return formatter.formatMoney(sum)
  }

  // 计算合同累计支付
  contractIncurredSum () {
    let sum = 0
    this.props.pcList.forEach(function (x) {
      sum += x.incurredFcostsTotal
    })
    return formatter.formatMoney(sum)
  }

  // 计算合同完成比
  contractIncurredPrecent () {
    let sum1 = 0
    this.props.pcList.forEach(function (x) {
      sum1 += x.incurredFcostsTotal
    })
    if (sum1 !== 0) {
      let sum2 = 0
      this.props.pcList.forEach(function (x) {
        sum2 += x.incurredPrice
      })
      return formatter.formatPercent(sum1 / sum2)
    } else {
      return formatter.formatPercent(0)
    }
  }

  render () {
    var b = this.filterPcList()
    return (
      <div className='payment-detail-from'>
        <div>
          <input style={{marginLeft: '20px', marginRight: '20px', width: '200px', display: 'inline-block'}}
            className='form-control' placeholder='BOQ/报价单描述'
            value={this.state.searchText} onChange={this.setSearchText} />
          <input ref='typeSwitcher' type='checkbox' />
          <label ref='errorMsg' className='error' style={{marginLeft: '100px'}}>{this.errorMsg()}</label>
        </div>
        <div className='table-responsive' style={{maxHeight: '400px'}}>
          <table className='table table-hover table-no-bordered' style={{overflowY: 'auto'}}>
            <thead>
              <tr>
                <th style={{textAlign: 'center'}}>BOQ</th>
                <th style={{textAlign: 'center'}}>报价单描述</th>
                <th style={{textAlign: 'center'}}>报价单编码/描述</th>
                <th style={{textAlign: 'center'}}>币种</th>
                <th style={{textAlign: 'right'}}>合同数量</th>
                <th style={{textAlign: 'right'}}>合同单价</th>
                <th style={{textAlign: 'right'}}>合同金额</th>
                <th style={{textAlign: 'right'}}>已支付数量</th>
                <th style={{textAlign: 'right'}}>已支付金额</th>
              </tr>
            </thead>
            <tbody>
              {
                b.map((x, index) => {
                  if (index % 2 === 0) {
                    return (
                      <tr key={index}>
                        <td style={{textAlign: 'center'}}>{x.poItem}</td>
                        <td style={{textAlign: 'center'}}>{x.description}</td>
                        <td style={{textAlign: 'center'}}>{x.unitOfMeasure + '/' + x.unitDescription}</td>
                        <td style={{textAlign: 'center'}}>{x.currency}</td>
                        <td style={{textAlign: 'right'}}>{x.ptdCommitmentQty}</td>
                        <td style={{textAlign: 'right'}}>{formatter.formatMoney(x.ptdCommitmentFrate)}</td>
                        <td style={{textAlign: 'right'}}>{formatter.formatMoney(x.incurredPrice)}</td>
                        <td style={{textAlign: 'right'}}>{x.incurredQtyTotal}</td>
                        <td style={{textAlign: 'right'}}>{formatter.formatMoney(x.incurredFcostsTotal)}</td>
                      </tr>)
                  } else {
                    return (
                      <tr key={index}>
                        <PcListItem {...x} index={x.index} onChange={this.setPcList}
                          onRemark={this.setRemark} onToggle={this.setToggle} />
                      </tr>
                    )
                  }
                })
              }
            </tbody>
          </table>
        </div>
        <div className='payment-table-footer container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <label>支付总金额：</label><span className='invoice-costs'>{this.paymentCostSum()}</span>
            </div>
            <div className='col-md-3'>
              <label>合同总金额：</label><span>{this.contractSum()}</span>
            </div>
            <div className='col-md-3'>
              <label>合同累计支付：</label><span>{this.contractIncurredSum()}</span>
            </div>
            <div className='col-md-3'>
              <label>合同完成百分比：</label><span>{this.contractIncurredPrecent()}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

PaymentDetailsForm.defaultProps = {
  pcList: []
}

export default PaymentDetailsForm
