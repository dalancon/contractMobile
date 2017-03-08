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

import { List, SearchBar, Tabs, Badge, Button, Tag } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectPoItem from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

class PoItem extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      current: "1",
      dataSource: ds.cloneWithRows([{
        "poItem": "1301",
        "incurredFcostsTotal": 6025063322.13,
        "ptdCommitmentQty": 1,
        "description": "Dell产品",
        "unitDescription": "项",
        "incurredPrice": 17412210689.73,
        "incurredQtyTotal": 1,
        "unitOfMeasure": "LOT",
        "ptdCommitmentFrate": 17412210689.73,
        "currency": "RMB",
        isAdd:true,
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
        "currency": "RMB",
        isAdd:true,
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
    }
  }

  _back = () => {
    this.props.router.pop();
  }

  renderRow = (rowData) => {
    return (
      <View style={{ flex:1, flexDirection:'row',  marginLeft:5, paddingTop:5, paddingBottom:5, borderBottomWidth:1, borderBottomColor: '#DDD' }}>
        <View style={{ flex:1, paddingLeft:5, paddingRight:5 }}>
          <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between' }}>
            <View>
              <Text>BOQ:{rowData.poItem}</Text>
            </View>
            <View>
              <Text style={{ fontSize:14 }}>{rowData.description}</Text>
            </View>
          </View>
          <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between' }}>
            <View> 
              <Text>数量:{rowData.ptdCommitmentQty}</Text>  
            </View>
            <View>
              <Text>已支付:{rowData.incurredQtyTotal}</Text>      
            </View>
            <View> 
              <Tag selected={rowData.isAdd} small>添加</Tag>
            </View>
          </View>
        </View>
      </View>
    );
  }

  /*<TouchableOpacity style={{ zIndex:1, position:'absolute', right:12, top:16, flexDirection: 'row', alignItems:'center' }} onPress={this.showActionSheet}>
              <Text style={{ color:'white', fontSize: 14 }}>确定</Text>
            </TouchableOpacity> */

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <TouchableOpacity style={{ zIndex:1, position:'absolute', left:12, top:16, flexDirection: 'row', alignItems:'center' }} onPress={this._back}>
              <Icon name="ios-arrow-back" color='white' size={16}><Text style={{ color:'white', fontSize: 14 }}>返回</Text></Icon>
            </TouchableOpacity>
            <Text style={[commonStyle.headerTitle]} numberOfLines={1}>合同细项</Text>

          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <SearchBar placeholder="搜索" />
            <ScrollView
              ref={(scrollView) => { _scrollView = scrollView; }}
              automaticallyAdjustContentInsets={false}
              >
              <ListView 
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
              />
            </ScrollView>
          </View>
        </View> 
      </View>
    );
  }
}

PoItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectPoItem();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PoItem);
