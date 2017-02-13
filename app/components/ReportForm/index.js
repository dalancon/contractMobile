import React from 'react';
import ReportFormPayment from 'components/ReportFormPayment';
import ReportFormGuarantee from 'components/ReportFormGuarantee';
import './style.scss';

import { fetchReportCode } from 'apis/report';
import { fetchReportOpinions } from 'apis/opinion';

/** 打印报表的表单*/
class ReportFrom extends React.Component {
  static propTypes = {
    processDefinitionId: React.PropTypes.string.isRequired,
    businessId: React.PropTypes.string.isRequired,
    reportType: React.PropTypes.string.isRequired,
    onClickCancel: React.PropTypes.func.isRequired,
    onReport: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      // isOpinionsLoaded: false,
      validStatus: false,
      opinions: [],
      reportCode: [],
    };
  }

  componentDidMount() {
    const component = this;
    fetchReportCode()
      .then((response) => response.json())
      .then((result) => {
        component.setState({
          reportCode: result.rows,
        });
      });

    component.setState({
      isOpinionsLoaded: false,
    });

    fetchReportOpinions(this.props.businessId, this.props.processDefinitionId)
      .then((response) => response.json())
      .then((result) => {
        component.setState({
          opinions: result,
          isOpinionsLoaded: true,
        });
      });
  }

  // componentWillReceiveProps(nextProps) {
  //   const component = this;
  //   console.log('componentWillReceiveProps:', nextProps);
  //   if (nextProps.businessId !== this.props.businessId || nextProps.processDefinitionId !== this.props.processDefinitionId) {
     
  //   }
  // }

  chooseReportModel() {
    if (this.props.reportType === 'payment') {
      return (<ReportFormPayment loaded={this.state.isOpinionsLoaded} opinions={this.state.opinions}
        onReport={this.props.onReport} onClickCancel={this.props.onClickCancel} reportCode={this.state.reportCode}
        businessId={this.props.businessId} />);
    } else if (this.props.reportType === 'guarantee') {
      return (<ReportFormGuarantee loaded={this.state.isOpinionsLoaded} opinions={this.state.opinions}
        onReport={this.props.onReport} onClickCancel={this.props.onClickCancel} reportCode={this.state.reportCode}
        businessId={this.props.businessId} />);
    } else {
      return (<div />);
    }
  }

  render() {
    return (
      <div className='report-form'>
        {
          this.chooseReportModel()
        }
      </div>
    );
  }
}

ReportFrom.defaultProps = {};

export default ReportFrom;
