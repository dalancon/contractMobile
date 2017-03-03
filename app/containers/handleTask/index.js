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

import { 
  List, 
  SearchBar, 
  Tabs, 
  SegmentedControl, 
  WingBlank, 
  WhiteSpace,
  PickerView,
  Popup,
  Picker,
  Radio,
  Checkbox,
  TextareaItem,
  Toast,
  Button,} from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectHandleTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';


const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

class HandleTask extends Component {
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      outGoingValue: '',
      user: null,
      participantUser: null,
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
        },{
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
      opinions: [{
        "id": "19528ce6-8e36-42fc-b3e2-90541d7a1b59",
        "title": "同意",
        "content": "同意",
        "type": "2"
      }, {
        "id": "d288c058-3358-461b-9ea5-d4b52525a2e5",
        "title": "不同意",
        "content": "不同意",
        "type": "1"
      }, {
        "id": "e56e34b5-6aaa-4271-af53-859ebaf974ac",
        "title": "延期",
        "content": "延期",
        "type": "2"
      }]
    };
  }

  _back = () => {
    this.props.router.pop();
  }

  showTask = (handleTaskType) => {
    return (
      <ListView 
        dataSource={this.state.handleTask}
        renderRow={this.renderRow}
      />
    );
  }
  
  renderTask = (index) => {
    let handleTaskType = '';
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

  onPressComment = () => {
    const data = this.state.opinions.map((x) => { return {value: x.id, label: x.title}; });

    const { comment } = this.state;

    Popup.show(
      (
        <List renderHeader={() => (
          <View style={{ backgroundColor:'#eee'}}>
            <WhiteSpace/>
              <WingBlank style={{ flexDirection:'row', justifyContent: 'space-between' }}>
                <View><Text >常用意见</Text></View>
                <View><TouchableOpacity onPress={() => Popup.hide()}><Icon size={24} name="ios-close" /></TouchableOpacity></View>
              </WingBlank>
            <WhiteSpace/>
          </View>)}
        >
          {data.map(i => (
            <RadioItem key={i.value} checked={comment === i.label} onChange={() => this.setState({ comment: i.label })}>
              {i.label}
            </RadioItem>
          ))}
        </List>
       ), { animationType: 'slide-up', maskClosable: true });
  }

  loadingToast = () => {
    Toast.loading('正在提交...', 1, () => {
      this.props.router.toMain();
    });
  }

  render() {
    const data = this.state.outGoing.map((x) => { return {value: x.id, label: x.name}; });

    const users = this.state.outGoing[0].users.map((u) => { return {value:u.id, label:u.userName}; });

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <TouchableOpacity style={{ zIndex:1, position:'absolute', left:12, top:16, flexDirection: 'row', alignItems:'center' }} onPress={this._back}>
              <Icon name="ios-arrow-back" color='white' size={16}><Text style={{ color:'white', fontSize: 14 }}>返回</Text></Icon>
            </TouchableOpacity>
            <Text style={[commonStyle.headerTitle]} numberOfLines={1}>处理</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
              ref={(scrollView) => { _scrollView = scrollView; }}
              automaticallyAdjustContentInsets={false}
            >
              <List renderHeader={() => '下一环节'}>
                {data.map(i => (
                  <RadioItem key={i.value} checked={this.state.outGoingValue === i.label} onChange={() => this.setState({ outGoingValue: i.label })}>
                    {i.label}
                  </RadioItem>
                ))}
              </List>
              <List renderHeader={() => '人员'}>
                <Picker data={users} cols={1} value={this.state.user} onChange={(val) => {
                    this.setState({ user: val });
                  }}>
                  <List.Item arrow="horizontal">处理人</List.Item>
                </Picker>
                <Picker data={users} cols={1} value={this.state.participantUser} onChange={(val) => {
                    this.setState({ participantUser: val });
                  }}>
                  <List.Item arrow="horizontal">流程关注人</List.Item>
                </Picker>
              </List>
              <List renderHeader={() => (
                <View >
                  <WhiteSpace/>
                    <WingBlank style={{ flexDirection:'row', justifyContent: 'space-between' }}>
                      <View><Text>处理意见</Text></View>
                      <TouchableOpacity onPress={this.onPressComment}>
                        <View style={{ borderColor:'#CCC', borderWidth:1, borderRadius:3 }}>
                          <Text>常用意见</Text>
                        </View>
                      </TouchableOpacity>
                    </WingBlank>
                  <WhiteSpace/>
                </View>)}>
                <TextareaItem
                  clear
                  rows={3}
                  count={100}
                  value={this.state.comment}
                  onChange={
                    (val) => this.setState({ comment: val})
                  }
                />
              </List>
              <WhiteSpace size="sm" />
              <List.Item>
                <Button type="primary" inline onClick={this.loadingToast}>提交申请单</Button>
              </List.Item>
            </ScrollView>
          </View>
        </View> 
      </View>
     
    );
  }
}

HandleTask.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectHandleTask();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HandleTask);
