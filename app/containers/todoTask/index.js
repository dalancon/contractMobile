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
  Navigator,
  Dimensions, } from 'react-native';
import { TabBar, SearchBar, Tabs, Badge, Tag, Flex, List, Drawer, Button, WhiteSpace, WingBlank, Grid }from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectTodoTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

import { fetchTask, toggleOpen } from './actions';

const TabPane = TabBar.TabPane;

class TodoTask extends Component {
  static drawer = (<Drawer ref='drawer'
        style={{ left:0, top:0 }}
        sidebar={(<Text>抽屉内容</Text>)}
        drawerBackgroundColor='#33d'
        position='left'
        onOpenChange={this.onOpenChange}
        drawerWidth={300}
      />)

  componentDidMount() {
    this.props.dispatch(fetchTask(this.queryParams(this.props.propSelected, this.props.page.current, this.props.search, this.props.timeRange)));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.page.current !== nextProps.page.current) {
      this.props.dispatch(fetchTask(this.queryParams(nextProps.propSelected, nextProps.page.current, nextProps.search, nextProps.timeRange)));
    }
  }

  queryParams = (propSelected, current, search, timeRange) => {
    const query = {
      offset: (current - 1) * this.props.page.limit,
      limit: this.props.page.limit,
      search,
    };

    if(timeRange !== '') {
      query.timeRange = timeRange;
    }

    return query;
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


  showDrawer = () => {
    this.refs.drawer.drawer.openDrawer();
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const drawerProps = {
      open: true,
      position: 'left',
      onOpenChange: this.onOpenChange,
    };

    var {height, width} = Dimensions.get('window');

    const data = [{text:'全部'}, {text:'最近一周'}, {text:'最近一个月'}, {text: '最近7天'}, {text: '最近8天'}]

    const condition = (<View style={{ flex: 1, 
                          backgroundColor: 'white',
                          flexDirection: 'column',
                          justifyContent: 'space-between',}}>
                          <View style={{ flex:1 }}>
                            
                            <View style={{ flexDirection: 'row', alignItems:'center', flexWrap:'wrap' }}>
                              {
                                data.map(function (el, index) {
                                  return (<WingBlank key={index} size='md' style={{ marginTop:3, marginBottom:3 }}><Tag selected>{el.text}</Tag></WingBlank>)
                                })
                              }
                            </View>
                          </View>
                          <View style={{  
                            backgroundColor: 'white',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingBottom: 5 }}>
                            <Button size='md' style={{ flex:1 , marginLeft:3 , marginRight:3 }}>重置</Button>
                            <Button size='md' type='primary' style={{ flex:1, marginLeft:3 , marginRight:3 }}>确定</Button>
                          </View>
                       </View>);

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Drawer ref='drawer'
          style={{ left:0, top:0 }}
          sidebar={condition}
          drawerBackgroundColor='#FFF'
          position='right'
          onOpenChange={this.onOpenChange}
        >
        <View style={[commonStyle.header]}>
          <Text style={[commonStyle.headerTitle]}>待办事项</Text>
          <TouchableOpacity style={{ zIndex:1, position:'absolute', right:12, top:16, flexDirection: 'row', alignItems:'center' }} onPress={this.showDrawer}>
            <Icon name="ios-funnel" color='white' size={16}></Icon>
          </TouchableOpacity>
        </View>
        <SearchBar placeholder="搜索" />
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          >
          <ListView 
            dataSource={ds.cloneWithRows(this.props.task)}
            renderRow={this.renderRow}
            enableEmptySections={true}
          />
        </ScrollView>
        </Drawer>
      </View>);
  }
}

TodoTask.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectTodoTask();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoTask);
