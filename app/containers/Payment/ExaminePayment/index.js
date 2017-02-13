/*
 *
 * 审批支付单页面
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';

import PageHeader from 'components/PageHeader';
import TaskHandleForm from 'components/TaskHandleForm';
import ContractToolbar from 'components/ContractToolbar';
import TaskHistory from 'components/TaskHistory';
import PaymentReadOnlyForm from 'components/PaymentReadOnlyForm';
import FilePreview from 'components/FilePreview';
import FlowDiagram from 'components/FlowDiagram';

import { createStructuredSelector } from 'reselect';
import makeSelectExaminePayment from './selectors';
import messages from './messages';

import {
  fetchInvoiceInfo,
  fetchTaskOpinion,
  fetchTaskHistory,
  fetchAssociateFile,
  fetchOutgoing,
  hideFlowDiagram,
  hideTaskHistory,
  hideTaskHandle,
  hidePreview,
  showFlowDiagram,
  showTaskHistory,
  showTaskHandle,
  showPreview,
  examining,
} from './actions';

/** 审批支付单页面*/
export class ExaminePayment extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { businessId, taskId, activityId, processInstanceId, processDefinitionId } = this.props.location.query;
    const param = businessId.split('||');
    const systemCode = param[0];
    const poNo = param[1];
    const invoiceNo = param[2];

    this.props.dispatch(fetchInvoiceInfo(systemCode, poNo, invoiceNo));
    this.props.dispatch(fetchTaskOpinion(businessId, processDefinitionId));
    this.props.dispatch(fetchAssociateFile(businessId));
    this.props.dispatch(fetchOutgoing(businessId, taskId, activityId, processInstanceId, processDefinitionId));
  }

  hideFlowDiagram = () => {
    this.props.dispatch(hideFlowDiagram());
  }

  showFlowDiagram = () => {
    this.props.dispatch(showFlowDiagram());
  }

  hideTaskHistory = () => {
    this.props.dispatch(hideTaskHistory());
  }

  showTaskHistory = () => {
    const { businessId, taskId } = this.props.location.query;
    this.props.dispatch(showTaskHistory());
    this.props.dispatch(fetchTaskHistory(businessId, taskId));
  }

  hideTaskHandle = () => {
    this.props.dispatch(hideTaskHandle());
  }

  showTaskHandle = () => {
    this.props.dispatch(showTaskHandle());
  }

  showPreview = (file) => {
    this.props.dispatch(showPreview(file));
  }

  hidePreview = () => {
    this.props.dispatch(hidePreview());
  }

  examinePayment = (user, comment) => {
    const title = user.userName ? `确定交给${user.userName}处理？` : '确定处理支付单？';
    const component = this;
    console.log(this);

    swal({
      title: title,
      text: `处理意见${comment}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '确认',
      cancelButtonText: '取消',
    }, function () {
      component.props.dispatch(examining(true));
      component.refs.taskHandleForm.submitForm()
    })
  }

  redirect = (result) => {
    component.dispatch(examining(false));

    if (result === true) {
      swal({
        title: '审批成功!',
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
        title: '审批失败!',
        text: '点击回到待办事项!',
        type: 'error',
        showCancelButton: false,
        confirmButtonColor: '#428bca',
        confirmButtonText: '确认',
        closeOnConfirm: true},
        function (isConfirm) {
          if (isConfirm) {
            location.href = '/task/todo'
          }
        })
    }
  }

  render() {
    const { businessId } = this.props.location.query;
    const param = businessId.split('||');

    const systemCode = param[0];
    const systemId = param[3];

    console.log('ExaminePayment:', this.props);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PageHeader title="合同支付审签流程" subTitle="审批支付单" />
            <ContractToolbar >
              <ButtonGroup>
                <Button bsSize="small" onClick={this.showTaskHandle}>处理申请单</Button>
                <Button bsSize="small" onClick={this.showTaskHistory}>流转历史</Button>
                <Button bsSize="small" onClick={this.showFlowDiagram}>查看流程图</Button>
              </ButtonGroup>
            </ContractToolbar>
          </div>
        </div>
        <form action="" method="post">
          <div className="row">
            <div className="col-md-12">
              <PaymentReadOnlyForm invoice={this.props.invoice} system={{id: systemId, code: systemCode}}
                opinions={this.props.opinions} file={this.props.associateFile}
                onClickFileTitle={this.showPreview} />
            </div>
          </div>
        </form>
        <FilePreview {... this.props.previewFileInfo} show={this.props.showPreview} hideModal={this.hidePreview} />
        <Modal bsSize="large" show={this.props.showHistory} onHide={this.hideTaskHistory}>
          <Modal.Header closeButton>
            <Modal.Title>流转历史</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskHistory history={this.props.history} loaded={this.props.historyLoaded} />
          </Modal.Body>
        </Modal>
        <Modal bsSize="large" show={this.props.showTaskHandle} onHide={this.hideTaskHandle}>
          <Modal.Header closeButton>
            <Modal.Title >处理申请单</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskHandleForm ref="taskHandleForm" {... this.props.location.query} showOutGoing
              outGoing={this.props.outGoing} onSubmit={this.examinePayment} afterSubmit={this.redirect} />
          </Modal.Body>
        </Modal>
        <Modal bsSize="large" show={this.props.showFlowDiagram} onHide={this.hideFlowDiagram}>
          <Modal.Header closeButton>
            <Modal.Title>流程图</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FlowDiagram {... this.props.location.query} />
          </Modal.Body>
        </Modal>
        <div className={this.props.examining ? "payment-page-mask" : "hidden"} />
      </div>
    );
  }
}

ExaminePayment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectExaminePayment();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExaminePayment);
