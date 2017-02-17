/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { PropTypes, Component } from 'react';
import {   
  StyleSheet,
  Text,
  View,
  Navigator, } from 'react-native';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons';


import { TabBar } from 'antd-mobile'; 

// import { TabBarItem } from 'antd-mobile/lib/tab-bar/TabBarItem';

import makeSelectMainPage from './selectors';
import commonStyle from '../styles';

import { setTab } from './actions';


class MainPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'redTab',
      hidden: false,
    }
  }

  // shouldComponentUpdate(nextProps, nextState){
  //     if(nextProps.isLoggedIn != this.props.isLoggedIn && nextProps.isLoggedIn === false){
  //         //logout, need to redirect login page
  //         this.toLogin();
  //         return false;
  //     }
  //     return true;
  // }

  toLogin(){
      let {router} = this.props;
      router.resetToLogin();
  }

  renderContent(pageText) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ margin: 50 }}>{pageText}</Text>
        <Icon name="ios-person" size={30} color="#900" />
      </View>
    );
  }

  // renderContent(pageText) {
  //   return (
  //     <View style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
  //       <View style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</View>
  //       <a style={{ display: 'block', marginTop: 40 }} onClick={(e) => {
  //         e.preventDefault();
  //         this.setState({
  //           hidden: !this.state.hidden,
  //         });
  //       }}
  //       >
  //         点击切换 tab-bar 显示/隐藏
  //       </a>
  //     </View>
  //   );
  // },

  // _renderNavBar(){
  //     let {router, user, dispatch} = this.props;
  //     var leftButtonConfig = {
  //         title: 'Logout',
  //         handler: ()=>{
  //             // dispatch(logOut());
  //         }
  //     };

  //     var titleConfig = {
  //         title:  '',
  //     };
  //     return <NavigatorBar style={commonStyles.navbar}
  //                 title={titleConfig}
  //                 leftButton={leftButtonConfig}  />;
  // }

  render() {
    let {user} = this.props;
    console.log('mainPage:', this.props);

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
              key="待办"
              icon={<Icon name="ios-alarm" size={30} color="#900" />}
              selectedIcon={<Icon name="ios-alarm" size={30} color="#900" />}
              selected={this.props.current === 'todo'}
              onPress={() => {
                this.props.dispatch(setTab('todo'));
              }}
              data-seed="logId"
            >
              {this.renderContent('生活1 Tab')}
            </TabBar.Item>
            <TabBar.Item
              title="合同"
              key="合同"
              icon={require('../../public/imgs/search.png')}
              selectedIcon={require('../../public/imgs/search.png')}
              selected={this.props.current === 'contract'}
              onPress={() => {
                this.props.dispatch(setTab('contract'));
              }}
              data-seed="logId"
            >
              {this.renderContent('生活2 Tab')}
            </TabBar.Item>
            <TabBar.Item
              title="关注"
              key="关注"
              icon={require('../../public/imgs/sxlogo.png')}
              selectedIcon={require('../../public/imgs/sxlogo.png')}
              selected={this.props.current === 'concern'}
              onPress={() => {
                this.props.dispatch(setTab('concern'));
              }}
              data-seed="logId"
            >
              {this.renderContent('生活3 Tab')}
            </TabBar.Item>
            <TabBar.Item
              title="我的"
              key="我的"
              icon={require('../../public/imgs/sxlogo.png')}
              selectedIcon={require('../../public/imgs/sxlogo.png')}
              selected={this.props.current === 'my'}
              onPress={() => {
                this.props.dispatch(setTab('my'));
              }}
              data-seed="logId"
            >
              {this.renderContent('生活4 Tab')}
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
