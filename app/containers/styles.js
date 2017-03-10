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
      top:30, 
      flexDirection: 'row', 
      alignItems:'center',
    },
    headerLeftIcon: {
      zIndex:1,
      position:'absolute',
      left:18,
      top:26,
      flexDirection: 'row',
      alignItems:'center', 
    },
    wrapper: {
        flex: 1,
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
      paddingTop:5,
      paddingBottom:5,
      borderBottomWidth:1,
      borderBottomColor: '#DDD',
    },
    taskHeader: {
      fontWeight:'700',
      fontSize:18, 
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
