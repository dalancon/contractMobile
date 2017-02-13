import React from 'react'
import formatter from 'utils/formatter.js'
import './style.scss'

/** 支付单明细的信息*/
class PaymentDetails extends React.Component {
  static propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      poItem: React.PropTypes.string,
      description: React.PropTypes.string,
      unitOfMeasure: React.PropTypes.string,
      unitDescription: React.PropTypes.string,
      currency: React.PropTypes.string,
      ptdCommitmentQty: React.PropTypes.number,
      ptdCommitmentFrate: React.PropTypes.number,
      incurredQtyTotal: React.PropTypes.number,
      incurredFcostsTotal: React.PropTypes.number,
      incurredQty: React.PropTypes.number,
      incurredFcosts: React.PropTypes.number,
      remark: React.PropTypes.string
    }))
  }

  render () {
    return (
      <div>
        <div className='table-responsive'>
          <table className='table table-hover table-no-bordered table-striped'
            style={{maxHeight: '490px', overflowY: 'auto'}}>
            <thead>
              <tr>
                <th>BOQ</th>
                <th>报价单描述</th>
                <th>报价单编码/描述</th>
                <th>币种</th>
                <th style={{textAlign: 'right'}}>合同数量</th>
                <th style={{textAlign: 'right'}}>合同单价</th>
                <th style={{textAlign: 'right'}}>合同金额</th>
                <th style={{textAlign: 'right'}}>已支付数量</th>
                <th style={{textAlign: 'right'}}>已支付金额</th>
                <th>本次支付数量</th>
                <th>本次支付金额</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.items.map((x, i) => (
                  <tr key={i}>
                    <td>{x.poItem}</td>
                    <td>{x.description}</td>
                    <td>{x.unitOfMeasure}/{x.unitDescription}</td>
                    <td style={{textAlign: 'right'}}>{x.currency}</td>
                    <td style={{textAlign: 'right'}}>{x.ptdCommitmentQty}</td>
                    <td style={{textAlign: 'right'}}>{x.ptdCommitmentFrate}</td>
                    <td style={{textAlign: 'right'}}>
                      {formatter.formatMoney(x.ptdCommitmentFrate * x.ptdCommitmentQty)}
                    </td>
                    <td style={{textAlign: 'right'}}>{x.incurredQtyTotal}</td>
                    <td style={{textAlign: 'right'}}>{formatter.formatMoney(x.incurredFcostsTotal)}</td>
                    <td style={{textAlign: 'right'}}>{x.incurredQty}</td>
                    <td style={{textAlign: 'right'}}>{formatter.formatMoney(x.incurredFcosts)}</td>
                    <td>{x.remark ? x.remark : '-'}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {/* <div className='payment-table-footer container-fluid'>
        //   <div className='row'>
        //     <div className='col-md-3'>
        //       <label>支付总金额：</label><span className='invoice-costs'>22</span>
        //     </div>
        //     <div className='col-md-3'>
        //       <label>合同总金额：</label><span>100.00</span>
        //     </div>
        //     <div className='col-md-3'>
        //       <label>合同累计支付：</label><span>101.00</span>
        //     </div>
        //     <div className='col-md-3'>
        //       <label>合同完成百分比：</label><span>101.00%</span>
        //     </div>
        //   </div>
        </div> */}
      </div>
    )
  }
}

export default PaymentDetails
