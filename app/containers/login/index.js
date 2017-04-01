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
  ScrollView,
  Platform,
  Image,
  AlertIOS,
  AsyncStorage,
  Keyboard,
  StatusBar,
  Dimensions,
  findNodeHandle,
} from 'react-native';

import { connect } from 'react-redux';
import ModalBox from 'react-native-modalbox';
import Spinner from 'react-native-spinkit';
import { loginAction, skipLogin, clearMessage, fetchUser } from './actions';

import commonStyle from '../styles';
import loginStyle from './styles';

class LoginPage extends Component{
  constructor(props, context) {
    super(props, context); 

    this.state = {
      init: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('oaAccount', (err, oaAccount) => {
      let initialRoute = {
        name: 'login-page',
        page: LoginPage,
      };

      setTimeout(function () {
        this.setState({
          init: true
        })
      }.bind(this), 500);

      if(oaAccount) {
        this.props.router.toMain({
          logined: false,
          oaAccount: oaAccount
        })
      }

    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.success === true && this.props.success !== true){
      Toast.hide();
      const oaAccount = nextProps.form.getFieldsValue().uid;
      AsyncStorage.setItem('oaAccount', oaAccount);
      this.props.router.toMain({
        logined: true,
        oaAccount: oaAccount,
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
    Keyboard.dismiss();
    const url = this.genertateOaSsoUrl(this.props.form.getFieldsValue().uid);
    this.props.dispatch(loginAction(url));
  }

  _reset() {
    this.refs.scrollView.scrollTo({ y: 0 });
  }

  _onFocus(refName) {
    let scrollResponder = this.refs.scrollView.getScrollResponder();      
    setTimeout(()=> {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        100, 
        true);
    }, 100);
  }

  render(){
    const { getFieldProps } = this.props.form;
    var cell_w = Dimensions.get('window').width;

    if(!this.state.init) {
      return (<View style={{ flex:1 , backgroundColor:'#FFF', opacity:1 }}></View>)
    }

    return (
      // <View style={{ flex:1 , backgroundColor:'#F5FCFF', opacity:1 }}>
       
      //   <View style={{ flex:1 }}>
          <ScrollView
            ref="scrollView"
            style={{ backgroundColor: 'yellow',backgroundColor:'#F5FCFF', opacity:1, }}
            scrollEnabled={false}
            automaticallyAdjustContentInsets={true}>
            <StatusBar
              backgroundColor="blue"
              barStyle="dark-content"
            />
            <View style={{
              flex:1,
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
              <Image style={{ margin:40, width: 60, height:60, backgroundColor:'transparent', borderRadius:30 }} source={require('../../public/imgs/logo.jpg')}></Image>
              <View ref='uid' style={{ width:cell_w, backgroundColor:'#FFF' , height:100 }}>
                <InputItem
                  {...getFieldProps('uid')}
                  clear
                  placeholder="输入OA账号"
                  autoCapitalize="none"
                  onFocus={this._onFocus.bind(this, 'uid')}
                  onBlur={this._reset.bind(this)}
                ></InputItem>
                <InputItem
                  clear
                  placeholder="密码"
                  type="password"
                ></InputItem>
              </View>
              <View style={{ width:cell_w, padding: 10 }}>
                <Button className="btn" type="primary" onClick={this.handleLogin}>登陆</Button>
                <View style={{ margin: 10, flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>忘记密码</Text>
                  <Text>新用户申请</Text>
                </View>
              </View>
            </View>          
          </ScrollView>
      //   </View>
      //   <View style={{ flex:1 }}></View>
      // </View>
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
