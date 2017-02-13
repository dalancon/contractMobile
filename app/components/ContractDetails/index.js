import React from 'react';
import formatter from 'utils/formatter';

// 合同详细信息
class ContractDetails extends React.Component {
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
    }))
  }

  render () {
    return (
      <table className='table table-striped table-no-bordered table-hover' style={{maxHeight: '500px'}}>
        <thead>
          <tr>
            <th>BOQ</th>
            <th>报价单描述</th>
            <th>单位编码描述</th>
            <th>币种</th>
            <th style={{textAlign: 'right'}}>合同数量</th>
            <th style={{textAlign: 'right'}}>合同单价</th>
            <th style={{textAlign: 'right'}}>合同金额</th>
            <th style={{textAlign: 'right'}}>已支付数量</th>
            <th style={{textAlign: 'right'}}>已支付金额</th>
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
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}

export default ContractDetails;
