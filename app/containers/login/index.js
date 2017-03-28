'use strict';
import React, { PropTypes, Component } from 'react';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';

import { 
  Button,
  Toast,
  InputItem,
} from 'antd-mobile';

import { createForm } from 'rc-form';
import md5Hex from 'md5-hex';

import {
  Text,
  View,
  Platform,
  Image,
  AlertIOS,
  AsyncStorage,
} from 'react-native';

import {connect} from 'react-redux';

import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import { loginAction, skipLogin, clearMessage, fetchUser } from './actions';

import commonStyle from '../styles';
import loginStyle from './styles';

class LoginPage extends Component{

  componentWillReceiveProps(nextProps) {
    if(nextProps.success === true && this.props.success !== true){
      Toast.hide();
      console.log('uid', nextProps.form.getFieldsValue().uid);
      AsyncStorage.setItem('oaAccount',  nextProps.form.getFieldsValue().uid);
      this.props.router.toMain({
        logined: true
      });
    } else {
      if(nextProps.message !== '') {
        setTimeout(function (){
          Toast.fail(nextProps.message, 1, () => {
            this.props.dispatch(clearMessage());
          });
        }.bind(this), 1000)
        
      }
    }

    if(nextProps.logining && !this.props.logining) {
      Toast.loading('登录中...', 0);
    } 
  }

  genertateOaSsoUrl(oaAccount) {
    const uid = oaAccount;
    // const uid = 'ye_menglin';
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
    const url = '/qdp/qdp/login/sso/oa?uid=' + uid + '&pid=' + pid + '&ruid=' + ruid;
    return url;
  }

  handleLogin = () => {
    const url = this.genertateOaSsoUrl(this.props.form.getFieldsValue().uid);
    this.props.dispatch(loginAction(url));
  }

  render(){
    const { getFieldProps } = this.props.form;

    return (
      <View style={{ flex:1 , backgroundColor:'#F5FCFF', opacity:1 }}>
        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image style={{ width: 60, height:60, backgroundColor:'transparent', borderRadius:30 }} source={require('../../public/imgs/logo.jpg')}></Image>
        </View>
        <View style={{ backgroundColor:'#FFF' , flex:1 }}>
          <InputItem
            {...getFieldProps('uid')}
            clear
            placeholder="输入OA账号"
            autoCapitalize="none"
          ></InputItem>
          <InputItem
            clear
            placeholder="密码"
            type="password"
          ></InputItem>
        </View>
        <View style={{ margin: 10 }}>
           <Button className="btn" type="primary" onClick={this.handleLogin}>登陆</Button>
        </View>
        <View style={{ margin: 10, flex:3, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>忘记密码</Text>
          <Text>新用户申请</Text>
        </View>
      </View>
    );
  }
}


LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectLoginPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(LoginPage));
