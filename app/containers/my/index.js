import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Navigator,
} from 'react-native';

import { List, SearchBar, Tabs, Grid } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectMy from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

class My extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      current: "1",
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
    }]

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <Text style={[commonStyle.headerTitle]} numberOfLines={1}>我的</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Grid hasLine={true} data={data} columnNum={3} renderItem={(el , index) => {
              return (
                <View style={{ flex:1, flexDirection:'column', justifyContent:'center', alignItems: 'center' }}>
                  <Icon name={el.icon} size={24}></Icon>
                  <Text>{el.text}</Text>
                </View>
              );
            }}/>
          </View>
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
