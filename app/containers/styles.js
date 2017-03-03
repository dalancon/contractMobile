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
      paddingBottom:12,
      paddingTop:12,
    },
    headerTitle: {
      color: '#FFF',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: '600',
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
    }
});
module.exports = styles;
