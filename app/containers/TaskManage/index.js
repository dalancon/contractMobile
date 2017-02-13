/*
 *
 * TaskManage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import makeSelectTaskManage from './selectors';
import messages from './messages';

import PageHeader from 'components/PageHeader';
import PaymentNavTab from 'components/PaymentNavTab';
import TableSelector from 'components/TableSelector';
import TaskTable from './TaskTable';

import { fetchTaskCondition, setPropSelected, fetchTask, setPageNo, setSearch } from './actions';


export class TaskManage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.dispatch(fetchTaskCondition('contract'));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page.current !== nextProps.page.current) {
      this.props.dispatch(fetchTask(nextProps.params.taskType, this.queryParams(nextProps.propSelected, nextProps.page.current, nextProps.search)));
    }

    if (this.props.params.taskType !== nextProps.params.taskType || JSON.stringify(this.props.propSelected) !== JSON.stringify(nextProps.propSelected) || this.props.search !== nextProps.search) {
      this.props.dispatch(fetchTask(nextProps.params.taskType, this.queryParams(nextProps.propSelected, 1, nextProps.search)));
    }
  }

  // 刷新合同
  propChange = (propSelected) => {
    this.props.dispatch(setPropSelected(propSelected));
  }

  onSearch = (value) => {
    this.props.dispatch(setSearch(value));
  }

  queryParams = (propSelected, current, search) => {
    const query = {
      offset: (current - 1) * this.props.page.limit,
      limit: this.props.page.limit,
      search,
    };

    if (propSelected && propSelected.length !== 0) {
      propSelected.forEach(function (x, i, a) {
        query[x.field] = x.sub[0].value;
      });
    }

    return query;
  }

  onPageChange = (pageNo) => {
    this.props.dispatch(setPageNo(pageNo));
  }

  render() {
    let title;
    let taskType = this.props.params.taskType;
    if (taskType === 'todo') {
      title = '待办事项';
    } else if (taskType === 'pass') {
      title = '经办事项';
    } else if (taskType === 'history') {
      title = '办结事项';
    } else if (taskType === 'participant') {
      title = '关注事项';
    } else {
      return (<div />);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PageHeader title={title} />
          </div>
        </div>
        <div className="row" >
          <div className="col-md-12" >
            <PaymentNavTab links={this.props.links} />
          </div>
        </div>
        <div className="row" >
          <div className="col-md-12" >
            <TableSelector expand={true} propSelected={this.props.propSelected}
              catpath={this.props.condition.catpath} common={this.props.condition.common} total={this.props.page.total}
              onPropChange={this.propChange} />
            <TaskTable
              task={ this.props.task }
              query={ this.props.query }
              taskType={ this.props.params.taskType }
              search={ this.props.search }
              onSearch={ this.onSearch }
              page={ this.props.page }
              items={ Math.ceil(this.props.page.total / this.props.page.limit) } 
              onPageChange={this.onPageChange} />
          </div>
        </div>
      </div>
    );
  }
}

TaskManage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


// const mapStateToProps = createStructuredSelector({
//   TaskManage: makeSelectTaskManage(),
// });

const mapStateToProps = makeSelectTaskManage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskManage);
