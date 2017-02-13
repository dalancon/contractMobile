/*
 *
 * TaskManage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectApplyPayment from './selectors';
import messages from './messages';

import PageHeader from 'components/PageHeader';
import PaymentBasicInfoForm from 'components/PaymentBasicInfoForm';
import PaymentDetailsForm from 'components/PaymentDetailsForm';
import FileUpload from 'components/FileUpload';
import TaskApplyForm from 'components/TaskApplyForm';

import { 
  fetchPaymentInfo,
  fetchVendors,
  fetchPcList,
  fetchUsers,
  fetchUploadInfo,
  setValidStatus,
  applying,
  setBusinessId,
} from './actions';

export class ApplyPayment extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { code, poNo } = this.props.location.query;
    this.props.dispatch(fetchPaymentInfo(code, poNo));
    this.props.dispatch(fetchVendors(code, poNo));
    this.props.dispatch(fetchUsers());
    this.props.dispatch(fetchUploadInfo());
  }

  vaildateForm() {
    this.props.dispatch(setValidStatus(true));
    return (this.refs.basicInfo.isValidate() && this.refs.detailInfo.isValidate());
  }

  // 提交支付申请
  addPayment = (user, comment) => {
    if (this.vaildateForm()) {
      var title = user.userName ? `确定交给${user.userName}处理？`: '确定处理支付单';
      var component = this;

      swal({
        title: title,
        text: `处理意见：${comment}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }, function () {
        component.props.dispatch(applying(true));
        $.ajax({
          cache: true,
          type: component.refs.form.method,
          url: component.refs.form.action,
          data: $(component.refs.form).serialize(),
          async: true,
          error: function (){
            component.props.dispatch(applying(false));
            setTimeout(function (){
              swal({
                title: '支付单申请失败!',
                text: '点击回到查看合同页面!',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#428bca',
                confirmButtonText: '确认',
                closeOnConfirm: true},
                function (isConfirm) {
                  if (isConfirm) {
                    location.href = '/contract';
                  }
                })
            }, 500);
          },
          success: function (businessId) {
            if (businessId) {
              component.props.dispatch(setBusinessId(businessId));
              component.refs.taskApplyForm.submitForm()
            } else {
              swal({
                title: '支付单申请失败!',
                text: '点击回到查看合同页面!',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#428bca',
                confirmButtonText: '确认',
                closeOnConfirm: true},
                function (isConfirm) {
                  if (isConfirm) {
                    location.href = '/contract';
                  }
                })
            }
          }
        })
      })
    }
  }

  redirect = (result) => {

    this.props.dispatch(applying(false));

    if (result === true) {
      swal({
        title: '支付单申请成功!',
        text: '点击回到待办事项!',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#428bca',
        confirmButtonText: '确认',
        closeOnConfirm: true},
        function (isConfirm) {
          if (isConfirm) {
            location.href = '/task/todo'
          }
        })
    } else {
      swal({
        title: '支付单申请失败!',
        text: '点击回到查看合同页面!',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#428bca',
        confirmButtonText: '确认',
        closeOnConfirm: true},
        function (isConfirm) {
          if (isConfirm) {
            location.href = '/contract'
          }
        })
    }
  }

  changeCompany = (val) => {
    const { code, poNo } = this.props.location.query;
    this.props.dispatch(fetchPcList(code, poNo, val.value));
  }

  render() {
    const { id, code } = this.props.location.query;

    console.log('ApplyPayment:', this.props);               

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <PageHeader title='合同支付审签流程' subTitle='申请支付单' />
          </div>
        </div>
        <form ref='form' action='/qdp/payment/payment/add' method='post'>
          <input type='hidden' name='code' value={code} />
          <input type='hidden' name='id' value={id} />
          <div className='row'>
            <div className='col-md-12'>
              <h3 className='form-section-header'>1.支付单基本信息</h3>
              <PaymentBasicInfoForm ref='basicInfo' vendors={this.props.vendors} payment={this.props.paymentInfo}
                system={{id: id, code: code}} validStatus={this.props.validStatus}
                companyChange={this.changeCompany} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <h3 className='form-section-header'>2.支付单明细</h3>
              <PaymentDetailsForm ref='detailInfo' pcList={this.props.poItem} type='all'
                validStatus={this.props.validStatus} />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <h3 className='form-section-header'>3.上传附件</h3>
              <FileUpload {... this.props.uploadInfo} name='fileIds' />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-12'>
              <TaskApplyForm ref='taskApplyForm' onSubmit={this.addPayment}
                AfterSubmit={this.redirect} users={this.props.users}
                appName='informationCenterPayment' businessId={this.props.businessId} />
            </div>
          </div>
        </form>
        <div className={this.props.applying ? 'payment-page-mask' : 'hidden'} />
      </div>
    );
  }
}

ApplyPayment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = makeSelectApplyPayment();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyPayment);
