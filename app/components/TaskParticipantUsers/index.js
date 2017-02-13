import React from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { queryUser } from 'apis/common'

/** 流程参与人*/
class TaskParticipateUsers extends React.Component {
  static propTypes = {
    processInstanceId: React.PropTypes.string
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      users: [],
      loaded: false
    }
  }

  componentDidMount () {
    this.fecthParticipantUser()
  }

  fecthParticipantUser () {
    if (this.props.processInstanceId) {
      this.serverRequest = $.get('/qdp/qdp/payment/bpm/task/participantUsers',
      {processInstanceId: this.props.processInstanceId}, function (result) {
        this.setState({
          users: result,
          loaded: true
        })
      }.bind(this))
    } else {
      this.setState({
        loaded: true
      })
    }
  }

  selectUsers = (val) => {
    var users = val.map(function (x) { return {userName: x.label, id: x.value} })
    this.setState({users: users})
  }

  getOptions = (input) => {
    return queryUser(input)
    .then((response) => {
      return response.json();
    }).then((result) => {
      const defaultUser = this.state.users.map(function (x) { return {label: x.userName, value: x.id} })
      const data = result.map(function (x, i) { return {value: x.USER_ID, label: x.USER_NAME} }).concat(defaultUser);
      return { options: data };
    });
  }

  // getOptions = (input, callback) => {
  //   $.post('/qdp/qdp/qdp/userGroup/query.do', {q: input}, function (result) {
  //     var defaultUser = this.state.users.map(function (x) { return {label: x.userName, value: x.id} })
  //     var data = result.map(function (x, i) { return {value: x.USER_ID, label: x.USER_NAME} }).concat(defaultUser)
  //     callback(null, {
  //       options: data,
  //       complete: true,
  //       cache: false
  //     })
  //   }.bind(this))
  // }

  render () {
    if (this.state.loaded) {
      return (
        <Select.Async placeholder='请输入人员姓名' loadOptions={this.getOptions} cache={false}
          value={this.state.users.map((x) => x.id)} name='participantUsers'
          ref='participantUsers' multi onChange={this.selectUsers} />
      )
    } else {
      return (<div style={{height: '2em'}} className={this.state.loaded ? 'hidden' : 'payment-mask'} />)
    }
  }
}

export default TaskParticipateUsers
