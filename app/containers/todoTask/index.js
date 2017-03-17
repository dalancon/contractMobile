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
  Dimensions,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { 
  TabBar, 
  SearchBar, 
  Tabs, 
  Badge, 
  Tag, 
  Flex,
  List, 
  Drawer, 
  Button,
  WhiteSpace,
  WingBlank,
  Grid, 
}from 'antd-mobile';
import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectTodoTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

import { fetchTask, toggleOpen, setPageNo, setLoadingTail, setRefreshing } from './actions';
import { setHidden } from '../main/actions';

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
    if(this.props.page.current !== nextProps.page.current) {
      this.props.dispatch(fetchTask(this.queryParams(nextProps.propSelected, nextProps.page.current, nextProps.search, nextProps.timeRange)));
    }

    if(this.props.task !== nextProps.task || this.props.page.total !== nextProps.page.total) {
      if(nextProps.task.length < nextProps.page.total){
        this.props.dispatch(setLoadingTail(false));
      }else{
        this.props.dispatch(setLoadingTail(true));
      }
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
    console.log('rowData:', rowData);
    this.props.router.toScence(page, rowData);
  }

  renderBadge = (rowData) => {
    let subject = rowData.subject;
    let params = subject.split('—');
    const key = params[0];

    switch(key) {
      case '信息中心合同支付':
        return (
          <View style={[commonStyle.taskTag , { backgroundColor:'#1DA57A' }]}>
            <Text small style={[ commonStyle.taskSubHeader ]} >合同支付</Text>
          </View>);
      case '信息中心合同质保金':
        return (
          <View style={[commonStyle.taskTag , { backgroundColor:'#ff5b05' }]}>
            <Text small style={[ commonStyle.taskSubHeader ]} >质保金</Text>
          </View>);
      default:
        return;
    }
  }

  renderRow = (rowData) => {
    const param = rowData.businessKey.split('||');
    const poNo = param[2];

    return (
      <TouchableHighlight onPress={() => { this.showDetails(rowData)}}>
        <View style={[ commonStyle.taskContainer ]}>
          <View style={{ flex:1, paddingLeft:5, paddingRight:5 }}>
            <View style={{ flex:1, flexDirection:'row', justifyContent: 'space-between' }}>
              <View>
                {  
                  rowData.new ?
                  (<Badge dot>
                    <Text style={[commonStyle.taskHeader]}>{poNo}</Text>
                  </Badge>) : (<Text style={[commonStyle.taskHeader]}>{poNo}</Text>)
                }
              </View>
              <View>
                <Text style={[ commonStyle.taskSubHeader ]}>{formatter.formatTime(rowData.createTime)} <Icon name="ios-arrow-forward"></Icon></Text>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: 'row', marginTop:10 }}>        
                {this.renderBadge(rowData)}
                <View style={{ paddingTop: 3, paddingBottom:3 }}><Text style={[ commonStyle.taskSubHeader ]}>拟稿人:{rowData.startUserName}</Text></View>
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

  onOpenChange = (open) => {
    if(open) {
      this.props.dispatch(setHidden(true));
      StatusBar.setBarStyle('dark-content');
    }else{  
      this.props.dispatch(setHidden(false));    
      StatusBar.setBarStyle('light-content');
    }
  }

  hasMore() {
    console.log('page:' , this.props.page);

    if(this.props.page.total && this.props.page.current * this.props.page.limit <= this.props.page.total) {
      
      return true;
    } else {

      return false;
    }
  }

  fetchMoreData = () => {
    console.log('fetchMoreData: ');

    if(!this.hasMore() || this.props.isLoadingTail) {
      return;
    } else {
      this.props.dispatch(setPageNo(this.props.page.current+1));
    }
  }

  renderFooter = () => {
    if(!this.hasMore()) {
      return (
        <View style={{ flex:1, justifyContent:'center', alignItems:'center', paddingTop:5 }}>
          <Text style={{color:'grey'}}>没有更多了</Text>
        </View>
      )
    } else {
      return (<ActivityIndicator size="small"></ActivityIndicator>)
    }
  }

  _onRrefresh = () => {
    if(this.props.refreshing) {
      return;
    } else {
      if(this.props.page.current == 1) {
        this.props.dispatch(fetchTask(this.queryParams(this.props.propSelected, this.props.page.current, this.props.search, this.props.timeRange)));
      }else{
        this.props.dispatch(setPageNo(1));
      } 
    }
  }

  render() {
    console.log('props:', this.props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    const drawerProps = {
      open: true,
      position: 'left',
      onOpenChange: this.onOpenChange,
    };

    var {height, width} = Dimensions.get('window');

    const data = [{text:'全部'}, {text:'最近一周'}, {text:'最近一个月'}, {text: '最近7天'}, {text: '最近8天'}]

    const condition = (<View style={{ 
                          flex: 1, 
                          backgroundColor: 'white',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          marginBottom: 50}}>
                          <View style={{ flex:1 }}>
                            <WhiteSpace />
                            <WhiteSpace />
                            <WhiteSpace />
                            <Text>接收时间：</Text>
                            <View style={{ flexDirection: 'row', alignItems:'center', flexWrap:'wrap' }}>
                              {
                                data.map(function (el, index) {
                                  return (<WingBlank key={index} size='md' style={{ marginTop:3, marginBottom:3 }}><Tag selected>{el.text}</Tag></WingBlank>)
                                })
                              }
                            </View>
                          </View>
                          <View style={{ 
                            height:50,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingBottom: 5,
                          }}>
                            <Button size='md' style={{ flex:1 , marginLeft:3 , marginRight:3 }}>重置</Button>
                            <Button size='md' type='primary' style={{ flex:1, marginLeft:3 , marginRight:3 }}>确定</Button>
                          </View>
                       </View>);

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Drawer ref='drawer'
          sidebar={condition}
          drawerBackgroundColor='#FFF'
          position='right'
          onOpenChange={this.onOpenChange}
        >
        <View style={[commonStyle.header]}>
          <Text style={[commonStyle.headerTitle]}>待办事项</Text>
          <TouchableOpacity style={[ commonStyle.headerRightIcon ]} onPress={this.showDrawer}>
            <Icon name="ios-funnel" color='white' size={20}></Icon>
          </TouchableOpacity>
        </View>
        <SearchBar placeholder="搜索" />
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={ds.cloneWithRows(this.props.task)}
            renderRow={this.renderRow}
            onEndReached={this.fetchMoreData}
            onEndReachedThreshold={20}
            enableEmptySections={true}
            renderFooter={this.renderFooter}
            showVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={this._onRrefresh}
                tintColor="#ff6600"
                title="加载中..."
              ></RefreshControl>
            }
          />
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
