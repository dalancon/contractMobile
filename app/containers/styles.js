'use strict';
/**
 * @class StylesCommon
 * @desc 通用样式
 * */


var React   = require('react-native');
import {
  StyleSheet,
  PixelRatio,
  Dimensions,
} from 'react-native';
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
    },
    wrapper: {
      flex: 1,
      backgroundColor: 'white',
    },
    bgColor: {
        backgroundColor: '#F5FCFF'
    },
    iconBadge: {
      position:'absolute',
      top:0,
      right:0,
      width:6,
      height:6,
      borderRadius:3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF0000'
    },
    taskContainer: {
      flex:1,
      flexDirection:'row', 
      marginLeft:5,
      paddingTop:6,
      paddingBottom:6,
      borderBottomWidth:1,
      borderBottomColor: '#DDD',
    },
    taskHeader: {
      fontWeight:'700',
      fontSize:16, 
    },
    taskSubHeader: {
      fontSize:14,
      color:'#666'
    },
    taskTag: {
      paddingTop: 3,
      paddingBottom:3,
      borderRadius:3,
      marginRight:3,
      borderColor:'yellow',
    }
});
module.exports = styles;
