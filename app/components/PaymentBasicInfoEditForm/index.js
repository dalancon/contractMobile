import React from 'react'
import { Link } from 'react-router'
import './style.scss'
/** 提交支付单中的支付单基本信息的表单*/

class PaymentBasicInfoEditForm extends React.Component {
  static propTypes = {
    payment: React.PropTypes.shape({
      project: React.PropTypes.string,
      projectDesc: React.PropTypes.string,
      poNo: React.PropTypes.string,
      poDesc: React.PropTypes.string,
      company: React.PropTypes.string,
      companyDesc: React.PropTypes.string,
      dateRcvd: React.PropTypes.number,
      invoiceNo: React.PropTypes.string,
      apRef: React.PropTypes.string
    }),
    system: React.PropTypes.shape({
      id: React.PropTypes.string,
      code: React.PropTypes.string
    }),
    validStatus: React.PropTypes.bool.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      invoiceNo: '',
      apRef: '',
      poNo: '',
      company: '',
      dateRcvd: new Date().toUTCString(),
      isInvoiceNoDuplicate: false
    }
  }

  componentDidMount () {
    // console.log('componentDidMount')
    $(this.refs.date).datepicker({
      language: 'zh-CN',
      todayHighlight: true,
      autoclose: true,
      endDate: '0d'
    }).on('changeDate', function (e) {
      this.setState({
        dateRcvd: $(this.refs.date).datepicker('getUTCDate')
      })
      // $('[name=dateRcvd]').val($(this.refs.date).datepicker('getUTCDate'))
    }.bind(this))
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.validStatus === true) {
      if (!this.vaildApRef()) {
        this.refs.apRef.focus()
        return
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log(nextProps.payment.invoiceNo)
    if (nextProps.payment.invoiceNo && this.state.invoiceNo !== nextProps.payment.invoiceNo) {
      // console.log(nextProps.payment.dateRcvd)
      this.setState({
        poNo: nextProps.payment.poNo,
        invoiceNo: nextProps.payment.invoiceNo,
        dateRcvd: nextProps.payment.dateRcvd,
        apRef: nextProps.payment.apRef
      })
      // console.log(new Date(nextProps.payment.dateRcvd).toDateString())
      $(this.refs.date).datepicker('setDate', new Date(nextProps.payment.dateRcvd))
    }
  }

  isValidate () {
    return (this.vaildApRef())
  }

  apRefErrorMsg () {
    if (this.props.validStatus === true) {
      if (!this.vaildApRef()) {
        return '支付单说明必填'
      }
    }
  }

  // 验证备注信息
  vaildApRef () {
    if (this.state.apRef === '') {
      return false
    } else {
      return true
    }
  }

  setApRef = (e) => {
    this.setState({apRef: e.target.value})
  }

  render () {
    return (
      <div className='form-horizontal payment-basic-info-edit-form'>
        <div className='form-group'>
          <label className='control-label col-md-2'>工程：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment.project}
            </p>
          </div>
          <label className='control-label col-md-2'>工程描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment.projectDesc}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>合同代码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {(this.props.payment && this.props.payment.poNo)
               ? (<Link to={'/contract/details?poNo=' + this.props.payment.poNo + '&id=' + this.props.system.id +
                  '&code=' + this.props.system.code}>{this.props.payment.poNo}</Link>) : '-'}
            </p>
            <input type='hidden' name='poNo' value={this.state.poNo} />
          </div>
          <label className='control-label col-md-2'>合同名称：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment.poDesc}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>承包单位编码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.company ? this.props.payment.company : '-'}
            </p>
            <input type='hidden' name='company' value={this.props.payment.company} />
          </div>
          <label className='control-label col-md-2'>承包单位描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.companyDesc ? this.props.payment.companyDesc : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>接收日期：</label>
          <div className='col-md-4'>
            <input ref='date' className='form-control' style={{width: '200px'}} />
            <input type='hidden' name='dateRcvd' value={new Date(this.state.dateRcvd)} />
          </div>
          <label className='control-label col-md-2'>支付单号：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.invoiceNo ? this.props.payment.invoiceNo : '-'}
            </p>
            <input type='hidden' name='invoiceNo' value={this.props.payment.invoiceNo} />
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>支付说明：</label>
          <div className='col-md-4'>
            <textarea ref='apRef' className='form-control' rows='2' name='apRef' style={{width: '200px'}}
              onChange={this.setApRef} value={this.state.apRef} />
            <label className='error' style={{verticalAlign: 'top'}}>{this.apRefErrorMsg()}</label>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentBasicInfoEditForm
