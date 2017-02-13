import React from 'react'

/** FileListItem */
class FileListItem extends React.Component {
  // 上一级传如果属性
  static propTypes = {
    file: React.PropTypes.shape({
      fileProgCode: React.PropTypes.string,
      fileKey: React.PropTypes.string,
      fileShowSize: React.PropTypes.string,
      fileShowName: React.PropTypes.string,
      uploadDate: React.PropTypes.number,
      commonName: React.PropTypes.string,
      remarkText: React.PropTypes.string
    }),
    onItemClick: React.PropTypes.func
  }

  // 自定义方法
  onClick = () => {
    this.props.onItemClick(this.props.file)
  }

  // 渲染页面函数
  render () {
    return (
      <a onClick={this.onClick}>{this.props.file.fileShowName}</a>
    )
  }
}

export default FileListItem
