import React from 'react'
import formatter from 'utils/formatter.js'

class GuaranteeBasicInfo extends React.Component {

  static propTypes = {
    guarantee: React.PropTypes.shape({
      project: React.PropTypes.string,
      projectDesc: React.PropTypes.string,
      poNo: React.PropTypes.string,
      poDesc: React.PropTypes.string,
      originalCode: React.PropTypes.string,
      poAmount: React.PropTypes.number,
      paidAmount: React.PropTypes.number,
      hasFinalPaid: React.PropTypes.bool,
      division: React.PropTypes.string,
      divisionDesc: React.PropTypes.string,
      supervision: React.PropTypes.string,
      supervisionDesc: React.PropTypes.string,
      company: React.PropTypes.string,
      comDesc: React.PropTypes.string
    })
  }

  render () {
    return (
      <div className='form-horizontal'>
        <div className='form-group'>
          <label className='control-label col-md-2'>工程：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.project ? this.props.guarantee.project : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>工程描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.projectDesc ? this.props.guarantee.projectDesc : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>合同代码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.poNo ? this.props.guarantee.poNo : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>合同名称：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.poDesc ? this.props.guarantee.poDesc : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>合同原编号：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.originalCode ? this.props.guarantee.originalCode : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>合同金额：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.poAmount
                ? formatter.formatMoney(this.props.guarantee.poAmount) : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>最终支付金额：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.paidAmount
                ? formatter.formatMoney(this.props.guarantee.paidAmount) : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>是否支付尾款：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.hasFinalPaid ? '是' : '否'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>责任单位编码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.division ? this.props.guarantee.division : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>责任单位描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.divisionDesc ? this.props.guarantee.divisionDesc : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>监理单位编码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.supervision ? this.props.guarantee.supervision : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>监理单位描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.supervisionDesc
                ? this.props.guarantee.supervisionDesc : '-'}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>承包单位编码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.company ? this.props.guarantee.company : '-'}
            </p>
          </div>
          <label className='control-label col-md-2'>承包单位描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
              {this.props.guarantee && this.props.guarantee.comDesc ? this.props.guarantee.comDesc : '-'}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default GuaranteeBasicInfo
