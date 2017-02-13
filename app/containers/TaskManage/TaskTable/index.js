import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, Pagination, InputGroup, FormControl, Glyphicon, Modal } from 'react-bootstrap';
import FlowDiagram from 'components/FlowDiagram';
import ReportForm from 'components/ReportForm';
import formatter from 'utils/formatter';

import makeSelectTaskTable from './selectors';
import TodoTaskTable from './TodoTaskTable';
import HistoryTaskTable from './HistoryTaskTable';
import ParticipantTaskTable from './ParticipantTaskTable';
import PassTaskTable from './PassTaskTable';
import './style.scss';
import {
  showFlowDiagram,
  hideFlowDiagram,
  showReportForm,
  hideReportForm,
  showMask,
} from './actions';

/** 显示待办、经办、办结、关注事项的表格*/

class TaskTable extends React.Component {
  componentWillReceiveProps(nextProps) {
    
  }

  hideFlowDiagram = () => {
    this.props.dispatch(hideFlowDiagram());
  }

  hideReportForm = () => {
    this.props.dispatch(hideReportForm());
  }

  showMask = () => {
    this.props.dispatch(showMask());
  }

  generateTodoActions = (task) => {
    return (<a className="flow-diagram-btn" onClick={() => {
      this.props.dispatch(showFlowDiagram(task.processInstanceId, task.processDefinitionId));
    }} >流程图</a>);
  }

  generateHistoryActions = (task) => {
    return (
      <div>
        <a className="flow-diagram-btn" onClick={() => {
          this.props.dispatch(showFlowDiagram(task.processInstanceId, task.processDefinitionId));
        }} >流程图</a>
        <a className="print-report-btn" onClick={() => {
          this.props.dispatch(showReportForm(task.businessKey, task.processDefinitionId, task.param.reportType));
        }} >打印</a>
      </div>);
  }

  showTaskTable(taskType) {
    const  { generateTodoActions, generateHistoryActions } = this;
    switch (taskType) {
      case 'todo':
        return (<TodoTaskTable task={this.props.task} generateActions={generateTodoActions} />);
      case 'history':
        return (<HistoryTaskTable task={this.props.task} generateActions={generateHistoryActions} />);
      case 'pass':
        return (<PassTaskTable task={this.props.task} generateActions={generateTodoActions} />);
      case 'participant':
        return (<ParticipantTaskTable task={this.props.task} generateActions={generateTodoActions} />);
      default:
        return (<div></div>);
    }
  }

  render() {
    const onSearch = this.props.onSearch;
    console.log('TaskTable:', this.props);
    return (
      <div style={{ position: 'relative' }}>
        <div>
          <InputGroup style={{ width: '50%', float: 'right', marginTop: '1em', marginBottom: '1em' }}>
            <FormControl type="text" value={this.props.search} onChange={(e) => onSearch(e.target.value)} placeholder='合同代码'/>
            <InputGroup.Addon>
              <Glyphicon glyph="search" />
            </InputGroup.Addon>
          </InputGroup>
          {
            this.showTaskTable(this.props.taskType)
          }
          <Pagination
            style={{ float: 'right' }}
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            items={this.props.items}
            maxButtons={5}
            activePage={this.props.page.current}
            onSelect={this.props.onPageChange} />
        </div>
        <Modal bsSize='large' show={this.props.activeTask.showFlowDiagram} onHide={this.hideFlowDiagram}>
          <Modal.Header closeButton>
            <Modal.Title>流程图</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FlowDiagram processInstanceId={this.props.activeTask.processInstanceId}
              processDefinitionId={this.props.activeTask.processDefinitionId} />
          </Modal.Body>
        </Modal>
        <Modal bsSize='large' show={this.props.activeTask.showReportForm} onHide={this.hideReportForm}>
          <Modal.Header closeButton>
            <Modal.Title>选择打印参数</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ReportForm onReport={this.showMask}
              reportType={this.props.activeTask.reportType} processDefinitionId={this.props.activeTask.processDefinitionId}
              businessId={this.props.activeTask.businessId} onClickCancel={this.hideReportForm} />
          </Modal.Body>
        </Modal>
        <div className={this.props.reporting ? 'payment-page-mask' : 'hidden'} />
      </div>
    );
  }
}


TaskTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


// const mapStateToProps = createStructuredSelector({
//   TaskTable: makeSelectTaskTable(),
// });

const mapStateToProps = makeSelectTaskTable();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);
