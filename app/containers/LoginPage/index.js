/*
 *
 * LoginPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoginPage, makeSelectLoginUsers, makeSelectLogining, makeSelectLogin } from './selectors';
import messages from './messages';
import LoginForm from 'components/Login';
import md5Hex from 'md5-hex';

import {
  loginAction,
} from './actions';

import './styles.scss';

export class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      const { location } = this.props;
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname);
      } else {
        this.props.router.replace('/contract');   // 默认跳转页面
      }
    }
  }

  genertateOaSsoUrl(oaAccount) {
    const uid = oaAccount;
    // 获取当前日期 yyyyMMdd
    let today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    let date = today.getDate();
    if (date < 10) {
      date = '0' + date;
    }
    today = '' + year + month + date;
    const prefix = 'oa123qwe!';
    const suffix = '###';
    let pid = prefix + today + uid + suffix;
    pid = md5Hex(pid);
    let ruid = 'todo';
    ruid = md5Hex(ruid);
    // const ip = 'http://192.168.16.216:8888';
    // const ip = 'http://127.0.0.1:8080';
    const url = '/qdp/qdp/login/sso/oa?uid=' + uid + '&pid=' + pid + '&ruid=' + ruid;
    return url;
  }

  login = (value) => {
    // debugger;
    const url = this.genertateOaSsoUrl(value);
    this.props.dispatch(loginAction(url));
  }

  render() {
    console.log('props', this.props);

    return (
      <div className="login-container">
        <LoginForm styles={{ width: '35em' }} users={this.props.users} logining={this.props.logining} handleLogin={ this.login } />
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectLoginUsers(),
  logining: makeSelectLogining(),
  login: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
