/*
 *
 * ViewContract
 *
 */

import React, { PropTypes } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectViewContract from './selectors';

import PageHeader from 'components/PageHeader';
import TableSelector from 'components/TableSelector';
import ContractTable from './ContractTable';
import { fetchContractCondition, setPropSelected, fetchContract, setPageNo, setSearch } from './actions';

export class ViewContract extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.dispatch(fetchContractCondition());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page.current !== nextProps.page.current ) {
      this.props.dispatch(fetchContract(this.queryParams(nextProps.propSelected, nextProps.page.current, nextProps.search)));
    }

    if (JSON.stringify(this.props.propSelected) !== JSON.stringify(nextProps.propSelected) || this.props.search !== nextProps.search) {
      this.props.dispatch(fetchContract(this.queryParams(nextProps.propSelected, 1, nextProps.search)));
    }
  }

  // 刷新合同
  propChange = (propSelected) => {
    this.props.dispatch(setPropSelected(propSelected));
  }

  onPageChange = (pageNo) => {
    this.props.dispatch(setPageNo(pageNo));
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

  render() {
    console.log('ViewContract', this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PageHeader title="查看合同" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <TableSelector expand={true} propSelected={this.props.propSelected}
              catpath={this.props.condition.catpath} common={this.props.condition.common} total={this.props.page.total}
              onPropChange={this.propChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ContractTable contract={this.props.contract} search={this.props.search} onSearch={this.onSearch}
              onPageChange={this.onPageChange} current={this.props.page.current} items={Math.ceil(this.props.page.total / this.props.page.limit)}/>
          </div>
        </div>
      </div>
    );
  }
}

ViewContract.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectViewContract();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContract);
