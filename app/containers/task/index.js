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

import { List, SearchBar, Tabs, SegmentedControl, WingBlank, WhiteSpace } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

class Task extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      current: 0,
      task:ds.cloneWithRows([{
        "subject": "信息中心合同支付—LB010106—2016051008",
        "businessKey": "YC_TGPMS||LB010106||2016051008||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||LB010106||2016051008||e6571378f7964fbab303cc88b30facf1&taskId=249909&activityId=task8&processInstanceId=205070&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "205070",
        "createTime": 1479350943516,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心项目负责人打印材料",
        "currentAssigneeName": "李仙华",
        "startUserName": "李仙华"
      }, {
        "subject": "信息中心合同支付—ICP201503602—2016073015",
        "businessKey": "YC_TGPMS||ICP201503602||2016073015||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||ICP201503602||2016073015||e6571378f7964fbab303cc88b30facf1&taskId=224836&activityId=task8&processInstanceId=224801&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "224801",
        "createTime": 1468976060143,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心项目负责人打印材料",
        "currentAssigneeName": "罗惠恒",
        "startUserName": "罗惠恒"
      }, {
        "subject": "信息中心合同支付—LB010103—2016071009",
        "businessKey": "YC_TGPMS||LB010103||2016071009||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||LB010103||2016071009||e6571378f7964fbab303cc88b30facf1&taskId=224123&activityId=task1&processInstanceId=224101&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "224101",
        "createTime": 1467969596108,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "预算管理员处理",
        "currentAssigneeName": "肖云晴",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同质保金—LB010106",
        "businessKey": "YC_TGPMS||LB010106||201607071612240138||e6571378f7964fbab303cc88b30facf1||GUARANTEE",
        "processDefinitionId": "guaranteeProcess:2:160037",
        "processDefinitionName": "信息中心合同质保金支付流程",
        "url": "/payment2/guaranteeDetails?businessId=YC_TGPMS||LB010106||201607071612240138||e6571378f7964fbab303cc88b30facf1||GUARANTEE&taskId=224023&activityId=task1&processInstanceId=224001&processDefinitionId=guaranteeProcess:2:160037&isComplete=false",
        "processInstanceId": "224001",
        "createTime": 1467879705638,
        "param": {
          "reportType": "guarantee"
        },
        "currentActivityName": "信息中心处室/分中心负责人审核",
        "currentAssigneeName": "徐侠",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同支付—LB010106—2016061028",
        "businessKey": "YC_TGPMS||LB010106||2016061028||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||LB010106||2016061028||e6571378f7964fbab303cc88b30facf1&taskId=216232&activityId=task1&processInstanceId=216201&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "216201",
        "createTime": 1486634996434,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心负责人审核",
        "currentAssigneeName": "王国勋",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同支付—INVTEST01—2016061003",
        "businessKey": "YC_TGPMS||INVTEST01||2016061003||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||INVTEST01||2016061003||e6571378f7964fbab303cc88b30facf1&taskId=216023&activityId=task1&processInstanceId=216001&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "216001",
        "createTime": 1466408643950,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心负责人审核",
        "currentAssigneeName": "徐侠",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同支付—XN208—2016067134",
        "businessKey": "YC_TGPMS||XN208||2016067134||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||XN208||2016067134||e6571378f7964fbab303cc88b30facf1&taskId=215927&activityId=task1&processInstanceId=215905&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "215905",
        "createTime": 1465540080416,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心负责人审核",
        "currentAssigneeName": "徐侠",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同支付—LB010106—2016061025",
        "businessKey": "YC_TGPMS||LB010106||2016061025||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||LB010106||2016061025||e6571378f7964fbab303cc88b30facf1&taskId=215823&activityId=task1&processInstanceId=215801&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "215801",
        "createTime": 1465395660905,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心负责人审核",
        "currentAssigneeName": "徐侠",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同支付—LB010106—2016061023",
        "businessKey": "YC_TGPMS||LB010106||2016061023||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||LB010106||2016061023||e6571378f7964fbab303cc88b30facf1&taskId=215609&activityId=task1&processInstanceId=215587&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "215587",
        "createTime": 1465369837093,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心负责人审核",
        "currentAssigneeName": "徐侠",
        "startUserName": "金和平"
      }, {
        "subject": "信息中心合同支付—XN208—2016067131",
        "businessKey": "YC_TGPMS||XN208||2016067131||e6571378f7964fbab303cc88b30facf1",
        "processDefinitionId": "newPayment:1:160033",
        "processDefinitionName": "新合同支付流程",
        "url": "/payment2/paymentDetails?businessId=YC_TGPMS||XN208||2016067131||e6571378f7964fbab303cc88b30facf1&taskId=215023&activityId=task1&processInstanceId=215001&processDefinitionId=newPayment:1:160033&isComplete=false",
        "processInstanceId": "215001",
        "createTime": 1464769600925,
        "param": {
          "reportType": "payment"
        },
        "currentActivityName": "信息中心处室/分中心负责人审核",
        "currentAssigneeName": "徐侠",
        "startUserName": "金和平"
      }]),
    };
  }

  _back = () => {
    this.props.router.pop();
  }

  renderRow = (rowData) => {
    const param = rowData.businessKey.split('||');
    const poNo = param[2];

    return (
      <TouchableHighlight onPress={() => { this.showDetails(rowData)}}>
        <View style={{ flex:1, flexDirection:'row',  marginLeft:5, borderBottomWidth:1, borderBottomColor: '#DDD' }}>
          <View style={{ width:36 }}>
            <WhiteSpace />
            {rowData.new ? (<Badge dot size="small">
              <Image style={{ width:36, height:36 }} source={require('../../public/imgs/pay.png')}></Image>
            </Badge>) : (<Image style={{ width:36, height:36 }} source={require('../../public/imgs/pay.png')}></Image>)}
          </View>
          <View style={{ flex:1, paddingLeft:5, paddingRight:5 }}>
            <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between' }}>
              <View>
                <Text>{poNo}</Text>
              </View>
              <View>
                <Text>{formatter.formatDate(rowData.createTime)} <Icon name="ios-arrow-forward"></Icon></Text>
              </View>
            </View>
            <View>
              <Text>[{rowData.currentActivityName}]</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  showTask = (taskType) => {
    return (
      <ListView 
        dataSource={this.state.task}
        renderRow={this.renderRow}
      />
    );
  }
  
  renderTask = (index) => {
    let taskType = '';
    switch(index) {
      case 0:
        return this.showTask('passTask');
      case 1:
        return this.showTask('historyTask');
      case 2:
        return this.showTask('participantTask');
      default:
        return ;
    }
  }

  _onChange = () => {
    console.log(this.state.current)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <Text style={[commonStyle.headerTitle]} numberOfLines={1}>任务(3)</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
              ref={(scrollView) => { _scrollView = scrollView; }}
              automaticallyAdjustContentInsets={false}
            >
              <WhiteSpace />
              <WingBlank className="sc-example">
                <SegmentedControl
                  values={['参办(2)', '办结(1)', '关注']}
                  tintColor={'#FF5B05'}
                  selectedIndex={this.state.current}
                  onChange={this._onChange}
                  onValueChange={this.onValueChange}
                />
              </WingBlank>
                {
                  this.renderTask(this.state.current)
                }
            </ScrollView>
          </View>
        </View> 
      </View>
     
    );
  }
}

Task.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectTask();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
