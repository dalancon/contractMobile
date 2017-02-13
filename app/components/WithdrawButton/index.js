import React from 'react';

/** 撤回按钮*/
class WithdrawButton extends React.Component {
  static propTypes = {
    taskId: React.PropTypes.string.isRequired,
    withdrawUrl: React.PropTypes.string.isRequired,
  }

  onClick = (e) => {
    e.preventDefault();
    swal({
      title: '警告',
      text: '确定要撤回该任务么？',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#428bca',
      confirmButtonText: '继续',
      cancelButtonText: '取消',
      closeOnConfirm: false },
        function (isConfirm) {
          if (isConfirm) {
            $.ajax({
              cache: true,
              type: 'post',
              url: this.props.withdrawUrl,
              data: { taskId: this.props.taskId },
              async: true,
              datatType: 'json',
              success: function (success) {
                if (success === true) {
                  swal({
                    title: '撤回成功',
                    text: '点击回到待办事项',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#428bca',
                    confirmButtonText: '确认',
                    closeOnConfirm: true},
                    function (isConfirm2) {
                      if (isConfirm2) {
                        location.href = '/taskManage/todoTask';
                      }
                    });
                } else {
                  swal({
                    title: '撤回不成功',
                    text: '发生错误',
                    type: 'warning',
                    showCancelButton: false,
                    closeOnConfirm: true,
                    confirmButtonText: '确认',
                  });
                }
              },
            });
          }
        }.bind(this));
  }

  render() {
    return (
      <button type="button" className="btn btn-default payment-button" onClick={this.onClick}>撤回</button>
    );
  }
}

export default WithdrawButton;
