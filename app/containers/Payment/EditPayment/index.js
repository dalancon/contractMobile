/*
 *
 * 审批支付单页面
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'react-bootstrap';

import PageHeader from 'components/PageHeader';
import PaymentBreadcrumb from 'components/PaymentBreadcrumb';
import PaymentBasicInfoEditForm from 'components/PaymentBasicInfoEditForm';
import PaymentDetailsForm from 'components/PaymentDetailsForm';
import FileUpload from 'components/FileUpload';
import TaskHistory from 'components/TaskHistory';
import TaskHandleForm from 'components/TaskHandleForm';

import { createStructuredSelector } from 'reselect';
import makeSelectEditPayment from './selectors';
import messages from './messages';

import {
  fetchInvoiceInfo,
  fetchTaskOpinion,
  fetchTaskHistory,
  fetchAssociateFile,
  fetchOutgoing,
  fetchUsers, 
  fetchUploadInfo,
  fetchPoItem,
  setValidStatus,
  applying,
} from './actions';

/** 审批支付单页面*/
export class EditPayment extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { businessId, taskId, activityId, processInstanceId, processDefinitionId } = this.props.location.query;
    const param = businessId.split('||');
    const systemCode = param[0];
    const poNo = param[1];
    const invoiceNo = param[2];

    this.props.dispatch(fetchInvoiceInfo(systemCode, poNo, invoiceNo));
    this.props.dispatch(fetchPoItem(systemCode, poNo, invoiceNo));
    this.props.dispatch(fetchAssociateFile(businessId));
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchUploadInfo());
    this.props.dispatch(fetchOutgoing(businessId, taskId, activityId, processInstanceId, processDefinitionId));
    this.props.dispatch(fetchTaskHistory(businessId, taskId));

  }

  vaildateForm() {
    this.props.dispatch(setValidStatus(true));
    return (this.refs.basicInfo.isValidate() && this.refs.detailInfo.isValidate());
  }

    //提交支付申请
  examinePayment = (user, comment) => {

    String.prototype.format = function () {
      var args = arguments
      return this.replace(/\{(\d+)\}/g, function (s, i) {
        return args[i]
      })
    }

    if(this.vaildateForm()){
      var title = user.userName ? `确定交给${user.userName}处理？` : '确定处理支付单？';
      var component = this;

      swal({
          title: title, 
          text: `处理意见：${comment}`,
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: '确认',
          cancelButtonText: '取消',
        }, function() {
          component.props.dispatch(applying(true));

          $.ajax({
            cache: true,
            type: component.refs.form.method,
            url: component.refs.form.action,
            data: $(component.refs.form).serialize(),
            async: true,
            success: function(businessId) {
              if(businessId){
                component.setState({
                  businessId:businessId
                })
                component.refs.taskHandleForm.submitForm()
              }else{
                swal({   
                  title: '支付单修改失败!',   
                  text: '点击回到待办事项!',   
                  type: 'error',   
                  showCancelButton: false,      
                  confirmButtonColor: '#428bca',   
                  confirmButtonText: '确认',
                  closeOnConfirm: true}, 
                  function(isConfirm){   
                    if (isConfirm) {     
                      location.href = '/task/todo'
                    }
                  });
              }
            }
          }); 
      });
    }
  }

  redirect = (result) => {
    component.props.dispatch(applying(false));

    if(result == true){
      swal({   
        title: '重新提交支付单成功!',   
        text: '点击回到待办事项!',   
        type: 'success',   
        showCancelButton: false,      
        confirmButtonColor: '#428bca',
        confirmButtonText: '确认', 
        closeOnConfirm: true}, 
        function(isConfirm){   
          if (isConfirm) {   
            location.href = '/task/todo'
          }
        });
    }else{
      swal({   
        title: '支付单修改失败!',   
        text: '点击回到待办事项!',   
        type: 'error',   
        showCancelButton: false,      
        confirmButtonColor: '#428bca',
        confirmButtonText: '确认',
        closeOnConfirm: true}, 
          function(isConfirm){   
            if (isConfirm) { 
              location.href = '/task/todo'
            }
        })
    }
  }

  render() {
    const params = this.props.location.query;
    const businessId = this.props.location.query.businessId;
    const param = businessId.split('||');

    const systemCode = param[0];
    const systemId = param[3];
    console.log('EditPayment:', this.props);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PageHeader title="合同支付审签流程" subTitle="修改支付单"/>   </div>
        </div>
        <form ref="form" action="/qdp/payment/payment/edit" method="post">
          <input type="hidden" name="businessId" value={params.businessId} />
          <input type="hidden" name="taskId" value={params.taskId} />
          <input type="hidden" name="processInstanceId" value={params.processInstanceId} />
          <div className="row">
            <div className="col-md-12">
              <h3 className="form-section-header">1.支付单基本信息</h3>
              <PaymentBasicInfoEditForm ref="basicInfo" payment={this.props.invoice} system={{id:systemId, code:systemCode}} validStatus={this.props.validStatus}  />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3 className="form-section-header">2.支付单明细</h3>
              <PaymentDetailsForm ref="detailInfo" pcList={this.props.poItem} type="filled" validStatus={this.props.validStatus}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3 className="form-section-header">3.上传附件</h3>
              <FileUpload {... this.props.uploadInfo} name="fileIds" files={this.props.associateFile}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3 className="form-section-header">4.流转历史</h3>
              <TaskHistory history={this.props.history} loaded={this.props.historyLoaded}/>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <TaskHandleForm ref="taskHandleForm" showOutGoing={false} AfterSubmit={this.redirect} onSubmit={this.editPayment} {...params} outGoing={this.props.outGoing}/>
               </div>
          </div>
        </form>
        <div className={this.props.applying?'payment-page-mask':'hidden'}></div>
      </div>
    );
  }
}

EditPayment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectEditPayment();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPayment);
