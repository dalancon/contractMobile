import React from 'react'
import { Link } from 'react-router'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import './style.scss'

/** 提交支付单中的支付单基本信息的表单*/
class PaymentBasicInfoForm extends React.Component {
  static propTypes = {
    payment: React.PropTypes.shape({
      project: React.PropTypes.string,
      projectDesc: React.PropTypes.string,
      poNo: React.PropTypes.string,
      description: React.PropTypes.string,
      nextInvoiceNo: React.PropTypes.string
    }),
    vendors: React.PropTypes.arrayOf(React.PropTypes.shape({
      company: React.PropTypes.string,
      description: React.PropTypes.string
    })),
    system: React.PropTypes.shape({
      id: React.PropTypes.string,
      code: React.PropTypes.string
    }),
    validStatus: React.PropTypes.bool.isRequired,
    companyChange: React.PropTypes.func
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      invoiceNo: '',
      apRef: '',
      poNo: '',
      company: '',
      dateRcvd: new Date(),
      isInvoiceNoDuplicate: false
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.validStatus === true) {
      if (!this.vaildInvoiceNo()) {
        this.refs.invoiceNo.focus()
        return
      }
      if (!this.vaildApRef()) {
        this.refs.apRef.focus()
        return
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.company === '' && nextProps.vendors[0] && nextProps.vendors[0].company) {
      this.setState({
        company: nextProps.vendors[0].company
      })
    }

    if (this.state.invoiceNo === '' && nextProps && nextProps.payment.nextInvoiceNo) {
      this.setState({
        invoiceNo: nextProps.payment.nextInvoiceNo
      })
    }

    if (nextProps.payment.poNo) {
      this.setState({
        poNo: nextProps.payment.poNo
      })
    }
  }

  componentDidMount () {
    $(this.refs.date).datepicker({
      language: 'zh-CN',
      todayHighlight: true,
      autoclose: true,
      endDate: '0d'
    }).on('changeDate', function (e) {
      // console.log(new Date().toDateString())
      // $('[name=dateRcvd]').val($(this.refs.date).datepicker('getUTCDate'))
      this.setState({
        dateRcvd: $(this.refs.date).datepicker('getUTCDate')
      })
    }.bind(this))

    $(this.refs.date).datepicker('setDate', new Date().toDateString())
  }

  isValidate () {
    return (this.vaildInvoiceNo() && this.vaildApRef())
  }

  apRefErrorMsg () {
    if (this.props.validStatus === true) {
      if (!this.vaildApRef()) {
        return '支付单说明必填'
      }
    }
  }

  invoiceNoErrorMsg () {
    if (this.props.validStatus === true) {
      if (this.state.invoiceNo === '') {
        return '支付单号必填'
      }

      if (this.state.isInvoiceNoDuplicate === true) {
        return '支付单号重复'
      }
    }
  }

  setInvoiceNo = (e) => {
    this.setState({invoiceNo: e.target.value})
    this.fetchIsInvoiceNoDuplicate(e.target.value)
  }

  // 验证支付单号
  vaildInvoiceNo () {
    if (this.state.invoiceNo === '' || this.state.isInvoiceNoDuplicate === true) {
      return false
    } else {
      return true
    }
  }

  fetchIsInvoiceNoDuplicate (invoiceNo) {
    this.serverRequest = $.post('/qdp/qdp/payment/payment/checkInvoiceNo',
      {systemCode: this.props.system.code, poNo: this.props.payment.poNo, invoiceNo: invoiceNo}, function (result) {
        this.setState({
          'isInvoiceNoDuplicate': !result
        })
      }.bind(this))
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

  onSelectCompany = (val) => {
    if (this.state.company !== val.value) {
      this.setState({company: val.value})
      this.props.companyChange(val)
    }
  }

  render () {
    var options = this.props.vendors ? this.props.vendors.map((x) => {
      return {value: x.company, label: x.description}
    }) : []

    return (
      <div className='form-horizontal payment-basic-info-form'>
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
                ? (<Link to={'/contract/details?poNo='+this.props.payment.poNo+'&id='+this.props.system.id+
                  '&code='+ this.props.system.code}>{this.props.payment.poNo}</Link>) : '-'}
            </p>
            <input type='hidden' name='poNo' value={this.state.poNo} />
          </div>
          <label className='control-label col-md-2'>合同名称：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment.description}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>承包单位：</label>
          <div className='col-md-4'>
            <div style={{width: '200px'}}>
              <Select name='company' options={options} value={this.state.company}
                onChange={this.onSelectCompany} />
            </div>
           {/* <select ref='selectpicker' className='selectpicker' name='company' >
                           {
                             this.props.vendors.map(function (vendor, index){
                               return (<option key={index} defaultValue={vendor.company}
                                 data-subtext={vendor.company}>{vendor.description}</option>)
                             })
                           }
                         </select>*/}
          </div>
          <label className='control-label col-md-2'>支付单号：</label>
          <div className='col-md-4'>
            <input ref='invoiceNo' className='form-control' type='text' name='invoiceNo'
              onChange={this.setInvoiceNo} value={this.state.invoiceNo} style={{width: '200px'}} />
            <label className='error' style={{verticalAlign: 'top'}}>{this.invoiceNoErrorMsg()}</label>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>接收日期：</label>
          <div className='col-md-4'>
            <input ref='date' className='form-control' style={{width: '200px'}} />
            <input type='hidden' name='dateRcvd' value={new Date(this.state.dateRcvd)} />
          </div>
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

PaymentBasicInfoForm.defaultProps = {
  companyChange: function () {}
}

export default PaymentBasicInfoForm
