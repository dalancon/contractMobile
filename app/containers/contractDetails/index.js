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

import { List, SearchBar, Tabs, ActionSheet } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectContractDetails from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

class ContractDetails extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      current: "1",
      poItem: ds.cloneWithRows([{
        "poItem": "1301",
        "incurredFcostsTotal": 6025063322.13,
        "ptdCommitmentQty": 1,
        "description": "Dell产品",
        "unitDescription": "项",
        "incurredPrice": 17412210689.73,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 17412210689.73,
        "currency": "RMB"
      }, {
        "poItem": "1302",
        "incurredFcostsTotal": 79519036,
        "ptdCommitmentQty": 1,
        "description": "Hp产品",
        "unitDescription": "项",
        "incurredPrice": 233743440,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 233743440,
        "currency": "RMB"
      }, {
        "poItem": "1303",
        "incurredFcostsTotal": 1000,
        "ptdCommitmentQty": 1,
        "description": "其他信息类设备",
        "unitDescription": "项",
        "incurredPrice": 3683284,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 3683284,
        "currency": "RMB"
      }, {
        "poItem": "1401",
        "incurredFcostsTotal": 95060.03,
        "ptdCommitmentQty": 1,
        "description": "Dell产品",
        "unitDescription": "项",
        "incurredPrice": 472431.15,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 472431.15,
        "currency": "RMB"
      }, {
        "poItem": "1402",
        "incurredFcostsTotal": 246963,
        "ptdCommitmentQty": 1,
        "description": "成都总部桌面设备维修",
        "unitDescription": "项",
        "incurredPrice": 506248499.02,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 506248499.02,
        "currency": "RMB"
      }, {
        "poItem": "1403",
        "incurredFcostsTotal": 1000,
        "ptdCommitmentQty": 1,
        "description": "会议及培训费用",
        "unitDescription": "项",
        "incurredPrice": 1128,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 1128,
        "currency": "RMB"
      }, {
        "poItem": "1404",
        "incurredFcostsTotal": 100,
        "ptdCommitmentQty": 1,
        "description": "成都总部备品备件及耗材",
        "unitDescription": "项",
        "incurredPrice": 1164.6,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 1164.6,
        "currency": "RMB"
      }, {
        "poItem": "1501",
        "incurredFcostsTotal": 929779.08,
        "ptdCommitmentQty": 1,
        "description": "戴尔产品",
        "unitDescription": "项",
        "incurredPrice": 4648895.4,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 4648895.4,
        "currency": "RMB"
      }, {
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
      }, {
        "poItem": "1505",
        "incurredFcostsTotal": 142960,
        "ptdCommitmentQty": 1,
        "description": "集团公司企业信息内网与外网隔离建设",
        "unitDescription": "项",
        "incurredPrice": 214440,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 214440,
        "currency": "RMB"
      }]),
      contractInfo: {
        "comDesc": "中国长江三峡集团公司",
        "paidTimes": 0,
        "paidAmount": null,
        "totalAmount": null,
        "completionRatio": null,
        "lastPaidDate": 1462204800000,
        "lastPaidAmount": 1,
        "nextInvoiceNo": "2017027140",
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
    };
  }

  _back = () => {
    this.props.router.pop();
  }

  _toApply = () => {
    this.props.router.toApply({contract: this.state.contractInfo});
  }

  renderRow = (rowData) => {
    return (
      <TouchableOpacity>
        <View style={{ flex:1, flexDirection:'row', marginTop:5, marginBottom:5, marginLeft:5, borderBottomWidth:1, borderBottomColor: '#DDD' }}>
          <View style={{ flex:1, paddingLeft:5, paddingRight:5 }}>
            <View >
              <Text>BOQ:{rowData.poItem}</Text>
            </View>
            <View >
              <Text>报价单描述:{rowData.description}</Text>
            </View>
            <View>
              <View>
                <Text>合同数量:{rowData.ptdCommitmentQty}</Text>
              </View>
              <View>
                <Text>已支付:{rowData.incurredQtyTotal}</Text>
              </View>
            </View>
            <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between' }}>
              <View>
                <Text>总金额:{formatter.formatMoney(rowData.ptdCommitmentFrate * rowData.ptdCommitmentQty)}</Text>
              </View>
              <View>
                <Text>已支付:{formatter.formatMoney(rowData.incurredFcostsTotal)}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  showActionSheet = () => {
    const BUTTONS = ['申请支付单','申请质保金', '取消'];

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
      if(buttonIndex == 0) {
        this.props.router.toApply();
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <TouchableOpacity style={[ commonStyle.headerLeftIcon ]} onPress={this._back}>
              <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
            </TouchableOpacity>
            <Text style={[commonStyle.headerTitle]} numberOfLines={1}>合同明细</Text>
            <TouchableOpacity style={[ commonStyle.headerRightIcon ]} onPress={this.showActionSheet}>
              <Icon name="md-create" color='white' size={20}></Icon>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Tabs tabBarPosition="bottom" defaultActiveKey="1" activeKey={this.state.current}
              onChange={(key)=>{this.setState({current:key})}}>
              <Tabs.TabPane tab="合同" key="1">
                 <ScrollView
                  ref={(scrollView) => { _scrollView = scrollView; }}
                  automaticallyAdjustContentInsets={false}
                >
                  <List renderHeader={() => '合同基本信息'}>
                    <List.Item extra={this.state.contractInfo.poNo}>合同编号</List.Item>
                    <List.Item extra={this.state.contractInfo.description}>合同名称</List.Item>
                    <List.Item wrap={true} extra={`${this.state.contractInfo.project}(${this.state.contractInfo.projectDesc})`}>所属工程</List.Item>
                    <List.Item wrap={true} extra={`${this.state.contractInfo.department}(${this.state.contractInfo.departmentDesc})`}>所属部门</List.Item>
                    <List.Item wrap={true} extra={`${this.state.contractInfo.company}(${this.state.contractInfo.comDesc})`}>承包商</List.Item>
                  </List>
                  <List renderHeader={() => '合同基本信息'}>
                    <ListView 
                      dataSource={this.state.poItem}
                      renderRow={this.renderRow}
                    />
                  </List>
                </ScrollView>
              </Tabs.TabPane>
              <Tabs.TabPane tab="支付历史" key="2">
                
              </Tabs.TabPane>
            </Tabs>
          </View>
        </View> 
      </View>
     
    );
  }
}

ContractDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectContractDetails();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractDetails);
