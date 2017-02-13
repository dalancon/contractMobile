import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PageHeader from 'components/PageHeader';
import ContractToolbar from 'components/ContractToolbar';
import ContractDetails from 'components/ContractDetails';
import ContractBasicInfo from 'components/ContractBasicInfo';
import ContractPaidHistory from 'components/ContractPaidHistory';
import { Button, ButtonGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router';
import { isBudgetYear } from 'apis/contract';
import { fetchContractInfo, fetchPoItem, fetchPaidHistory } from './actions';

import makeSelectContractDetails from './selectors';

class ContractDetails_ extends React.Component {

  componentDidMount () {
    const { code, id, poNo } = this.props.location.query;
    this.props.dispatch(fetchContractInfo(code, poNo));
    this.props.dispatch(fetchPoItem(code, poNo));
    this.props.dispatch(fetchPaidHistory(id, code, poNo));
  }

  budget = (e) => {
    const { code, poNo } = this.props.location.query;
    this.serverRequest = isBudgetYear(code, poNo)
      .then((response) => response.json())
      .then(function (data) {
        if (data === false) {
          swal({
            title: '警告',
            text: '当前合同预算代码不正确，请联系合同管理员',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#428bca',
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            closeOnConfirm: true},
            function (isConfirm) {
              if (isConfirm) {
                this.props.router.push({
                  pathname: '/contract/payment/apply',
                  query: this.props.location.query
                })
              }
            }.bind(this))
        } else if (data === true) {
          this.props.router.push({
            pathname: '/contract/payment/apply',
            query: this.props.location.query
          })
        }
      }.bind(this))
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <PageHeader title="合同明细" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ContractToolbar>
              <ButtonGroup>
                <LinkContainer to={{ pathname: '/contract/guarantee/apply', query: this.props.location.query}}>
                  <Button bsSize="small">质保金申请</Button>
                </LinkContainer>
                <Button bsSize="small" onClick={this.budget}>支付申请</Button>
              </ButtonGroup>
            </ContractToolbar>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="form-section-header">1.合同基本信息</h3>
            <ContractBasicInfo contract={this.props.contractInfo} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h3 className="form-section-header">2.合同明细</h3>
            <ContractDetails items={this.props.poItem} />
          </div>
        </div>
        <div className="row">
          {(this.props.paidHistory && this.props.paidHistory.length > 0)
            ? (<div className="col-md-12"><h3 className="form-section-header">3.合同支付历史</h3>
              <ContractPaidHistory paidHistory={this.props.paidHistory}
                showCompleteRatio={false || (this.props.contractDetails
                ? (this.props.contractDetails.poType === 'XN') : false)} /></div>)
            : ''}
        </div>
      </div>
    )
  }
}

ContractDetails_.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectContractDetails();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetails_);
