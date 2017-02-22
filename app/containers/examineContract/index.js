import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Navigator, 
} from 'react-native';

import { List, TabBar, Tabs } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectExamineContract from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

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
    };
  }
  
  _back() {
    console.log('click_back:', this.props.router);
    this.props.router.pop();
  }

  // 附件预览
  renderAssociateFiles() {
    const associateFile = this.state.associateFile;
    return (<View>
      {this.state.associateFile.map((file, index) => <Text key={index}>{file.fileShowName}</Text>)}
    </View>);
  }

  renderScene = () => {
    return (
      <View>
        
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
      </View>
    )
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

    return (
      <View style={[commonStyle.wrapper]}>
        <View style={[commonStyle.header]}>
          <TouchableOpacity onPress={() => {console.log('Press!')}} style={{ backgroundColor:'black', position:'absolute', left:12, top:16, borderRadius: 8, flexDirection: 'row', alignItems:'center' }}>
            <Text style={{ color:'white', fontSize: 14 }}>待办</Text>
          </TouchableOpacity>
          <Text style={[commonStyle.headerTitle]} numberOfLines={1}>审批支付单</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Tabs tabBarPosition="bottom" defaultActiveKey="1" >
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
              
            </Tabs.TabPane>
            <Tabs.TabPane tab="流转历史" key="3">
              
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
