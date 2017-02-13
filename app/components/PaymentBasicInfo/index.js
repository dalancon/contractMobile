import React from 'react'
import { Link } from 'react-router'
import formatter from 'utils/formatter.js'

/** 支付单基本信息*/

class PaymentBasicInfo extends React.Component {
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
    })
  }

  render () {
    return (
      <div className='form-horizontal'>
        <div className='form-group'>
          <label className='control-label col-md-2'>工程：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.project ? this.props.payment.project : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>工程描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.projectDesc ? this.props.payment.projectDesc : '-'}
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
          </div>
          <label className='control-label col-md-2'>合同名称：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.poDesc ? this.props.payment.poDesc : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>承包单位编码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.company ? this.props.payment.company : '-'}
            </p>
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
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.dateRcvd
                ? formatter.formatDate(this.props.payment.dateRcvd) : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>支付单号：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.invoiceNo ? this.props.payment.invoiceNo : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>支付说明：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.payment && this.props.payment.apRef ? this.props.payment.apRef : '-'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default PaymentBasicInfo
