import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import TaskOpinion from '../TaskOpinion'
import {Modal} from 'react-bootstrap'
import FlowDiagram from 'components/FlowDiagram'
import TaskParticipantUsers from 'components/TaskParticipantUsers'
import './style.scss'

class TaskHandleForm extends React.Component {
  static propTypes = {
    outGoing: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.string,
      name: React.PropTypes.string,
      assignee: React.PropTypes.arrayOf(React.PropTypes.string),
      users: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        userName: React.PropTypes.string
      }))
    })),
    showOutGoing: React.PropTypes.bool,
    processInstanceId: React.PropTypes.string,
    processDefinitionId: React.PropTypes.string,
    businessId: React.PropTypes.string,
    taskId: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    AfterSubmit: React.PropTypes.func
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      outGoingId: props && props.outGoing && props.outGoing[0] && props.outGoing[0].id,
      user: props && props.outGoing && props.outGoing[0] && props.outGoing[0].users[0],
      showFlowDiagram: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.outGoing !== this.props.outGoing && nextProps.outGoing.length != 0) {
      this.setState({
        outGoingId: nextProps.outGoing[0].id,
        user: nextProps.outGoing[0].users[0]
      })
    }
  }

  hideFlowDiagram = () => {
    this.setState({showFlowDiagram: false})
  }

  showFlowDiagram = () => {
    this.setState({showFlowDiagram: true})
  }

  changeOutGoing = (e) => {
    var outGoingId = e.target.value
    var user = this.props.outGoing.filter((x) => (x.id === outGoingId))[0].users[0]

    this.setState({
      outGoingId: outGoingId,
      user: user
    })
  }

  changeUser = (option) => {
    this.setState({
      user: {id: option.value, userName: option.label}
    })
  }

  onClickSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state.user, this.refs.taskOpinion.refs.opinion.value)
    } else {
      this.submitForm()
    }
  }

  submitForm () {
    // console.log('submitForm')
    this.serverRequest = $.post('/qdp/qdp/payment/bpm/task/complete',
      { outGoingId: this.state.outGoingId,
        processInstanceId: this.props.processInstanceId,
        taskId: this.props.taskId,
        businessId: this.props.businessId,
        userId: this.state.user.id,
        comment: this.refs.taskOpinion.refs.opinion.value,
        participantUsers: this.refs.pU.state.users.map((x) => x.id).join(',')
      }, function (result) {
        if (this.props.AfterSubmit) {
          this.props.AfterSubmit(result)
        }
      }.bind(this))

    // this.serverRequest = $.post('/qdp/payment/bpm/task/complete1',
    // {businessId:this.props.businessId}, function (result) {
    //   if(this.props.AfterSubmit){
    //     this.props.AfterSubmit(result)
    //   }
    // }.bind(this))
  }

  render () {
    var outGoingId = this.state.outGoingId;

    var options = (this.props.outGoing.length !== 0)
    ? this.props.outGoing.filter((x) => (x.id === outGoingId))[0].users.map(
      (u) => { return {label: u.userName, value: u.id} }
    )
    : null

    return (
      <div className='panel panel-default task-handle-form'>
        <div className='panel-body'>
          <div className='form-horizontal'>
            <div className={this.props.showOutGoing ? 'form-group' : 'hide'} >
              <label htmlFor='next' className='col-md-2 control-label'>下一环节：</label>
              <div className='col-md-10'>
              {
                this.props.outGoing.map((x, index) => (
                  <label key={index} className='radio-inline'>
                    <input type='radio' name='outGoingId' value={x.id}
                      onChange={this.changeOutGoing} checked={x.id === outGoingId} />{x.name}
                  </label>
                ))
              }
              </div>
            </div>
            <div className='form-group'>
              <label className='col-md-2 control-label'>下一环节处理人：</label>
              <div className='col-md-10' ref='nextStepUserContainer' >
                <div style={{width: '300px'}}>
                {
                  options ? (<Select name='userId' options={options} value={this.state.user.id}
                    onChange={this.changeUser} />) : (<div />)
                }
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
                <TaskParticipantUsers ref='pU' processInstanceId={this.props.processInstanceId} />
              </div>
            </div>
            <div className='form-group'>
              <div className='col-md-3 col-md-offset-3'>
                <button type='button' className='btn btn-default payment-button'
                  onClick={this.onClickSubmit}>
                  提交申请单
                </button>
              </div>
              <div className='col-md-3'>
                <button type='button' className='btn btn-default payment-button'
                  onClick={this.showFlowDiagram}>
                  查看流程图
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal bsSize='large' show={this.state.showFlowDiagram} onHide={this.hideFlowDiagram}>
          <Modal.Header closeButton>
            <Modal.Title>流程图</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FlowDiagram businessId={this.props.businessId} processDefinitionId={this.props.processDefinitionId}
              processInstanceId={this.props.processInstanceId} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default TaskHandleForm
