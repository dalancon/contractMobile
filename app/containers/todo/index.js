import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Image,
  Navigator, } from 'react-native';
import { TabBar, Icon, SearchBar, Tabs }from 'antd-mobile';

import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectTodoPage from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

const TabPane = TabBar.TabPane;

class TodoPage extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      current: "1",
      dataSource: ds.cloneWithRows([{
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
    this.props.router.toExamine(rowData);
  }

  renderRow = (rowData) => {
    const param = rowData.businessKey.split('||');
    const poNo = param[2];

    /*  <Navigator
                ref='nav'
                initialRouteStack={routes}
                initialRoute={routes[0]}
                configureScene={(route) => {
                  return Navigator.SceneConfigs.FloatFromRight
                }}
                renderScene={this.renderScene}
              />  */


    return (
      <TouchableHighlight onPress={() => { this.showDetails(rowData)}}>
        <View style={{ flex:1, flexDirection:'row', marginTop:5, marginBottom:5, marginLeft:5, borderBottomWidth:1, borderBottomColor: '#DDD' }}>
          <View style={{ width:36 }}>
            <Image style={{ width:36, height:36 }}source={require('../../public/imgs/pay.png')}></Image>
          </View>
          <View style={{ flex:1, paddingLeft:5, paddingRight:5 }}>
            <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between' }}>
              <View>
                <Text>{poNo}</Text>
              </View>
              <View>
                <Text>{formatter.formatDate(rowData.createTime)}</Text>
              </View>
            </View>
            <View>
              <Text>{rowData.taskName}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.header]}>
          <Text style={[commonStyle.headerTitle]}>待办事项</Text>
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

TodoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectTodoPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
