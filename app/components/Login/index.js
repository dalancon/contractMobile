import React from 'react';
import './style.scss';

/** 登录界面*/
class Login extends React.Component {

  static propTypes = {
    users: React.PropTypes.arrayOf(React.PropTypes.shape({
      oaAccount: React.PropTypes.string,
      userName: React.PropTypes.string,
      position: React.PropTypes.string,
    })),
    logining: React.PropTypes.bool,
    handleLogin: React.PropTypes.func,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogin(this.refs.account.value);
  }

  render() {
    return (
      <form className='container-fluid form-horizontal payment-login-form' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <div className='col-md-12'>
            <div className='ctg-logo' style={{display: 'inline-block'}} />
            <span className='payment-login-title'>合同支付审签系统</span>
          </div>
        </div>
        <div className='form-group payment-login-form-body'>
          <div className='col-md-12'>
            <select ref='account' className='form-control'>
              {
                ['请选择账号...'].concat(this.props.users).map(function (x, index) {
                  if (x.oaAccount) {
                    return (
                      <option key={index} value={x.oaAccount}>
                        {x.userName}({x.oaAccount}) {x.position}
                      </option>)
                  } else {
                    return (<option key={index}>{x}</option>)
                  }
                })
              }
            </select>
          </div>
          <div className='col-md-12'>
            <button disabled={this.props.logining} className='btn btn-primary' style={{width: '100%'}}>{ this.props.logining ? '登录中。。。' : '登录' }</button>
          </div>
        </div>
      </form>
    )
  }
}

export default Login
