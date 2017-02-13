import React from 'react'
import FileListTable from 'components/FileListTable'

class FileUpload extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    filePath: React.PropTypes.string,
    fileProgCode: React.PropTypes.string,
    fileKey: React.PropTypes.string,
    onUpload: React.PropTypes.func,
    files: React.PropTypes.arrayOf(React.PropTypes.shape({
      commonName: React.PropTypes.string,
      confirmSuccess: React.PropTypes.number,
      fileCat: React.PropTypes.string,
      fileKey: React.PropTypes.string,
      fileProgCode: React.PropTypes.string,
      fileShowName: React.PropTypes.string,
      fileShowSize: React.PropTypes.string,
      fileSize: React.PropTypes.string,
      insertDate: React.PropTypes.string,
      insertUser: React.PropTypes.string,
      remarkText: React.PropTypes.string,
      seqNo: React.PropTypes.number,
      uploadDate: React.PropTypes.string,
      uploadStatus: React.PropTypes.string,
      uploadUser: React.PropTypes.string
    }))
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      files: props.files
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.filePath != prevProps.filePath) {
      this.initFileupload();
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.filePath) {
  //     this.initFileupload()
  //   }
  // }

  componentDidMount () {
   
    if (this.props.filePath) {
      this.initFileupload()
    }
  }

  initFileupload () {
    let browser = navigator.appName
    let bVersion = navigator.appVersion
    let version = bVersion.split(';')
    let trimVersion = $.trim(version[1])
    let iframe = false
    if (browser === 'Microsoft Internet Explorer' && trimVersion === 'MSIE 9.0') {
      iframe = true
    }
    var component = this;
    $(this.refs.fileupload).fileupload({
      url: '/qdp/qdp/payment/file/upload',
      dataType: 'json',
      iframe: iframe,
      formAcceptCharset: 'utf-8',
      formData: {
        filePath: this.props.filePath,
        fileProgCode: this.props.fileProgCode,
        fileKey: this.props.fileKey
      },
      done: function (e, data) {
        component.setState({
          files: data.result
        })
        $(component.refs.progress).find('.bar').width(0)
        if (component.props.onUpload) {
          component.props.onUpload(component.state.files)
        }
      },
      progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10)
        $(component.refs.progress).find('.bar').css(
            'width',
            progress + '%'
        )
      },
      minFileSize: 1,
      singleFileUploads: false,
      acceptFileTypes: /(\.|\/)(gif|jp(e)?g|png|doc(x)?|xls(x)?|ppt(x)?|pdf|txt)$/i
    })
  }

  setFileIds () {
    var fileIds = this.state.files
      ? this.state.files.map((file) => {
        return (file.fileProgCode + '||' + file.fileKey + '||' + file.seqNo)
      })
      : ''
    return fileIds
  }

  deleteFile = (file, files) => {
    this.setState({files: files})
  }

  render () {
    return (
      <div ref='fileupload' style={{paddingBottom: '1em'}}>
        <input type='hidden' name={this.props.name} value={this.setFileIds()} />
        <div ref='progress'>
          <div className='bar' style={{width: '0%', height: '0.2em', background: '#428bca'}} />
        </div>
        <span className='btn btn-default fileinput-button'>
          <i className='glyphicon glyphicon-plus' />
          <span>选择上传文件</span>
          <input ref='fileupload' type='file' name='files' multiple />
        </span>
        <div className={(this.state.files && this.state.files.length > 0) ? '' : 'hidden'}>
          <FileListTable files={this.state.files} onDelete={this.deleteFile} />
        </div>
      </div>
    )
  }
}

export default FileUpload
