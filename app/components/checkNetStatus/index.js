import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

var cell_w = Dimensions.get('window').width;
var styles = StyleSheet.create({
    header: {
      backgroundColor:'#108ee9',
      paddingBottom:16,
      paddingTop:28,
    },
    headerTitle: {
      color: '#FFF',
      fontSize: 20,
      textAlign: 'center',
      fontWeight: '600',
    },
    headerRightIcon: {
      zIndex:1,
      position:'absolute',
      right:18, 
      top:28, 
      flexDirection: 'row', 
      alignItems:'center',
      paddingTop: 2,
      paddingBottom: 2,
      paddingRight: 2,
      paddingLeft: 2,
      backgroundColor:'#108ee9',
    },
    headerLeftIcon: {
      zIndex:1,
      position:'absolute',
      left:18,
      top:24,
      flexDirection: 'row',
      alignItems:'center',
      paddingTop: 2,
      paddingBottom: 2,
      paddingRight: 2,
      paddingLeft: 2,
      backgroundColor:'#108ee9'
    },
    wrapper: {
      flex: 1,
      backgroundColor: '#EEE',
    }});

class CheckNetStatus extends Component {
  _back = () => {
    this.props.router.pop();
  }

  render() {
    console.log(this.props);

    return (
      <View style={[styles.wrapper]}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <TouchableOpacity style={[ styles.headerLeftIcon ]} onPress={this._back}>
          <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
        </TouchableOpacity>
        <View style={[styles.header]}>
          <Text style={[styles.headerTitle]}>请检查网络设置</Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, padding:10 }}>
            请在公司内网中使用该应用
          </Text>
        </View>
      </View>
    );
  }
}

export default CheckNetStatus;
