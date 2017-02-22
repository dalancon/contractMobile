'use strict';
import React, { PropTypes, Component } from 'react';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import { Button } from 'antd-mobile';
// import Button from 'antd-mobile/lib/button';
// import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import InputItem from 'antd-mobile/lib/input-item';

import {
  Text,
  View,
  Platform,
  TextInput,
  Image,
  AlertIOS,
} from 'react-native';

import {connect} from 'react-redux';

import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';

import { logIn, skipLogin } from './actions';

import commonStyle from '../styles';
import loginStyle from './styles';

class LoginPage extends Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     username: 'sup1',
  //     password: '123456',
  //     btnFlag: true,
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    console.log("LoginPage-componentWillReceiveProps:", nextProps);
    if(nextProps.success === true && this.props.success !== true){
      this.toMain();
      return false;
    }
  }

  toMain() {
    let {router} = this.props;
    console.log('toMain');
    router.toMain();
  }


  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === true){
        //will redirect
        
        this.refs.modal.close();
        this.toMain();
        return false;
    }
    if(nextProps.status == 'doing'){
        //loggining
        this.refs.modal.open();
        return false;
    }
    if(nextProps.status == 'error' || nextProps.status == 'done'){
        this.refs.modal.close();
        return false;
    }

    return true;
  }

  toMain(){
    const {router} = this.props;
    router.toExamine();
  }

  handleLogin = ()=>{
    this.props.dispatch(logIn());
  }

  handleRegister(){
    const {dispatch} = this.props;
    dispatch(skipLogin());
  }

  onChangeName(text){
    this.setState({'username': text});
  }

  onChangePswd(text){
    this.setState({'password': text});
  }

  render(){
    console.log('login:', this.props);
    return (
      <View style={[commonStyle.wrapper, loginStyle.loginWrap]}>
        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image source={require('../../public/imgs/sxlogo.png')}></Image>
        </View>
        <View style={{ backgroundColor:'#FFF' , flex:1 }}>
          <InputItem
            clear
            placeholder="输入OA账号"
          ></InputItem>
          <InputItem
            clear
            placeholder="密码"
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
