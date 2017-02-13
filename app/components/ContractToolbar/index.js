import React from 'react'
import './style.scss'

// 合同详细页面顶部操作合同的工具条
class ContractToolbar extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    children: React.PropTypes.element
  }

  render () {
    return (
      <div className='btn-toolbar shortcut-nav' role='toolbar' aria-label=''>
        <span className='shortcut-label'>{this.props.title}:</span>
        <div className='btn-group' role='group' aria-label='...'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

ContractToolbar.defaultProps = {
  title: '相关操作'
}

export default ContractToolbar
