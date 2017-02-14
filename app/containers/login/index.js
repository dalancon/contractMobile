'use strict';
import React, { Component } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

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
  constructor(props){
      super(props);
      this.state = {
          username: 'sup1',
          password: '123456',
          btnFlag: true,
      };
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
    router.toMain();
  }

  handleLogin(){
    if(!this.state.username || !this.state.password){
        AlertIOS.alert(
             'username, password?'
        );
        return;
    }
    let opt = {
        'name': this.state.username,
        'password': this.state.password,
    };
    this.props.dispatch(logIn(opt));
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

        //   <Image source={require('../../public/imgs/icons/bg.png')} resizeMode={Image.resizeMode.stretch}>
        //   <View style={loginStyle.loginMain}>
        //     <View style={loginStyle.loginMainCon}>
        //       <View style={loginStyle.comCulture}>
        //         <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>Welcome</Text>
        //         <Text style={[commonStyle.textCenter,{color:'#ccc'}]}>You are the best.</Text>
        //       </View>
        //       <View style={loginStyle.formStyle}>
        //         <View style={[loginStyle.formInput,loginStyle.formInputSplit]}>
        //           <Image source={require('../../public/imgs/icons/user.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
        //           <TextInput 
        //             ref="login_name" 
        //             placeholder='username' 
        //             style={loginStyle.loginInput} 
        //             onChangeText={this.onChangeName.bind(this)} />
        //         </View>
        //         <View style={loginStyle.formInput}>
        //           <Image source={require('../../public/imgs/icons/passicon.png')} style={{width:25,height:25,resizeMode: 'contain'}}/>
        //           <TextInput 
        //             ref="login_psw"  
        //             style={loginStyle.loginInput} 
        //             secureTextEntry={true}
        //             placeholder='password' 
        //             onChangeText={this.onChangePswd.bind(this)} />
        //         </View>
        //         <View style={{alignItems: 'flex-end'}}>
        //           <View style={loginStyle.forget}>
        //           <View>
        //             <Image source={require('../../public/imgs/icons/prompt.png')} style={{width:15,height:15,resizeMode: 'contain',marginRight:10}}/>
        //           </View>
        //           <View >
        //             <Text style={{color:'#62a2e0', backgroundColor: 'white'}}>forget password?</Text>
        //           </View>
        //           </View>
        //         </View>
        //       </View>
        //       <View style={loginStyle.btn}>
        //         <View style={loginStyle.btnWrap}>
        //           <Text style={loginStyle.loginBtn1} onPress={this.handleLogin.bind(this)}>Log in</Text>
        //         </View>
        //         <View style={loginStyle.btnWrap}>
        //           <Text style={loginStyle.loginBtn2} onPress={this.handleRegister.bind(this)}>Skip</Text>
        //         </View>
        //       </View>
        //     </View>
        //   </View>
        // </Image>

        // <ModalBox style={[commonStyle.modal,commonStyle.justAlign]} 
        //   ref={"modal"} backdropPressToClose={false} 
        //   animationDuration={10}
        //   backdrop={true}
        //   backdropOpacity={0}
        // >
        //   <Spinner style={commonStyle.spinner} 
        //       isVisible={true} 
        //       size={50} type="Arc" color="#FFFFFF"/>
        // </ModalBox>

  render(){
    console.log('login:', this.props);
    console.log('commonStyle:', commonStyle);
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
         <WingBlank size="lg">
    <WhiteSpace size="lg" />
    <Card>
      <Card.Header
        title="这是 title"
        thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
        extra={<span>this is extra</span>}
      />
      <Card.Body>
        <div>这是卡片内容</div>
      </Card.Body>
      <Card.Footer content="这是卡尾" extra={<div>这是尾部介绍</div>} />
    </Card>
    <WhiteSpace size="lg" />
  </WingBlank>
        </View>
        <View style={{ backgroundColor:'#FFF' , flex:1 }}>
          <Text>3</Text>
        </View>
        <View style={{ backgroundColor:'#FFF' , flex:3 }}>
          <Text>4</Text>
        </View>
      </View>
    );
  }
}



function select(store){
  return {
    isLoggedIn: store.userStore.isLoggedIn,
    user: store.userStore.user,
    status: store.userStore.status,
  }
}


export default connect(select)(LoginPage);


