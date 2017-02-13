import React from 'react'
import { Collapse } from 'react-bootstrap'
import { Link } from 'react-router'
import FileListItem from 'components/FileListItem'
import './style.scss'

/** 新版审批合同表单*/
class PaymentReadOnlyForm extends React.Component {
  static propTypes = {
    invoice: React.PropTypes.shape({
      poNo: React.PropTypes.string,
      invoiceNo: React.PropTypes.string,
      bankAccountAddress: React.PropTypes.string
    }),

    system: React.PropTypes.shape({
      id: React.PropTypes.string,
      code: React.PropTypes.string
    }),

    opinions: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        activityName: React.PropTypes.string,
        taskOpinionItemList: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            opinion: React.PropTypes.string,
            processtime: React.PropTypes.string,
            name: React.PropTypes.string
          })
        )
      })
    ),

    file: React.PropTypes.arrayOf(React.PropTypes.shape({
      fileProgCode: React.PropTypes.string,
      fileKey: React.PropTypes.string,
      fileShowSize: React.PropTypes.string,
      fileShowName: React.PropTypes.string,
      uploadDate: React.PropTypes.num,
      commonName: React.PropTypes.string,
      remarkText: React.PropTypes.string
    })),

    onClickFileTitle: React.PropTypes.func
  }

  constructor (...args) {
    super(...args)
    this.state = {
      open: false
    }
  }

  toggleDetails () {
    $(this.refs.table).find('tr.collapse').toggleClass('collapsing collapse')
    setTimeout(function () {
      $(this.refs.table).find('tr.collapsing').toggleClass('collapsing in collapse')
    }.bind(this), 350)
  }

  openDetails = () => {
    this.setState({ open: !this.state.open })
  }

  render () {
    var component = this
    return (
      <div className='payment-readonly-form'>
        <h3 style={{textAlign: 'center'}}>中国长江三峡集团公司合同支付申请单</h3>
        <table ref='table' className='table table-bordered'>
          <thead>
            <tr>
              <th colSpan='10'>工程名称：{this.props.invoice.projectDesc}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>合同代码</td>
              <td><Link to={'/contract/details?poNo=' + this.props.invoice.poNo + '&id=' + this.props.system.id +
                '&code=' + this.props.system.code} >{this.props.invoice.poNo}</Link></td>
              <td>支付单号</td>
              <td>{this.props.invoice.invoiceNo}</td>
              <td>接收日期</td>
              <td>{this.props.invoice.invoiceDate}</td>
              <td>币种</td>
              <td>{this.props.invoice.bz}</td>
              <td>单位</td>
              <td>{this.props.invoice.dw}</td>
            </tr>
            <tr>
              <td>合同原编号</td>
              <td colSpan='3'>{this.props.invoice.oriPoNo}</td>
              <td>合同名称</td>
              <td colSpan='5'>{this.props.invoice.poName}</td>
            </tr>
            <tr>
              <td>合同原始总金额</td>
              <td colSpan='2'>{this.props.invoice.oriTotalAmt}</td>
              <td>合同当前总金额</td>
              <td>{this.props.invoice.totalAmt}</td>
              <td>本次申请拨款金额</td>
              <td>{this.props.invoice.bcsqbkje}</td>
              <td>累计发生金额</td>
              <td colSpan='2'>{this.props.invoice.ljfsje}</td>
            </tr>
            <tr>
              <td>本次申请支付内容</td>
              <td colSpan='4'>{this.props.invoice.bcsqzfnr}</td>
              <td>本次申请支付依据</td>
              <td colSpan='4'>{this.props.invoice.bcsqzfyj}</td>
            </tr>
            <tr>
              <td>收款单位名称</td>
              <td colSpan='4'>{this.props.invoice.bankAccountName}</td>
              <td>收款单位地址和邮编</td>
              <td colSpan='4'>{this.props.invoice.bankAccountAddress}</td>
            </tr>
            <tr>
              <td>收款单位开户行</td>
              <td colSpan='4'>{this.props.invoice.bankName}</td>
              <td>收款单位账号</td>
              <td colSpan='4'>{this.props.invoice.bankAccountNo}</td>
            </tr>
            <tr>
              <td>备注</td>
              <td colSpan='9'>{this.props.invoice.remark}</td>
            </tr>
            <tr>
              <td>附件</td>
              <td colSpan='9'>
                <ul>
                  {
                    this.props.file.map(function (x, i) {
                      return (
                        <li key={i}>
                          <FileListItem file={x} style={{color: 'black', textDecoration: 'underline'}}
                            onItemClick={component.props.onClickFileTitle} />
                          <a style={{paddingLeft: '5px'}} className='glyphicon glyphicon-download-alt' />
                        </li>
                      )
                    })
                  }
                </ul>
              </td>
            </tr>
            <tr>
              <td colSpan='10'>
                <a onClick={this.openDetails}>
                  展开扣款明细
                  <span className='caret' />
                </a>
                <Collapse in={this.state.open}>
                  <div>
                    <table className='table table-bordered'>
                      <tbody>
                        <tr>
                          <td colSpan='6' style={{textAlign: 'center'}}>本次结算扣款情况</td>
                          <td colSpan='2' rowSpan='2' style={{textAlign: 'center'}}>本次结算实际支付</td>
                          <td colSpan='2' rowSpan='2' style={{textAlign: 'center'}}>本次结算后预付款</td>
                        </tr>
                        <tr>
                          <td>扣款合计</td>
                          <td>预付工程款</td>
                          <td>保留金</td>
                          <td>材料款</td>
                          <td>代扣税金</td>
                          <td>其他扣款</td>
                        </tr>
                        <tr>
                          <td>{this.props.invoice.kkhj}</td>
                          <td>{this.props.invoice.yfgck}</td>
                          <td>{this.props.invoice.blj}</td>
                          <td>{this.props.invoice.clk}</td>
                          <td>{this.props.invoice.dksj}</td>
                          <td>{this.props.invoice.qtkk}</td>
                          <td colSpan='2'>{this.props.invoice.bcjssjzf}</td>
                          <td colSpan='2'>{this.props.invoice.bcjshyfk}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Collapse>
              </td>
            </tr>
            {
              this.props.opinions.map((op, index) =>
                (<tr key={index}>
                  <td colSpan={2}>{op.activityName}</td>
                  <td colSpan={8}>
                    <ul className='opinion-ul'>
                      {
                        op.taskOpinionItemList.map((item, i) =>
                          (<li key={i}>
                            <div>{item.opinion ? (<span>{item.opinion}</span>) : (<span>——</span>)}</div>
                            <small>{item.processtime} by {item.name}</small>
                          </li>))
                      }
                    </ul>
                  </td>
                </tr>))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default PaymentReadOnlyForm
