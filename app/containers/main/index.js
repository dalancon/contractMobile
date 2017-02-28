/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { PropTypes, Component } from 'react';
import {   
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator, } from 'react-native';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
// import Icon from 'react-native-vector-icons/Ionicons';

import { TabBar, Icon, SearchBar }from 'antd-mobile'; 

// import { TabBarItem } from 'antd-mobile/lib/tab-bar/TabBarItem';

import LoginPage from '../login';
import makeSelectMainPage from './selectors';
import commonStyle from '../styles';

import { setTab } from './actions';

import TodoPage from '../todo';
import ExaminePayment from '../examinePayment';
import ViewContract from '../viewContract';
import Concern from '../concern';
import My from '../my';

class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    }
  }

  toLogin(){
    let {router} = this.props;
    router.resetToLogin();
  }

  renderScene = (title) => {

    switch (title) {
      case 'Todo Scence':
        return <TodoPage router={this.props.router} />;
      case 'Contract Scence':
        return <ViewContract router={this.props.router} />;
      case 'Concern Scence':
        return <Concern router={this.props.router} />;
      default:
        return (
          <View style={{ backgroundColor: 'white', flex: 1 }}><Text>123</Text></View>
        );
    }
  }




  render() {
    let {user} = this.props;
    return (
      <View style={[commonStyle.wrapper]}>
        <View  style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }} >

          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={false}
          >
            <TabBar.Item
              title="待办"
              key="todo"
              icon={require('../../public/imgs/ios7-calendar-outline.png')}
              selectedIcon={require('../../public/imgs/ios7-calendar.png')}
              selected={this.props.current === 'todo'}
              badge={2}
              onPress={() => {
                this.props.dispatch(setTab('todo'));
              }}
              data-seed="logId"
            >
              <TodoPage router={this.props.router} />
            </TabBar.Item>
            <TabBar.Item
              title="合同"
              key="contract"
              icon={require('../../public/imgs/ios7-paper-outline.png')}
              selectedIcon={require('../../public/imgs/ios7-paper.png')}
              selected={this.props.current === 'contract'}
              onPress={() => {
                this.props.dispatch(setTab('contract'));
              }}
              data-seed="logId"
            >
              <ViewContract router={this.props.router} />
            </TabBar.Item>
            <TabBar.Item
              title="关注"
              key="concern"
              icon={require('../../public/imgs/ios7-eye-outline.png')}
              selectedIcon={require('../../public/imgs/eye.png')}
              selected={this.props.current === 'concern'}
              onPress={() => {
                this.props.dispatch(setTab('concern'));
              }}
              data-seed="logId"
            >
              <Concern router={this.props.router} />
            </TabBar.Item>
            <TabBar.Item
              title="我的"
              key="my"
              icon={require('../../public/imgs/ios7-person-outline.png')}
              selectedIcon={require('../../public/imgs/ios7-person.png')}
              selected={this.props.current === 'my'}
              onPress={() => {
                this.props.dispatch(setTab('my'));
              }}
              data-seed="logId"
            >
              <My router={this.props.router} />
            </TabBar.Item>
          </TabBar>
        </View>
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
