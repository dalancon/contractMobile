import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Navigator, } from 'react-native';
import { TabBar, SearchBar, Tabs, Badge, WhiteSpace, Tag, Flex }from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectHistoryTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

const TabPane = TabBar.TabPane;

class HistoryTask extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      current: "1",
      dataSource: ds.cloneWithRows([{
        "new":true,
        "subject": "信息中心合同质保金—ICP201503122",
        "businessKey": "YC_TGPMS||ICP201503122||201607200857490147||e6571378f7964fbab303cc88b30facf1||GUARANTEE",
        "processDefinitionId": "guaranteeProcess:2:160037",
        "processDefinitionName": "信息中心合同质保金支付流程",
        "url": "/payment2/examineGuarantee?businessId=YC_TGPMS||ICP201503122||201607200857490147||e6571378f7964fbab303cc88b30facf1||GUARANTEE&taskId=224879&activityId=task6&processInstanceId=224844&processDefinitionId=guaranteeProcess:2:160037",
        "processInstanceId": "224844",
        "createTime": 1469006259273,
        "param": {
          "reportType": "guarantee"
        },
        "taskName": "信息中心领导审批",
        "startUserName": "罗惠恒"
      }, {
        "new":true,
        "subject": "信息中心合同支付—ICP20150908—2016047078",
        "businessKey": "YC_TGPMS||ICP20150908||2016047078||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/examinePayment?businessId=YC_TGPMS||ICP20150908||2016047078||e6571378f7964fbab303cc88b30facf1&taskId=215935&activityId=task8&processInstanceId=182971&processDefinitionId=newPayment:1:160033",
        "processInstanceId": "182971",
        "createTime": 1465540355376,
        "param": {
          "reportType": "payment"
        },
        "taskName": "信息中心领导审批",
        "startUserName": "陈楚华"
      }, {
        "subject": "信息中心合同支付—LB010106—2016061024",
        "businessKey": "YC_TGPMS||LB010106||2016061024||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/fillPayment?businessId=YC_TGPMS||LB010106||2016061024||e6571378f7964fbab303cc88b30facf1&taskId=215636&activityId=task1&processInstanceId=215614&processDefinitionId=newPayment:1:160033",
        "processInstanceId": "215614",
        "createTime": 1465390437563,
        "param": {
          "reportType": "payment"
        },
        "taskName": "信息中心处室/分中心项目负责人发起/修改申请",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同支付—XN208—2016067133",
        "businessKey": "YC_TGPMS||XN208||2016067133||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/fillPayment?businessId=YC_TGPMS||XN208||2016067133||e6571378f7964fbab303cc88b30facf1&taskId=215723&activityId=task1&processInstanceId=215701&processDefinitionId=newPayment:1:160033",
        "processInstanceId": "215701",
        "createTime": 1465372562695,
        "param": {
          "reportType": "payment"
        },
        "taskName": "信息中心处室/分中心项目负责人发起/修改申请",
        "startUserName": "金和平"
      }]),
    };
  }

  showDetails = (rowData) => {
    let url = rowData.url;
    let params = url.split('/');
    const page = params[2].split('?')[0];
    this.props.router.toScence(page, rowData);
  }

  renderBadge = (rowData) => {
    let subject = rowData.subject;
    let params = subject.split('—');
    const key = params[0];

    switch(key) {
      case '信息中心合同支付':
        return (<Text small style={{ backgroundColor:'#1DA57A', fontSize:12, borderRadius:3, marginRight:5 }}>合同支付</Text>);
      case '信息中心合同质保金':
        return (<Text small style={{ backgroundColor:'#ff5b05', fontSize:12, borderRadius:3, marginRight:5 }}>质保金</Text>);
      default:
        return;
    }
  }

  renderRow = (rowData) => {
    const param = rowData.businessKey.split('||');
    const poNo = param[2];

    return (
      <TouchableHighlight onPress={() => { this.showDetails(rowData)}}>
        <View style={{ flex:1, flexDirection:'row',  marginLeft:5, paddingTop:5, paddingBottom:5, borderBottomWidth:1, borderBottomColor: '#DDD' }}>
          <View style={{ flex:1, paddingLeft:5, paddingRight:5 }}>
            <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between' }}>
              <View>
                {  
                  rowData.new ?
                  (<Badge dot>
                    <Text style={{ fontWeight:'700', fontSize:18 }}>{poNo}</Text>
                  </Badge>) : (<Text style={{ fontWeight:'700', fontSize:18 }}>{poNo}</Text>)
                }
              </View>
              <View>
                <Text style={{ fontSize:12 }}>{formatter.formatTime(rowData.createTime)} <Icon name="ios-arrow-forward"></Icon></Text>
              </View>
            </View>
            <View>
              <View style={{ flex:1, flexDirection: 'row' }}>        
                {this.renderBadge(rowData)}
                <Text style={{ fontSize: 12 }}>拟稿人:{rowData.startUserName}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _back = () => {
    this.props.router.pop();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.header]}>
          <Text style={[commonStyle.headerTitle]}>办结事项</Text>
          <TouchableOpacity style={[ commonStyle.headerLeftIcon ]} onPress={this._back}>
            <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
          </TouchableOpacity>
        </View>
        <SearchBar placeholder="搜索" />
        <Tabs activeKey={this.state.current}
            onChange={(key)=>{
              console.log('click', key);
              this.setState({current:key})}}>
          <Tabs.TabPane tab="全部" key="1">
            <ScrollView
              ref={(scrollView) => { _scrollView = scrollView; }}
              automaticallyAdjustContentInsets={false}
              >
              <ListView 
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
              />
            </ScrollView>
          </Tabs.TabPane>
          <Tabs.TabPane tab="最近七天" key="2">

          </Tabs.TabPane>
          <Tabs.TabPane tab="本月" key="3">

          </Tabs.TabPane>
          <Tabs.TabPane tab="最近三个月" key="4">

          </Tabs.TabPane>
        </Tabs>
      </View>);
  }
}

HistoryTask.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectHistoryTask();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryTask);
