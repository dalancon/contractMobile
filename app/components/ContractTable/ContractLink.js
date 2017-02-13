import React from 'react'
import { Link, withRouter } from 'react-router'

class ContractLink extends React.Component {
  static propTypes = {
    poNo: React.PropTypes.string,
    id: React.PropTypes.string,
    code: React.PropTypes.string
  }

  // 渲染页面函数
  render () {
    return (<Link to={'/contract/details?poNo=' + this.props.poNo + '&id=' +
      this.props.id + '&code=' + this.props.code}>{ this.props.poNo }</Link>)
  }
}

export default withRouter(ContractLink)
