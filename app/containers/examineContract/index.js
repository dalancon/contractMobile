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
} from 'react-native';

import { List, TabBar, Tabs, Checkbox, Radio,  Picker, TextareaItem, Button, WhiteSpace, Steps, WingBlank, } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectExamineContract from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
const Step = Steps.Step;

class ExamineContract extends Component {
  constructor(props){
    super(props);
    this.state = {
      invoice: {
        bankAccountAddress: "武汉市武昌区体育馆路特1号香格里嘉园B1001",
        bankAccountName: "武汉英思工程科技有限公司",
        bankAccountNo: "",
        bankName: "",
        bcjshyfk: null,
        bcjssjzf: null,
        bcsqbkje: "100,000.00",
        bcsqzfnr: "201604261442",
        bcsqzfyj: null,
        blj: null,
        bz: "美元",
        clk: null,
        dksj: null,
        dw: "元",
        invoiceDate: "2016-04-26",
        invoiceNo: "2016047078",
        kkhj: null,
        ljfsje: "4,371,011.00",
        oriPoNo: null,
        oriTotalAmt: "4,400,000.00",
        poName: "信息中心合同审签系统测试",
        poNo: "ICP20150908",
        projectDesc: "中国三峡工程",
        qtkk: ".00",
        remark: null,
        totalAmt: "4,400,000.00",
        yfgck: null,
      },
      associateFile: [{
        "fileKey": "1461652953877",
        "seqNo": 1,
        "fileProgCode": "D3161",
        "commonName": "陈楚华",
        "fileCat": "DOT",
        "fileShowName": "3.信息中心合同支付系统（第二版）用户手册.docx",
        "fileName": null,
        "fileSize": 772036,
        "uploadDate": 1461600000000,
        "uploadUser": "chenchuhua",
        "remarkText": "/contractPayment/3.信息中心合同支付系统（第二版）用户手册_1461653138914.docx",
        "uploadStatus": "1",
        "confirmSuccess": "1",
        "modifyUser": null,
        "modifyDate": null,
        "insertUser": "chenchuhua",
        "insertDate": 1461600000000,
        "dataOwner": null,
        "fileLevel": null,
        "fileShowSize": "753.94KB"
        }, {
          "fileKey": "1461652953877",
          "seqNo": 2,
          "fileProgCode": "D3161",
          "commonName": "陈楚华",
          "fileCat": "DOT",
          "fileShowName": "新建文本文档.txt",
          "fileName": null,
          "fileSize": 7,
          "uploadDate": 1461600000000,
          "uploadUser": "chenchuhua",
          "remarkText": "/contractPayment/新建文本文档_1461654718031.txt",
          "uploadStatus": "1",
          "confirmSuccess": "1",
          "modifyUser": null,
          "modifyDate": null,
          "insertUser": "chenchuhua",
          "insertDate": 1461600000000,
          "dataOwner": null,
          "fileLevel": null,
          "fileShowSize": "7B"
        }, {
          "fileKey": "1461652953877",
          "seqNo": 3,
          "fileProgCode": "D3161",
          "commonName": "陈楚华",
          "fileCat": "DOT",
          "fileShowName": "RA038QDP_20160425172909724.pdf",
          "fileName": null,
          "fileSize": 13860,
          "uploadDate": 1461600000000,
          "uploadUser": "chenchuhua",
          "remarkText": "/contractPayment/RA038QDP_20160425172909724_1461654728078.pdf",
          "uploadStatus": "1",
          "confirmSuccess": "1",
          "modifyUser": null,
          "modifyDate": null,
          "insertUser": "chenchuhua",
          "insertDate": 1461600000000,
          "dataOwner": null,
          "fileLevel": null,
          "fileShowSize": "13.54KB"
      }],
      outGoing: [{
        "id": "flow22",
        "users": [{
          "id": "chenchuhua",
          "insertDate": null,
          "modifyUser": null,
          "userCode": null,
          "insertUser": null,
          "modifyDate": null,
          "userName": "陈楚华",
          "mobile": null,
          "email": null
        }],
        "name": "审批通过",
        "assignee": ["chenchuhua"]
      }, {
        "id": "flow13",
        "users": [{
          "id": "xiao_yunqing",
          "insertDate": null,
          "modifyUser": null,
          "userCode": null,
          "insertUser": null,
          "modifyDate": null,
          "userName": "肖云晴",
          "mobile": null,
          "email": null
        }],
        "name": "退回预算管理员",
        "assignee": null
      }],
      outGoingValue: '',
      current: '1',
      history: [{
        "taskName": "信息中心处室/分中心项目负责人发起/修改申请",
        "assignee": "陈楚华",
        "comment": "1",
        "startTime": 1461654767126,
        "endTime": 1461658504525
      }, {
        "taskName": "信息中心处室/分中心负责人审核",
        "assignee": "王国勋",
        "comment": null,
        "startTime": 1461658504525,
        "endTime": 1461659399385
      }, {
        "taskName": "预算管理员处理",
        "assignee": "肖云晴",
        "comment": null,
        "startTime": 1461659399385,
        "endTime": 1461659429213
      }, {
        "taskName": "信息中心领导审批",
        "assignee": "金和平",
        "comment": null,
        "startTime": 1461659429229,
        "endTime": 1465539472746
      }, {
        "taskName": "预算管理员处理",
        "assignee": "肖云晴",
        "comment": "test",
        "startTime": 1465539472792,
        "endTime": 1465540355367
      }, {
        "taskName": "信息中心领导审批",
        "assignee": "金和平",
        "comment": "dsds",
        "startTime": 1465540355376,
        "endTime": null
      }]
    };
  }
  
  _back = () => {
    this.props.router.pop();
  }

  onChange(value) {
    console.log('checkbox');
    this.setState({
      outGoingValue: value,
    });
  }

  // 附件预览
  renderAssociateFiles() {
    const associateFile = this.state.associateFile;
    return (<View>
      {this.state.associateFile.map((file, index) => <Text key={index}>{file.fileShowName}</Text>)}
    </View>);
  }

  render() {
    let { user } = this.props;

    const routes = [
      {title: 'Todo Scence', index:0},
      {title: 'Contract Scence', index:1},
      {title: 'Concern Scence', index:2},
      {title: 'My Scence', index:3},
      {title: 'ExamineContract Scence', index:4},
    ];

    console.log('mainPage:', this.props);

    const { outGoingValue } = this.state;

    const data = this.state.outGoing.map((x) => { return {value: x.id, label: x.name}; });

    const users = this.state.outGoing[0].users.map((u) => { return {value:u.id, label:u.userName}; });

    const seasons = [
      [
        {
          label: '2013',
          value: '2013',
        },
        {
          label: '2014',
          value: '2014',
        },
      ],
      [
        {
          label: '春',
          value: '春',
        },
        {
          label: '夏',
          value: '夏',
        },
      ],
    ];

    console.log(users);

/// <Icon name="ios-arrow-back" color='white' size={16}><Text style={{ color:'white', fontSize: 14 }}>待办</Text></Icon>
    return (
      <View style={[commonStyle.wrapper]}>

        <View style={[commonStyle.header]}>
          <TouchableOpacity style={{ zIndex:1, position:'absolute', left:12, top:16, flexDirection: 'row', alignItems:'center' }} onPress={this._back}>
            <Icon name="ios-arrow-back" color='white' size={16}><Text style={{ color:'white', fontSize: 14 }}>待办</Text></Icon>
          </TouchableOpacity>
          <Text style={[commonStyle.headerTitle]} numberOfLines={1}>审批支付单</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Tabs tabBarPosition="bottom" defaultActiveKey="2" activeKey={this.state.current}
            onChange={(key)=>{this.setState({current:key})}}>
            <Tabs.TabPane tab="支付单" key="1">
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                >
                <List renderHeader={() => '支付单基本信息'} >
                  <List.Item extra={this.state.invoice.invoiceNo}>支付单号</List.Item>
                  <List.Item extra={this.state.invoice.poNo}>合同代码</List.Item>
                  <List.Item wrap={true} extra={this.state.invoice.poName}>合同描述</List.Item>
                  <List.Item extra={this.state.invoice.oriTotalAmt}>合同原始总金额</List.Item>
                  <List.Item extra={this.state.invoice.totalAmt}>合同当前总金额</List.Item>
                  <List.Item extra={this.state.invoice.projectDesc}>工程描述</List.Item>
                  <List.Item extra={this.state.invoice.invoiceDate}>接收日期</List.Item>
                </List>
                <List renderHeader={() => '本次支付详情'} >
                  <List.Item extra={this.state.invoice.bcsqbkje}>申请金额</List.Item>
                  <List.Item extra={this.state.invoice.ljfsje}>累计发生金额</List.Item>
                  <List.Item extra={this.state.invoice.bcsqzfnr}>支付内容</List.Item>
                  <List.Item extra={this.state.invoice.bcsqzfyj}>支付依据</List.Item>
                  <List.Item wrap={true} extra={this.state.invoice.bankAccountName}>收款单位</List.Item>
                  <List.Item wrap={true} extra={this.state.invoice.bankAccountAddress}>收款单位地址</List.Item>
                  <List.Item wrap={true} extra={this.state.invoice.bankName}>收款单位开户银行</List.Item>
                  <List.Item wrap={true} extra={this.state.invoice.bankAccountNo}>收款单位账号</List.Item>
                  <List.Item extra={this.state.invoice.remark}>备注</List.Item>
                  <List.Item wrap={true} extra={this.renderAssociateFiles()}>附件</List.Item>
                </List>
              </ScrollView>
            </Tabs.TabPane>
            <Tabs.TabPane tab="处理" key="2">
              <List renderHeader={() => '下一环节'}>
                {data.map(i => (
                  <RadioItem key={i.value} checked={outGoingValue === i.value} onChange={() => this.onChange(i.value)}>
                    {i.label}
                  </RadioItem>
                ))}
              </List>
              <List renderHeader={() => '人员'}>
                <Picker data={users}  cols={1}>
                  <List.Item arrow="horizontal">处理人</List.Item>
                </Picker>
                <Picker data={users} cols={1}>
                  <List.Item arrow="horizontal">流程关注人</List.Item>
                </Picker>
              </List>
              <List renderHeader={() => '处理意见'}>
                <TextareaItem
                  rows={3}
                  count={100}
                />
              </List>
              <WhiteSpace size="sm" />
              <List.Item>
                <Button type="primary" inline>提交申请单</Button>
              </List.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="流转历史" key="3">
              <WhiteSpace size="sm" />
              <WingBlank>
                <Steps size="small" current={this.state.history.length-2}>
                  { 
                    this.state.history.map(function (x, i) {
                      // console.log(x.taskName.length);
                      let fontSize = 16;
                      let minus = parseInt(x.taskName.length/8);
                      fontSize = fontSize - minus;
                      return (<Step key={i} 
                              title={<Text style={{fontSize: fontSize}}>{x.taskName}</Text>} 
                              description={<Text><Text>{x.comment}</Text><Text>{'\n'}{x.assignee}</Text><Text>{'\n'}{x.endTime !== null ? formatter.formatDate(x.endTime) : ''}</Text></Text>} />)
                    })
                  }
                </Steps>
              </WingBlank>
            </Tabs.TabPane>
          </Tabs>
        </View>
      </View>
    );
  }
}

ExamineContract.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectExamineContract();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExamineContract);
