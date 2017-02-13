import React from 'react'
import formatter from 'utils/formatter.js'

/** 流转历史列表*/
class TaskHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.arrayOf(React.PropTypes.shape({
      assignee: React.PropTypes.string,
      comment: React.PropTypes.string,
      taskName: React.PropTypes.string,
      startTime: React.PropTypes.number,
      endTime: React.PropTypes.number
    })),
    loaded: React.PropTypes.bool
  }

  render () {
    return (
      <div className='table-responsive' style={{position: 'relative'}}>
        <div className={this.props.loaded ? '' : 'hidden'}>
          {
            this.props.history.length > 0 ? (
              <table className='table table-striped table-hover'>
                <thead>
                  <tr>
                    <th style={{width: '10%'}}>处理人</th>
                    <th style={{minWidth: '15em', width: '30%'}}>处理意见</th>
                    <th style={{minWidth: '10em', width: '20%'}}>任务名</th>
                    <th style={{width: '15%'}}>开始时间</th>
                    <th style={{width: '15%'}}>结束时间</th>
                  </tr>
                </thead>
                <tbody>
                {
                  this.props.history.map((x, i) => (
                    <tr key={i}>
                      <td>{x.assignee}</td>
                      <td style={{whiteSpace: 'normal', textAlign: 'left'}}>{x.comment ? x.comment : '-'}</td>
                      <td style={{whiteSpace: 'normal'}}>{x.taskName}</td>
                      <td>{formatter.formatTime(x.startTime)}</td>
                      <td>{x.endTime ? formatter.formatTime(x.endTime) : '-'}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>) : (<span>空</span>)
          }
        </div>
        <div style={{height: '200px'}} className={this.props.loaded ? 'hidden' : 'payment-mask'} />
      </div>
    )
  }
}

export default TaskHistory
