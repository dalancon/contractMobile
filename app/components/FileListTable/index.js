import React from 'react'
import formatter from 'utils/formatter.js'
import FilePreview from 'components/FilePreview'
import FileListItem from 'components/FileListItem'
import './style.scss'

/** 文件上传列表*/
class FileListTable extends React.Component {
  static propTypes = {
    onClickTitle: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    files: React.PropTypes.arrayOf(React.PropTypes.shape({
      fileProgCode: React.PropTypes.string,
      fileKey: React.PropTypes.string,
      fileShowSize: React.PropTypes.string,
      fileShowName: React.PropTypes.string,
      uploadDate: React.PropTypes.number,
      commonName: React.PropTypes.string,
      remarkText: React.PropTypes.string
    })),
    loaded: React.PropTypes.bool,     // 文件在加载过程中
    deletable: React.PropTypes.bool,    // 是否允许文件可以被删除
    downloadable: React.PropTypes.bool    // 是否允许文件可以被下载
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      showPreview: false,
      previewFileInfo: {},
      files: []
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState(nextProps)
  }

  downloadFile (file) {
    var form = $('<form class="hide" method="POST" action="/qdp/qdp/payment/file/download">' +
      '<input type="hidden" name="fileShowName" value=' + file.fileShowName + ' />' +
      '<input type="hidden" name="filePath" value=' + file.remarkText + ' /></form>')
    $('body').append(form)
    form.submit()
    form.remove()
  }

  deleteFile (file) {
    var component = this
    swal({
      title: '你确定吗？',
      text: '确定删除该文件',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonColor: '#428bca',
      confirmButtonText: '确认',
      closeOnConfirm: true},
        function () {
          $.post('/qdp/qdp/payment/file/delete', {
            filePath: file.remarkText,
            fileKey: file.fileKey,
            seqNo: file.seqNo,
            fileProgCode: file.fileProgCode
          }, function (data) {
            component.setState({
              files: data
            })
            component.props.onDelete(file, data)
          })
        }
    )
  }

  showPreviewFile = (file) => {
    this.setState({
      previewFileInfo: file,
      showPreview: true
    })
  }

  hidePreview = () => {
    this.setState({showPreview: false})
  }

  showFileList () {
    var component = this
    var formatDate = formatter.formatDate
    if (component.props.downloadable || component.props.deletable) {
      return (
        <table className='table uploaded-files'>
          <thead>
            <tr>
              <th style={{minWidth: 10 + 'em', width: '40%'}}>文件名称</th>
              <th style={{width: '10%'}}>文件大小</th>
              <th style={{width: '10%'}}>上传人</th>
              <th style={{width: '20%'}}>上传日期</th>
              <th style={{width: '20%'}} className='uploaded-files-action'>操作</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.files.map(function (file, index) {
              var uploadDate = formatDate(file.uploadDate)
              return (<tr key={index}>
                <td style={{whiteSpace: 'normal'}}>
                  <FileListItem file={file} onItemClick={component.showPreviewFile} />
                </td>
                <td>{file.fileShowSize}</td>
                <td>{file.commonName}</td>
                <td>{uploadDate}</td>
                <td className='uploaded-files-action'>
                  <a className={component.props.downloadable ? 'uploaded-files-btn' : 'hidden'}
                    onClick={component.downloadFile.bind(component, file)} >下载</a>
                  <a className={component.props.deletable ? 'uploaded-files-btn' : 'hidden'}
                    onClick={component.deleteFile.bind(component, file)} >删除</a>
                </td>
              </tr>)
            })
          }
          </tbody>
        </table>
      )
    } else {
      return (
        <table className='table uploaded-files'>
          <thead>
            <tr>
              <th style={{minWidth: 10 + 'em', width: '50%'}}>文件名称</th>
              <th style={{width: '15%'}}>文件大小</th>
              <th style={{width: '15%'}}>上传人</th>
              <th style={{width: '20%'}}>上传日期</th>
            </tr>
          </thead>
          <tbody>
          {
            this.state.files.map(function (file, index) {
              var uploadDate = formatDate(file.uploadDate)
              return (<tr key={index}>
                <td style={{whiteSpace: 'normal'}}>
                  <FileListItem file={file} onItemClick={component.showPreviewFile} />
                </td>
                <td>{file.fileShowSize}</td>
                <td>{file.commonName}</td>
                <td>{uploadDate}</td>
              </tr>)
            })
          }
          </tbody>
        </table>)
    }
  }

  render () {
    if (this.props.loaded !== false) {
      if (this.props.files && this.props.files.length > 0) {
        return (
          <div>
            <div className='table-responsive'>
            {
              this.showFileList()
            }
            </div>
            <FilePreview {... this.state.previewFileInfo} show={this.state.showPreview}
              hideModal={this.hidePreview} />
          </div>
        )
      } else {
        return (<div>空</div>)
      }
    } else {
      return (
        <div style={{height: '3em'}} className={this.props.loaded ? 'hidden' : 'payment-mask'} />
      )
    }
  }
}

FileListTable.defaultProps = {
  deletable: true,
  downloadable: true
}

export default FileListTable
