import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router';
import formatter from 'utils/formatter.js';

/** 合同表格 */
class TodoTaskTable extends React.Component {
  generateUrl(task) {
    return (<Link to={task.url}>{task.subject}</Link>);
  }

  generateActions = (task) => {
    return this.props.generateActions(task);
  }

  render() {
    const { generateUrl, generateActions } = this;
    const onSearch = this.props.onSearch;
    console.log('TodoTaskTable:', this.props);
    return (
      <div>
        <Table >
          <thead>
            <tr>
              <th style={{ width: '40%' }}>主题</th>
              <th style={{ width: '10%' }}>发起人</th>
              <th style={{ width: '25%' }}>当前环节</th>
              <th style={{ width: '15%' }}>开始时间</th>
              <th style={{ width: '10%' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.task.map(function (x, index) {
                return (<tr key={index}>
                  <td>{ generateUrl(x) }</td>
                  <td>{ x.startUserName }</td>
                  <td>{ x.taskName }</td>
                  <td>{ formatter.formatTime(x.createTime) }</td>
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

export default TodoTaskTable;
