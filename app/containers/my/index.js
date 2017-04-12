import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TouchableOpacity,
  Image,
  Navigator,
  AsyncStorage,
  StatusBar,
} from 'react-native';

import { List, SearchBar, Tabs, Grid, Modal } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectMy from './selectors';
import formatter from '../../utils/formatter';
import database from '../../database';

import commonStyle from '../styles';

import { loginOut } from '../login/actions';
import { loginOut as loginOutMain } from '../main/actions';

class My extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      current: "1",
    }
  }

  _toScence = (index) => {
    switch(index) {
      case 0:
        this.props.router.toPassTask();
        return;
      case 1:
        this.props.router.toHistoryTask();
        return;
      case 2:
        this.props.router.toParticipantTask();
        return;
      default:
        return;
    }
  }

  render() {

    const data = [{
      icon: 'ios-list-box-outline',
      text: '经办事项',
    }, {
      icon: 'ios-list-box-outline',
      text: '办结事项',
    }, {
      icon: 'ios-eye',
      text: '关注事项',
    }, {
      icon: 'ios-basket-outline',
      text: '草稿箱',
    },{
      icon: 'ios-exit-outline',
      text: '退出'
    }];

    const alert = Modal.alert;

    return (
      <View style={[commonStyle.wrapper]}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <View style={[commonStyle.header]}>
          <Text style={[commonStyle.headerTitle]} numberOfLines={1}>我的</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Grid hasLine={true} data={data} columnNum={3} renderItem={(el , index) => {
            return (
              <View style={{ flex:1, flexDirection:'column', justifyContent:'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={ 
                  () => {
                    if(el.text !== '退出') {
                      if(index == 0){
                        this.props.router.toPassTask();
                      }else if(index == 1){
                        this.props.router.toHistoryTask();
                      }else if(index == 2) {
                        this.props.router.toParticipantTask();
                      }
                      //this._toScence(index); 
                    } else {
                      alert('退出', '确定退出么?', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => {
                          AsyncStorage.removeItem('oaAccount', function (){
                            this.props.dispatch(loginOut());
                            this.props.dispatch(loginOutMain());
                            this.props.router.pop();
                          }.bind(this));
                        }}])
                    }
                  }
                }>
                  <View style={{ alignItems: 'center' , paddingTop:5, paddingBottom:5, paddingRight:5, paddingLeft:5 }}>
                    <Icon name={el.icon} size={32}></Icon>
                    <Text>{el.text}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}/>
        </View>
      </View> 
    );
  }
}

My.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectMy();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(My);
