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
  WebView,
} from 'react-native';

import { 
  List, 
  TabBar,
  Tabs,
  WhiteSpace,
  Steps,
  WingBlank,
  Toast,
 } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import OpenFile from 'react-native-doc-viewer';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectExaminePayment from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';
import { defaultAction, fetchInvoiceInfo, setTab, fetchAssociateFile, fetchTaskHistory, fetchPreview, hidePreview } from './actions';
import database from '../../database';

import config from '../../apis/constants';

const Step = Steps.Step;

class ExaminePayment extends Component {

  componentDidMount() {
    const { businessKey, url, visited, netStatus }= this.props;

    if(netStatus=='online' || !visited){
      const params = businessKey.split('||');
      const systemCode = params[0];
      const poNo = params[1];
      const invoiceNo = params[2];
      const taskId = /taskId=(\w+)/i.exec(url)[1];

      this.props.dispatch(fetchInvoiceInfo(systemCode, poNo, invoiceNo, businessKey));
      this.props.dispatch(fetchAssociateFile(businessKey));
      this.props.dispatch(fetchTaskHistory(businessKey, taskId));

      database.write(() => {
        database.create('TodoTask', Object.assign({ businessKey: businessKey }, { visited: true }), true);
      });
    } 
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.showPreview && nextProps.preview !== this.props.preview) {
      OpenFile.openDoc([{
        url: `${config.baseUrl}/qdp/qdp/${nextProps.preview}`,
        fileName: '预览',
      }], (error, url) => {
        this.props.dispatch(hidePreview());
        Toast.hide();
        if(error) {
          console.error(error);
        } else {
          console.log(url);
        }
      });
    }
  }

  _back = () => {
    this.props.dispatch(defaultAction());
    this.props.router.pop();
  }

  _handle = () => {
    const { businessKey, url }= this.props;
    const taskId = /taskId=(\w+)/i.exec(url)[1];
    const processDefinitionId = this.props.processDefinitionId;
    const processInstanceId = this.props.processInstanceId;
    const activityId = /activityId=(\w+)/i.exec(url)[1];

    // console.log('_handle:', this.props, processInstanceId);

    this.props.router.toHandleTask({
      businessId: businessKey,
      taskId,
      processInstanceId,
      processDefinitionId,
      activityId,
    });
  }

  // _toPreview = (file) => {
  //   this.props.router.toPreviewDoc({ file: file });
  // }

  previewFile = (file) => {
    Toast.info('正在加载，请稍后...', 0);
    this.props.dispatch(fetchPreview(file.remarkText));
  }

  // 附件预览
  renderAssociateFiles = () => {
    const { associateFile } = this.props;
    if(associateFile &&  associateFile.length > 0) {
      return (<View>
        {
          this.props.associateFile.map((file, index) => (<List.Item key={index} arrow="horizontal" wrap={true} onClick={() => this.previewFile(file)}>{file.fileShowName}</List.Item>))
        }
       </View>);
    } else {
      return (
        <View>
          <Text>空</Text>
        </View>
      );
    }
  }

  render() {
    let { user } = this.props;
    const Component = this;
    let invoice = this.props.visited ? database.objects('TodoTaskDetails').filtered(`businessKey = "${this.props.businessKey}"`)[0] : this.props.invoice;

    return (
      <View style={[commonStyle.wrapper]}>
        <View style={[commonStyle.header]}>
          <TouchableOpacity style={[commonStyle.headerLeftIcon]} onPress={this._back}>
            <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
          </TouchableOpacity>
          <Text style={[commonStyle.headerTitle]} numberOfLines={1}>审批支付单</Text>
          <TouchableOpacity style={[commonStyle.headerRightIcon]} onPress={this._handle}>
            <Icon name="md-create" color='white' size={20}></Icon>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Tabs tabBarPosition="bottom" defaultActiveKey="1" activeKey={this.props.current}
            onChange={ (key) => { this.props.dispatch(setTab(key))}}>
            <Tabs.TabPane tab="支付单" key="1">
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                >
                <List renderHeader={() => '支付单基本信息'} >
                  <List.Item extra={invoice.invoiceNo}>支付单号</List.Item>
                  <List.Item extra={invoice.poNo}>合同代码</List.Item>
                  <List.Item wrap={true} extra={invoice.poName}>合同描述</List.Item>
                  <List.Item extra={invoice.oriTotalAmt}>合同原始总金额</List.Item>
                  <List.Item extra={invoice.totalAmt}>合同当前总金额</List.Item>
                  <List.Item extra={invoice.projectDesc}>工程描述</List.Item>
                  <List.Item extra={invoice.invoiceDate}>接收日期</List.Item>
                </List>
                <List renderHeader={() => '本次支付详情'} >
                  <List.Item extra={invoice.bcsqbkje}>申请金额</List.Item>
                  <List.Item extra={invoice.ljfsje}>累计发生金额</List.Item>
                  <List.Item extra={invoice.bcsqzfnr}>支付内容</List.Item>
                  <List.Item extra={invoice.bcsqzfyj}>支付依据</List.Item>
                  <List.Item wrap={true} extra={invoice.bankAccountName}>收款单位</List.Item>
                  <List.Item wrap={true} extra={invoice.bankAccountAddress}>收款单位地址</List.Item>
                  <List.Item wrap={true} extra={invoice.bankName}>收款单位开户银行</List.Item>
                  <List.Item wrap={true} extra={invoice.bankAccountNo}>收款单位账号</List.Item>
                  <List.Item extra={invoice.remark}>备注</List.Item>
                </List>
              </ScrollView>
            </Tabs.TabPane>
            <Tabs.TabPane tab="附件" key="2">
              {
                this.renderAssociateFiles()
              }
            </Tabs.TabPane>
            <Tabs.TabPane tab="流转历史" key="3">
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                >
                <WhiteSpace/>
                <WingBlank>
                  <Steps size="small" current={this.props.history.length-2}>
                    { 
                      this.props.history.map(function (x, i, a) {
                        let fontSize = 16;
                        let minus = parseInt(x.taskName.length / 8);
                        fontSize = fontSize - minus;

                        const comment = x.comment == null ? '-' : x.comment;
                        const time = x.endTime !== null ? formatter.formatDate(x.endTime) : '';
                        
                        if(i < a.length-1) {
                          return (<Step key={i}
                            description={comment+'\n'+x.assignee+' '+time}
                            title={<Text style={{fontSize: fontSize }}>{x.taskName}</Text>} />)
                        }else{
                          return (<Step key={i}
                            title={<Text style={{fontSize: fontSize }}>{x.taskName}</Text>} />)
                        }
                      })
                    }
                  </Steps>
                </WingBlank>
              </ScrollView>
            </Tabs.TabPane>
          </Tabs>
        </View>
      </View>
    );
  }
}

ExaminePayment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectExaminePayment();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExaminePayment);
