import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

import { Modal } from 'react-bootstrap'
import FlowDiagram from 'components/FlowDiagram'
import TaskParticipantUsers from 'components/TaskParticipantUsers'

import TaskOpinion from '../TaskOpinion'
import './style.scss'

class TaskApplyForm extends React.Component {
  static propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      userName: React.PropTypes.string
    })),
    appName: React.PropTypes.string,
    businessId: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    AfterSubmit: React.PropTypes.func
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      user: props.users ? props.users[0] : {},
      showFlowDiagram: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.users !== nextProps.users) {
      this.setState({
        user: nextProps.users[0]
      })
    }
  }

  hideFlowDiagram = () => {
    this.setState({showFlowDiagram: false})
  }

  showFlowDiagram = () => {
    this.setState({showFlowDiagram: true})
  }

  changeUser = (option) => {
    this.setState({
      user: {id: option.value, userName: option.label}
    })
  }

  submitForm () {
    this.serverRequest = $.post('/qdp/payment/bpm/task/start',
      {appName: this.props.appName,
       businessId: this.props.businessId,
       userId: this.state.user.id,
       comment: this.refs.taskOpinion.refs.opinion.value,
       participantUsers: this.refs.pU.state.users.map((x) => x.id).join(',')}, function (result) {
         if (this.props.AfterSubmit) {
           this.props.AfterSubmit(result)
         }
       }.bind(this))
  }

  onClickSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.user, this.refs.taskOpinion.refs.opinion.value)
    } else {
      this.submitForm()
    }
  }

  render () {
    // console.log(this.state.user)
    var options = (this.props.users && this.props.users.map((u) => {
      return { label: u.userName, value: u.id }
    })) || null
    return (
      <div className='panel panel-default task-apply-form'>
        <div className='panel-body'>
          <div className='form-horizontal'>
            <div className='form-group'>
              <label className='col-md-2 control-label'>下一环节处理人：</label>
              <div className='col-md-10' ref='nextStepUserContainer' >
                <div style={{width: '300px'}}>
                  <Select options={options} value={this.state.user ? this.state.user.id : ''}
                    onChange={this.changeUser} />
                </div>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='opinion' className='col-md-2 control-label'>处理意见：</label>
              <div className='col-md-8'>
                <TaskOpinion ref='taskOpinion' />
              </div>
            </div>
            <div className='form-group'>
              <label className='col-md-2 control-label'>流程关注人：</label>
              <div className='col-md-8'>
                <TaskParticipantUsers ref='pU' />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-3 col-md-offset-3'>
                <button ref='submitBtn' type='button' className='btn btn-default payment-button'
                  onClick={this.onClickSubmit}>提交申请单</button>
              </div>
              <div className='col-md-3'>
                <button type='button' className='btn btn-default payment-button'
                  onClick={this.showFlowDiagram}>查看流程图</button>
              </div>
            </div>
          </div>
        </div>
        <Modal bsSize='large' show={this.state.showFlowDiagram} onHide={this.hideFlowDiagram}>
          <Modal.Header closeButton>
            <Modal.Title>流程图</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FlowDiagram appName={this.props.appName} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default TaskApplyForm
