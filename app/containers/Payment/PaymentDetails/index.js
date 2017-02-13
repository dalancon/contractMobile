/*
 *
 * 支付单明细页面
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Modal } from 'react-bootstrap';

import PageHeader from 'components/PageHeader';
import PaymentBasicInfo from 'components/PaymentBasicInfo';
import PaymentDetailsInfo from 'components/PaymentDetails';
import TaskHistory from 'components/TaskHistory';
import WithdrawButton from 'components/WithdrawButton';
import FlowDiagram from 'components/FlowDiagram';
import ReportForm from 'components/ReportForm';
import FileListTable from 'components/FileListTable';

import makeSelectPaymentDetails from './selectors';
import messages from './messages';

import {
  fetchPaymentInfo,
  fetchPaymentDetails,
  fetchTaskHistory,
  fetchAssociateFile,
  fetchWithDrawStatus,
  hideFlowDiagram,
  hideReportForm,
  showFlowDiagram,
  showReportForm,
} from './actions';


export class PaymentDetails extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const { businessId, taskId, activityId, processDefinitionId } = this.props.location.query;
    const param = businessId.split('||');
    const systemCode = param[0];
    const poNo = param[1];
    const invoiceNo = param[2];

    this.props.dispatch(fetchPaymentInfo(systemCode, poNo, invoiceNo));
    this.props.dispatch(fetchPaymentDetails(systemCode, poNo, invoiceNo));
    this.props.dispatch(fetchTaskHistory(businessId, taskId));
    this.props.dispatch(fetchAssociateFile(businessId));
    this.props.dispatch(fetchWithDrawStatus(taskId, processDefinitionId, activityId));
  }

  hideFlowDiagram = () => {
    this.props.dispatch(hideFlowDiagram());
  }

  hideReportForm = () => {
    this.props.dispatch(hideReportForm());
  }

  showFlowDiagram = () => {
    this.props.dispatch(showFlowDiagram());
  }

  showReportForm = () => {
    this.props.dispatch(showReportForm());
  }

  renderButtons() {
    if (this.props.location.isComplete) {
      return (
        <div>
          <div className="col-md-3 col-md-offset-3">
            <button type="button" className="btn btn-default payment-button"
              onClick={this.showFlowDiagram} >查看流程图</button>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-default payment-button"
              onClick={this.showReportForm} >打印支付单</button>
          </div>
        </div>
      );
    } else if (this.props.canWithDraw && !this.props.location.isComplete) {
      return (
        <div>
          <div className="col-md-3 col-md-offset-3">
            <button type="button" className="btn btn-default payment-button"
              onClick={this.showFlowDiagram} >查看流程图</button>
          </div>
          <div className="col-md-3">
            <WithdrawButton withdrawUrl={'/qdp/qdp/payment/bpm/task/withdraw'} taskId={this.props.location.query.taskId} />
          </div>
        </div>
      );
    } else if (!this.props.canWithDraw && !this.props.location.isComplete) {
      return (
        <div className="col-md-4 col-md-offset-4">
          <button type="button" className="btn btn-default payment-button"
            onClick={this.showFlowDiagram} >查看流程图</button>
        </div>
      );
    }
  }

  render() {
    const businessId = this.props.location.query.businessId;
    const param = businessId.split('||');
    const systemCode = param[0];
    const systemId = param[3];

    console.log('PaymentDetails:', this.props);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PageHeader title="合同支付审签流程" subTitle="支付单明细" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="form-section-header">1.支付单基本信息</h3>
            <PaymentBasicInfo payment={this.props.invoice} system={{ id: systemId, code: systemCode }} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="form-section-header">2.支付单明细</h3>
            <PaymentDetailsInfo items={this.props.poItem} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="form-section-header">3.相关附件</h3>
            <FileListTable files={this.props.associateFile} loaded={this.props.associateFileLoaded} deletable={false} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="form-section-header">4.流转历史</h3>
            <TaskHistory history={this.props.history} loaded={this.props.historyLoaded} />
          </div>
        </div>
        <div className="row">
          {
            this.renderButtons()
          }
        </div>
        <Modal bsSize="large" show={this.props.showFlowDiagram} onHide={this.hideFlowDiagram}>
          <Modal.Header closeButton>
            <Modal.Title>流程图</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FlowDiagram processInstanceId={this.props.location.query.processInstanceId}
              processDefinitionId={this.props.location.query.processDefinitionId} appName="informationCenterPayment" />
          </Modal.Body>
        </Modal>
        <Modal bsSize="large" show={this.props.showReportForm} onHide={this.hideReportForm}>
          <Modal.Header closeButton>
            <Modal.Title>选择打印参数</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReportForm  processDefinitionId={this.props.location.query.processDefinitionId + ''} reportType="payment"
              businessId={this.props.location.query.businessId} onClickCancel={this.hideReportForm} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

PaymentDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectPaymentDetails();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetails);
