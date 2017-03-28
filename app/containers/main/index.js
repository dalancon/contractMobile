import React, { PropTypes, Component } from 'react';
import {   
  StyleSheet,
  Text,
  View,
  Navigator,
  StatusBar, 
  Image, } from 'react-native';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import { TabBar, SearchBar }from 'antd-mobile'; 
import Icon from 'react-native-vector-icons/Ionicons';
import md5Hex from 'md5-hex';

import LoginPage from '../login';
import makeSelectMainPage from './selectors';
import commonStyle from '../styles';

import { defaultAction, setTab, fetchUser, loginAction } from './actions';

import TodoTask from '../todoTask';
import ExaminePayment from '../examinePayment';
import ViewContract from '../viewContract';
import My from '../my';

class MainPage extends Component {

  componentWillMount() {
    this.props.dispatch(defaultAction());
  }

  componentDidMount() {
    if(this.props.logined) {
      this.props.dispatch(fetchUser()); 
    } 

    if(!this.props.logined && this.props.oaAccount){
      this.props.dispatch(loginAction(this.genertateOaSsoUrl(this.props.oaAccount)))
    } 
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.logined && nextProps.logined) {
      this.props.dispatch(fetchUser()); 
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

  toLogin(){
    let {router} = this.props;
    router.resetToLogin();
  }

  render() {
    let {user} = this.props;
    console.log('main:', this.props);

    return (
      <View style={{ flex :1 }}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={this.props.hidden}
          >
            <TabBar.Item
              title="待办"
              key="todo"
              icon={require('../../public/imgs/ios7-calendar32.png')}
              selectedIcon={require('../../public/imgs/ios7-calendar32.png')}
              selected={this.props.current === 'todo'}
              onPress={() => {
                this.props.dispatch(setTab('todo'));
              }}
            >
              { this.props.logined ? (<TodoTask router={this.props.router} />) : (<View></View>)}
            </TabBar.Item>
            <TabBar.Item
              title="合同"
              key="contract"
              icon={require('../../public/imgs/ios7-paper32.png')}
              selectedIcon={require('../../public/imgs/ios7-paper32.png')}
              selected={this.props.current === 'contract'}
              onPress={() => {
                this.props.dispatch(setTab('contract'));
              }}
            >
              { this.props.logined ? (<ViewContract router={this.props.router} />) : (<View></View>) }
            </TabBar.Item>
            <TabBar.Item
              title="我的"
              key="my"
              icon={require('../../public/imgs/ios7-person32.png')}
              selectedIcon={require('../../public/imgs/ios7-person32.png')}
              selected={this.props.current === 'my'}
              onPress={() => {
                this.props.dispatch(setTab('my'));
              }}
            >
              { this.props.logined ? (<My router={this.props.router} />) : (<View></View>) }
            </TabBar.Item>
          </TabBar>
      </View> 
    );

  }

  handlePress(){
    console.log('handlePress');

  }

  handleAsyncPress(){
    console.log('asyncPress');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


MainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectMainPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
