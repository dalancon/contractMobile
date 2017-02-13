import React from 'react'
import formatter from 'utils/formatter.js'
import { Link } from 'react-router'

/** 合同支付历史列表*/

class ContractPaidHistory extends React.Component {
  static propTypes = {
    paidHistory: React.PropTypes.arrayOf(React.PropTypes.shape({
      businessId: React.PropTypes.string,
      invoiceNo: React.PropTypes.string,
      ownerApprovalDate: React.PropTypes.number,
      owner: React.PropTypes.string,
      sumIncurredCosts: React.PropTypes.number,
      sumPoCosts: React.PropTypes.number,
      sumPoCostsPercent: React.PropTypes.number
    })),
    showCompleteRatio: React.PropTypes.bool.isRequired
  }

  render () {
    return (
      <div className='table-responsive table-responsive-fixedcol'>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th>支付单号</th>
              <th>支付时间</th>
              <th>申请人</th>
              <th style={{textAlign: 'right'}}>支付金额</th>
              <th style={{textAlign: 'right'}}>合同累计支付</th>
              <th className={this.props.showCompleteRatio ? 'hidden' : ''} style={{textAlign: 'right'}}>
                合同完成百分比
              </th>
            </tr>
          </thead>
          <tbody>
              {
                this.props.paidHistory.map((x, i) => (
                  <tr key={i}>
                    <td><Link to={'/payment2/paymentDetails?businessId=' + x.businessId}>{x.invoiceNo}</Link></td>
                    <td>{formatter.formatDate(x.ownerApprovalDate)}</td>
                    <td>{x.owner}</td>
                    <td style={{textAlign: 'right'}}>{formatter.formatMoney(x.sumIncurredCosts)}</td>
                    <td style={{textAlign: 'right'}}>{formatter.formatMoney(x.sumPoCosts)}</td>
                    <td className={this.props.showCompleteRatio ? 'hidden' : ''} style={{textAlign: 'right'}}>
                      {formatter.formatPercent(x.sumPoCostsPercent)}
                    </td>
                  </tr>
                ))
              }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ContractPaidHistory
