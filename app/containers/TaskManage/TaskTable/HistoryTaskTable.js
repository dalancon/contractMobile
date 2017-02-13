import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import formatter from 'utils/formatter.js';

/** 合同表格 */
class HistoryTaskTable extends React.Component {
  generateUrl(task) {
    return (<Link to={task.url}>{task.subject}</Link>);
  }

  generateActions = (task) => {
    return this.props.generateActions(task);
  }

  render() {
    const { generateUrl, generateActions } = this;
    const onSearch = this.props.onSearch;
    return (
      <div>
        <Table >
          <thead>
            <tr>
              <th style={{ width: '50%' }}>主题</th>
              <th style={{ width: '10%' }}>发起人</th>
              <th style={{ width: '15%' }}>开始时间</th>
              <th style={{ width: '15%' }}>结束时间</th>
              <th style={{ width: '10%' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.task.map(function (x, index) {
                return (<tr key={index}>
                  <td>{ generateUrl(x) }</td>
                  <td>{ x.startUserName }</td>
                  <td>{ formatter.formatTime(x.startTime) }</td>
                  <td>{ formatter.formatTime(x.endTime) }</td>
                  <td>{ generateActions(x) }</td>
                </tr>);
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }


}

export default HistoryTaskTable;
