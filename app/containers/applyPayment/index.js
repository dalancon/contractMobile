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

import { 
  List, 
  TabBar,
  Tabs,
  WhiteSpace,
  Steps,
  WingBlank,
  Popover,
  ActionSheet,
  InputItem,
  DatePicker,
  Card,
  TextareaItem,
  SwipeAction,
  Modal,
 } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectApplyPayment from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';


const Item = Popover.Item;

class ApplyPayment extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      viewIndex: 0,
      clicked:'',
      date: null,
      poItem: [{
        "poItem": "1502",
        "incurredFcostsTotal": 0,
        "ptdCommitmentQty": 1,
        "description": "惠普产品",
        "unitDescription": "项",
        "incurredPrice": 93610,
        "incurredQtyTotal": 0,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 93610,
        "currency": "RMB"
      }, {
        "poItem": "1503",
        "incurredFcostsTotal": 0,
        "ptdCommitmentQty": 1,
        "description": "联想产品",
        "unitDescription": "项",
        "incurredPrice": 638640,
        "incurredQtyTotal": 0,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 638640,
        "currency": "RMB"
      }, {
        "poItem": "1504",
        "incurredFcostsTotal": 5,
        "ptdCommitmentQty": 1,
        "description": "其他信息类设备",
        "unitDescription": "项",
        "incurredPrice": 4730,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 4730,
        "currency": "RMB"
      }],
      paymentInfo: {
        "comDesc": "中国长江三峡集团公司",
        "paidTimes": 0,
        "paidAmount": null,
        "totalAmount": null,
        "completionRatio": null,
        "lastPaidDate": 1462204800000,
        "lastPaidAmount": 1,
        "nextInvoiceNo": "2017037140",
        "depts": null,
        "systemId": null,
        "systemCode": null,
        "poNo": "XN208",
        "project": "TGP",
        "poStatus": null,
        "installProject": null,
        "currentCo": null,
        "description": "金沙江信息中心虚拟合同",
        "poType": "XN",
        "poCategory": null,
        "company": "CTGPC",
        "companyAddress": null,
        "companyContact": null,
        "awardDate": null,
        "contractualDate": null,
        "requisitionRef": null,
        "installPoNo": null,
        "division": "208",
        "department": null,
        "departmentDesc": null,
        "ccaAmt": null,
        "cepNo": null,
        "cashPackage": null,
        "dfltSuperPoNo": null,
        "poNote": null,
        "holdbackPercent": null,
        "holdbackReleaseDate": null,
        "paymentTerms": null,
        "commitType": null,
        "incurredType": null,
        "invoiceType": null,
        "contentLoc1": null,
        "contentLoc2": null,
        "contentLoc3": null,
        "contentLoc4": null,
        "contentLoc5": null,
        "contentLoc6": null,
        "docDaysToVendor": null,
        "docDaysFromVendor": null,
        "responsiblePerson": null,
        "engineer": null,
        "buyer": null,
        "expeditor": null,
        "inspector": null,
        "administrator": null,
        "supervisor": null,
        "multiShipTo": null,
        "shipToCompany": null,
        "shipToAddress": null,
        "shipToContact": null,
        "apCompany": null,
        "apAddress": null,
        "apContact": null,
        "multiShipFrom": null,
        "shipFrom": null,
        "shipVia": null,
        "ptdCommitAmt": null,
        "ptdPaidAmt": null,
        "ptdGstPaidAmt": null,
        "assetAllocStatus": null,
        "designPhase": null,
        "surveyArea": null,
        "workSchedule": null,
        "remarks": null,
        "prjtLoc": null,
        "effectiveDate": null,
        "startDate": null,
        "endDate": null,
        "originalCode": null,
        "indexNo": null,
        "bankAccountName": null,
        "bankAccountNo": null,
        "downPaymentAmt": null,
        "paymentType": null,
        "downPaymentPct": null,
        "contractorEngineer": null,
        "specialReqts": null,
        "schedStartDate": null,
        "schedEndDate": null,
        "subProject": null,
        "expiryDate": null,
        "modifyDate": null,
        "modifyUser": null,
        "insertUser": null,
        "insertDate": null,
        "dataOwner": null,
        "distributionType": null,
        "bidType": null,
        "companySupervision": null,
        "priceAgmtPoNo": null,
        "priceAgmtProject": null,
        "pricePlanPoNo": null,
        "pricePlanProject": null,
        "safeKeepingRate": null,
        "hbAdmnsFeesPoNo": null,
        "hbAdmnsFeesProject": null,
        "originalAmt": null,
        "haveSupplyList": null,
        "completeDate": null,
        "checkDate": null,
        "poNoCheckDate": null,
        "backCheckDate": null,
        "apportionmentNo": null,
        "budgetHierarchyCode": null,
        "poTypeClose": null,
        "subContractType": null,
        "assetType": null,
        "deliverAssetCode": null,
        "apportMethodAllow": null,
        "amaDate": null,
        "amaPerson": null,
        "letterGuarantee": null,
        "seqNumber": null,
        "subjectMatter": null,
        "duplicated": null,
        "projectDesc": "中国三峡工程"
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
  
  _back = () => {
    this.props.router.pop();
  }

   showActionSheet = () => {
    const BUTTONS = ['发起流程','保存为草稿', '删除', '取消'];

    let wrapProps = {
      onTouchStart: e => e.preventDefault(),
    };
    

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      title: '操作',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      // this.setState({ clicked: BUTTONS[buttonIndex] });
      if(buttonIndex == 0) {
        this.props.router.toHandleTask();
      }
    });
  }

  // 附件预览
  renderAssociateFiles() {
    const associateFile = this.state.associateFile;
    return (
      <View>
        {this.state.associateFile.map((file, index) => (<List.Item key={index}>{file.fileShowName}</List.Item>))}
      </View>
    );
  }

  showDetails = (index) => {
    this.setState({
      visible: true,
      viewIndex: index,
    })
  }

  renderPoItem = () => {
    const poItem = this.state.poItem;
    if(poItem.length > 0){
      return (
        poItem.map((x, i) => (
        <WingBlank key={i}>
          <SwipeAction
            autoClose
            right={[
              {
                text: '取消',
                onPress: () => console.log('取消'),
                style: { backgroundColor: '#ddd', color: 'white' },
              },
              {
                text: '删除',
                onPress: () => {
                  let poItem = this.state.poItem;
                  poItem.splice(i, 1);
                  this.setState({ poItem: poItem});
                },
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
            onOpen={() => console.log('global open')}
          >
            <Card full style={{ marginBottom:2 }}>
              <Card.Header
                title={<TouchableOpacity onPress={() => this.showDetails(i)}><Text style={{ color: '#108EE9' }}>{x.poItem}</Text></TouchableOpacity>}
                extra={x.description}
              />
              <Card.Body>
                <View>
                  <InputItem
                    clear
                    placeholder=""
                    autoFocus
                  >支付数量</InputItem>
                  <InputItem
                    clear
                    placeholder=""
                    autoFocus
                  >支付金额</InputItem>
                  <TextareaItem
                    placeholder="备注"
                    autoFocus
                    autoHeight
                  />
                </View>
              </Card.Body>
            </Card>
          </SwipeAction>
        </WingBlank>))
      )
    }else{
      return (<List.Item >待添加...</List.Item>)
    }
  }

  renderDetailsModal() {
    if(this.state.poItem && this.state.poItem.length >0) {
      const currentPo = this.state.poItem[this.state.viewIndex];
      return (<Modal
        title={currentPo.poItem+"详细信息"}
        transparent
        maskClosable={false}
        visible={this.state.visible}
        footer={[{ text: '确定', onPress: () => { this.setState({visible: false})} }]}
      >
        <View >
          <Text>BOQ:{currentPo.poItem}</Text>
        </View>
        <View >
          <Text>报价单描述:{currentPo.description}</Text>
        </View>
        <View>
          <Text>合同数量:{currentPo.ptdCommitmentQty}</Text>
        </View>
        <View>
          <Text>已支付:{currentPo.incurredQtyTotal}</Text>
        </View>                  
        <View>
          <Text>总金额:{formatter.formatMoney(currentPo.ptdCommitmentFrate * currentPo.ptdCommitmentQty)}</Text>
        </View>
        <View>
          <Text>已支付:{formatter.formatMoney(currentPo.incurredFcostsTotal)}</Text>
        </View>
      </Modal>);
    }
  }

  render() {
    let { user } = this.props;

    return (
      <View style={[commonStyle.wrapper]}>
        <View style={[commonStyle.header]}>
          <TouchableOpacity style={[ commonStyle.headerLeftIcon ]} onPress={this._back}>
            <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 17 }}>返回</Text></Icon>
          </TouchableOpacity>
          <Text style={[commonStyle.headerTitle]} numberOfLines={1}>申请支付单</Text>
          <TouchableOpacity style={[ commonStyle.headerRightIcon ]} onPress={this.showActionSheet}>
            <Icon2 name="pencil" color='white' size={20}></Icon2>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ScrollView
            ref={(scrollView) => { _scrollView = scrollView; }}
            automaticallyAdjustContentInsets={false}
            >
            <List renderHeader={() => '支付单基本信息'} >
              <List.Item extra={this.state.paymentInfo.project}>工程</List.Item>
              <List.Item extra={this.state.paymentInfo.projectDesc}>工程描述</List.Item>
              <List.Item extra={this.state.paymentInfo.poNo}>合同代码</List.Item>
              <List.Item wrap={true} extra={this.state.paymentInfo.description}>合同名称</List.Item>
              <InputItem
                clear
                placeholder=""
                autoFocus
              >支付单号</InputItem>
              <InputItem
                clear
                placeholder=""
                autoFocus
              >支付说明</InputItem>
              <DatePicker mode="date" value={this.state.date} onChange={(val) => {this.setState({date: val})}}>
                <List.Item arrow="horizontal">接收日期</List.Item>
              </DatePicker>
            </List>
            <List renderHeader={() => (<View style={{ backgroundColor:'#eee'}}>
              <WhiteSpace/>
                <WingBlank  style={{ flexDirection:'row', justifyContent: 'space-between' }}>
                  <View><Text>支付细项</Text></View>
                  <View><TouchableOpacity onPress={() => this.props.router.toPoItem()}><Icon size={24} name="ios-add" /></TouchableOpacity></View>
                </WingBlank>
              <WhiteSpace/>
            </View>)} >
              <WhiteSpace />
              {
                this.renderPoItem()
              }
            </List>
            {
              this.renderDetailsModal()
            }
          </ScrollView>
        </View>
      </View>
    );
  }
}

ApplyPayment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectApplyPayment();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyPayment);
