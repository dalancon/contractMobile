import React, { PropTypes, Component } from 'react';
import {   
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator, } from 'react-native';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import { TabBar, Icon, SearchBar }from 'antd-mobile'; 

import LoginPage from '../login';
import makeSelectMainPage from './selectors';
import commonStyle from '../styles';

import { setTab, fetchUser, } from './actions';

import TodoTask from '../todoTask';
import ExaminePayment from '../examinePayment';
import ViewContract from '../viewContract';
import Task from '../task';
import My from '../my';

class MainPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchUser());  
  }

  toLogin(){
    let {router} = this.props;
    router.resetToLogin();
  }

  renderScene = (title) => {
    switch (title) {
      case 'Todo Scence':
        return <TodoTask router={this.props.router} />;
      case 'Contract Scence':
        return <ViewContract router={this.props.router} />;
      case 'Task Scence':
        return <Task router={this.props.router} />;
      default:
        return (
          <View style={{ backgroundColor: 'white', flex: 1 }}><Text>123</Text></View>
        );
    }
  }

  render() {
    let {user} = this.props;
    console.log('main', this.props);

    return (

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
          >
            <TodoTask router={this.props.router} />
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
          >
            <ViewContract router={this.props.router} />
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
          >
            <My router={this.props.router} />
          </TabBar.Item>
        </TabBar>    );

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
