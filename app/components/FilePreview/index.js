import React from 'react';
import { Modal } from 'react-bootstrap';
import htmlencode from 'htmlencode';
import './style.scss';
/** 文件预览react组件*/

class FilePreview extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired,
    hideModal: React.PropTypes.func,
    commonName: React.PropTypes.string,
    confirmSuccess: React.PropTypes.string,
    fileCat: React.PropTypes.string,
    fileKey: React.PropTypes.string,
    fileProgCode: React.PropTypes.string,
    fileShowName: React.PropTypes.string,
    fileShowSize: React.PropTypes.string,
    fileSize: React.PropTypes.number,
    insertDate: React.PropTypes.number,
    insertUser: React.PropTypes.string,
    remarkText: React.PropTypes.string,
    seqNo: React.PropTypes.number,
    uploadDate: React.PropTypes.number,
    uploadStatus: React.PropTypes.string,
    uploadUser: React.PropTypes.string
  }

  componentDidUpdate (prevProps, prevState) {
    let filePath = this.props.remarkText
    let component = this
    if (filePath && this.props.show) {
      if (/(doc(x)?|xls(x)?|ppt(x)?)$/i.test(filePath)) {
        // 获取文档对象
        filePath = encodeURI(filePath)
        $(component.refs.officeDiv).append('<object id="TANGER_OCX" name="TANGER_OCX"' +
            'classid="clsid:C9BC4DFF-4248-4a3c-8A49-63A7D317F404"' +
            'codebase="/qdp/lib/ntkoOffice/OfficeControl.cab#version=5,0,1,6" width="100%" height="100%">' +
            '<param name="MakerCaption" value="中电科长江数据股份有限公司"/>' +
            '<param name="MakerKey" value="E862EEFF6D976F41A81D67BEF5BD3450217FCEA1"/>' +
            '<param name="ProductCaption" value="中国长江三峡集团公司"/>' +
            '<param name="ProductKey" value="0149138A064B57EEC1B42144148FF7D18E1497B3"/>' +
            '<param name="IsUseControlAgent" value="true"/>' +
            '<param name="IsUseUTF8URL" value="true"/>' +
            '<param name="IsUseUTF8Data" value="true"/>' +
            '<param name="IsShowNetErrorMsg" value="false"/>' +
            '<param name="DefaultOpenDocType" value="0"/>' +
            '<param name="IsShowFileErrorMsg" value="false"/>' +
            '<param name="TitleBar" value="true"/>' +
            '<param name="MenuBar" value="true"/>' +
            '<param name="ToolBars" value="true"/>' +
            '<param name="Statusbar" value="true"/>' +
            '<param name="IsResetToolbarsOnOpen" value="false"/>' +
            '<param name="IsShowHelpMenu" value="true"/>' +
            '<param name="IsShowInsertMenu" value="true"/>' +
            '<param name="IsShowEditMenu" value="true"/>' +
            '<param name="FileNew" value="false"/>' +
            '<param name="FileOpen" value="true"/>' +
            '<param name="FileClose" value="false"/>' +
            '<param name="IsShowFullScreenButton" value="true"/>' +
            '<param name="IsNoCopy" value="false"/>' +
            '<param name="IsStrictNoCopy" value="false"/>' +
            '<param name="IsOpenURLReadOnly" value="false"/>' +
            '<param name="Caption" value="预览"/>' +
            '<param name="BorderStyle" value="0"/>' +
            '<param name="BorderColor" value="14402205"/>' +
            '<param name="TitlebarColor" value="14402205"/>' +
            '<param name="TitlebarTextColor" value="0"/>' +
            '<param name="IsShowToolMenu" value="-1"/>' +
            '<param name="MaxUploadSize" value="10000000"/>' +
            '<span style="color:red"> 装载文档插件失败！请检查如下两项：' +
            '<br/>1、请使用IE9+浏览器，并检查浏览器选项中的安全设置；' +
            '<br/>2、检查文档插件是否正确安装。</span>' +
          '</object>')

        var officeObj = document.getElementById('TANGER_OCX')
        try {
          setTimeout(function () {
            officeObj.OpenFromURL('/qdp/qdp/payment/file/previewOffice?filePath=' + filePath)
          }, 1000)
        } catch (e) {
          console.log('error')
        }
      } else {
        $.post('/qdp/qdp/payment/file/preview', {filePath: this.props.remarkText}, function (result) {
          if (result) {
            let url = encodeURI('/qdp/qdp/' + result)
            if (/(gif|jp(e)?g|png)$/i.test(url)) {
              $(component.refs.imgPreview).attr('src', url)
            } else if (/txt$/i.test(url)) {
              $.get(url, null, function (response, status, xhr) {
                $(component.refs.textPreview).empty().append(htmlencode.htmlEncode(response))
              })
            } else if (/pdf$/i.test(url)) {
              $(component.refs.pdfPreview).media({
                src: url,
                width: '100%'
              })
            }
          }
        })
      }
    }
  }

  showPreview () {
    let filePath = this.props.remarkText
    if (/(doc(x)?|xls(x)?|ppt(x)?)$/i.test(filePath)) {
      return (
        <div ref='officeDiv' className='preview-modal' />
      )
    } else if (/(gif|jp(e)?g|png)$/i.test(filePath)) {
      return (<img ref='imgPreview' className='img-responsive' />)
    } else if (/txt$/i.test(filePath)) {
      return (<pre ref='textPreview' style={{wordWrap: 'break-word', whiteSpace: 'pre-wrap'}} />)
    } else if (/pdf$/i.test(filePath)) {
      return (<div ref='pdfPreview' className='preview-modal' />)
    }
  }

  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.hideModal} dialogClassName='custom-modal' bsSize='lg'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-lg'>文件预览</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.showPreview()}
        </Modal.Body>
      </Modal>
    )
  }
}

FilePreview.defaultProps = {}

export default FilePreview
