import React from 'react';

/** 流程图显示MODAL*/
class FlowDiagram extends React.Component {
  static propTypes = {
    processDefinitionId: React.PropTypes.string,
    appName: React.PropTypes.string,
    processInstanceId: React.PropTypes.string,
    businessId: React.PropTypes.string,
  }

  createUrl() {
    return '/qdp/qdp/payment/bpm/flowDiagram?processDefinitionId=' + this.props.processDefinitionId +
      '&appName=' + this.props.appName + '&processInstanceId=' + this.props.processInstanceId +
      '&businessId=' + this.props.businessId;
  }

  render() {
    return (
      <img ref='diagramPic' className='img-responsive' src={this.createUrl()} />
    );
  }
}

FlowDiagram.defaultProps = {
  processDefinitionId: '',
  appName: '',
  processInstanceId: '',
  businessId: '',
};

export default FlowDiagram;
