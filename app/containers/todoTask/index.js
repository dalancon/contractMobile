import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableOpacity,
  Image,
  Navigator,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import { 
  SearchBar,
  Badge, 
  Tag, 
  Flex, 
  Drawer, 
  Button,
  WhiteSpace,
  WingBlank,
  Grid,
  ActivityIndicator as ActivityIndicator_ANTD,
  Accordion,
  List,
} from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';

import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectTodoTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

import {
  defaultAction,
  fetchTask,
  fetchCondition,
  toggleOpen,
  setPageNo,
  setLoadingTail,
  setRefreshing,
  setSelectIndex,
  setTimeRange,
  setSearch, } from './actions';
import { setHidden } from '../main/actions';

class TodoTask extends Component {

  componentDidMount() {
    this.props.dispatch(defaultAction());
    this.props.dispatch(fetchCondition());
    this.props.dispatch(fetchTask(this.queryParams(this.props.propSelected, this.props.page.current, this.props.search, this.props.timeRange)));
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.page.current !== nextProps.page.current || 
       this.props.timeRange !== nextProps.timeRange ||
       this.props.search !== nextProps.search) {
      this.props.dispatch(fetchTask(this.queryParams(nextProps.propSelected, nextProps.page.current, nextProps.search, nextProps.timeRange)));
    }

    if(this.props.task.length !== nextProps.task.length || this.props.page.total !== nextProps.page.total) {
      // console.log('task:', this.props.task, nextProps.task, this.props.task !== nextProps.task);
      // console.log('total:', this.props.page.total, nextProps.page.total, this.props.page.total !== nextProps.page.total);

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

    if(timeRange !== null && timeRange !== '') {
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
      <TouchableOpacity onPress={() => { this.showDetails(rowData)}}>
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
      </TouchableOpacity>
    );
  }

  showDrawer = () => {
    StatusBar.setBarStyle('dark-content', false);
    this.props.dispatch(setSelectIndex(this.props.timeRange));
    this.refs.drawer.drawer.openDrawer();
  }

  closeDrawer = () => {
    this.refs.drawer.drawer.closeDrawer();
    StatusBar.setBarStyle('light-content', false);
  }

  onOpenChange = (open) => {
    if(open) {
      this.props.dispatch(setHidden(true));
    }else{  
      this.props.dispatch(setHidden(false));    
      StatusBar.setBarStyle('light-content', false);
    }
  }

  hasMore() {
    if(this.props.page.total && this.props.page.current * this.props.page.limit <= this.props.page.total) {
      return true;
    } else {
      return false;
    }
  }

  fetchMoreData = () => {
    if(!this.hasMore() || this.props.isLoadingTail) {
      return;
    } else {
      setTimeout(function (){
        this.props.dispatch(setPageNo(this.props.page.current+1));
      }.bind(this), 1000)
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
    //  console.log(this.props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const drawerProps = {
      open: true,
      position: 'left',
      onOpenChange: this.onOpenChange,
    };

    var { height, width } = Dimensions.get('window');

    let component = this;

    let common = this.props.condition.common.length && this.props.condition.common[0] ? this.props.condition.common[0] : null;

    const condition = common ? (<View style={{ 
                          flex: 1, 
                          backgroundColor: 'white',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          marginBottom: 50}}>
                          <View style={{ flex:1 }}>
                            <WhiteSpace />
                            <WhiteSpace />
                            <WhiteSpace />
                            <WingBlank>
                              <Text>{common.text}:</Text>
                              <View style={{ flexDirection: 'row', alignItems:'center', flexWrap:'wrap' }}>
                                {
                                  common.sub.map(function (el, index) {
                                    return (<Tag key={index} style={{ marginRight: 5 }} selected={component.props.selectIndex === el.value} onChange={(bool) => {
                                        if(bool) {
                                          component.props.dispatch(setSelectIndex(el.value))
                                        } else {
                                          component.props.dispatch(setSelectIndex(null))
                                        }
                                      }}>{el.text}</Tag>)
                                  })
                                }
                              </View>
                            </WingBlank>
                          </View>
                          <View style={{ 
                            height:50,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            paddingBottom: 5,
                          }}>
                            <Button onClick={() => {
                              this.props.dispatch(setSelectIndex(null))
                            }} size='md' style={{ flex:1 , marginLeft:10 , marginRight:5 }}>重置</Button>
                            <Button onClick={() => {
                              this.props.dispatch(setTimeRange(this.props.selectIndex));
                              this.closeDrawer();
                            }} size='md' type='primary' style={{ flex:1, marginLeft:5 , marginRight:10 }}>确定</Button>
                          </View>
                       </View>) : null;

    return (
      <View style={[commonStyle.wrapper]}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
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
        <SearchBar placeholder="搜索" onSubmit={(val) => {
          this.props.dispatch(setSearch(val))
        }}/>
          {
            this.props.timeRange ? 
              <View style={{ flexDirection: 'column' }}>
                <WhiteSpace />
                <WingBlank style={{ flexDirection: 'row', alignItems:'center', flexWrap:'wrap' }}>
                  {
                    common.sub.map(function (el, index) {
                      if(component.props.timeRange === el.value){
                        return (
                          <Tag ref={el.value} key={index} style={{ borderColor:'#1f90e6' }} closable selected={true}
                            onChange={(bool) => {
                              component.refs[index].setState({
                                selected: true
                              });
                              component.props.dispatch(setTimeRange(null));
                            }}
                            onClose={() => {
                              component.props.dispatch(setTimeRange(null));
                            }}
                            ><Text style={{ color:'#1f90e6' }}>{common.text}:{el.text}</Text></Tag>
                        )
                      }
                    })
                  }   
                </WingBlank>
                <WhiteSpace/>
              </View> : null
          }
          {
            this.props.refreshing && this.props.page.current === 1 ? (<ActivityIndicator_ANTD text="正在加载中..." size="large"></ActivityIndicator_ANTD>) : (<ListView
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
                  refreshing={this.props.refreshing}
                  onRefresh={this._onRrefresh}
                  tintColor="#ff6600"
                ></RefreshControl>
              }
            />)
          }
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
