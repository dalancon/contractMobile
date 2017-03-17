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
  Button,
  Modal, } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectHandleTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

import {
  fetchOutgoing,
  fetchOpinions,
  setForm,
} from './actions';

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

class HandleTask extends Component {
  _back = () => {
    this.props.router.pop();
  }

  componentDidMount() {
    const { businessId , taskId, activityId, processInstanceId, processDefinitionId } = this.props;

    this.props.dispatch(fetchOutgoing(businessId, taskId, activityId, processInstanceId, processDefinitionId));
    this.props.dispatch(fetchOpinions());
  }

  onPressComment = () => {
    const data = this.props.opinions.map((x) => { return {value: x.id, label: x.title}; });

    const { comment } = this.props;

    Popup.show(
        <List renderHeader={() => (
          <View style={{ backgroundColor:'#eee'}}>
            <WhiteSpace/>
              <WingBlank style={{ flexDirection:'row', justifyContent: 'space-between' }}>
                <View><Text style={{ fontSize:14 }}>常用意见</Text></View>
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
        </List>, { animationType: 'slide-up' , maskClosable: true });
  }

  loadingToast = () => {
    
  }

  render() {
    console.log('HandleTask:', this.props);

    const data = this.props.outgoing.map((x) => { return {value: x.id, label: x.name}; });

    const users = this.props.outgoing[0]?this.props.outgoing[0].users.map((u) => { return {value:u.id, label:u.userName}; }):[];

    const alert = Modal.alert;

    const loadingToast = { this };

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <TouchableOpacity style={[ commonStyle.headerLeftIcon ]} onPress={this._back}>
              <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
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
                  <RadioItem key={i.value} checked={this.props.form.outgoingValue === i.label} onChange={() => this.props.dispatch(setForm({ outgoingValue: i.label }))}>
                    {i.label}
                  </RadioItem>
                ))}
              </List>
              <List renderHeader={() => '人员'}>
                <Picker data={users} cols={1} value={this.props.form.user} onChange={(val) => this.props.dispatch(setForm({ user: val })) }>
                  <List.Item arrow="horizontal">处理人</List.Item>
                </Picker>
                <Picker data={users} cols={1} value={this.props.form.participantUser} onChange={(val) => this.props.dispatch(setForm({ participantUser: val })) }>
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
                  value={this.props.comment}
                  onChange={
                    (val) => this.setState({ comment: val})
                  }
                />
              </List>
              <WhiteSpace size="sm" />
              <List.Item>
                <Button type="primary" inline onClick={() => alert('提交', '确定提交么?', [
                  { text: '取消', onPress: () => console.log('cancel') },
                  { text: '确定', onPress: () => { Toast.loading('正在提交...', 1, () => {
                    this.props.router.toMain();
                  }); }, style: { fontWeight: 'bold' } },
                ])}>提交申请单</Button>
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
