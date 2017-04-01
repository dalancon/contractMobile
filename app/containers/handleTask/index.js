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
  Dimensions,
  findNodeHandle,
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
  Modal,
  Result, } from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
import makeSelectHandleTask from './selectors';
import formatter from '../../utils/formatter';

import commonStyle from '../styles';

import {
  defaultAction,
  fetchOutgoing,
  fetchOpinions,
  setForm,
  handleTask,
} from './actions';

const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;

class HandleTask extends Component {
  _back = () => {
    this.props.dispatch(defaultAction());
    this.props.router.pop();
  }

  _backToMain = () => {
    this.props.dispatch(defaultAction());
    this.props.router.navigator.popToRoute(this.props.router.navigator.getCurrentRoutes()[1]);
  }

  componentDidMount() {
    const { businessId , taskId, activityId, processInstanceId, processDefinitionId } = this.props;

    this.props.dispatch(fetchOutgoing(businessId, taskId, activityId, processInstanceId, processDefinitionId));
    this.props.dispatch(fetchOpinions());
  }

  onPressComment = () => {
    const data = this.props.opinions.map((x) => { 
      return {value: x.id, label: x.title };
    });
    const { comment } = this.props.form;
    Popup.show(
      <List renderHeader={() => (
        <View style={{ backgroundColor:'#eee'}}>
          <WhiteSpace/>
            <WingBlank style={{ flexDirection:'row', justifyContent: 'space-between' }}>
              <View><Text style={{ fontSize:14 }}>常用意见</Text></View>
            </WingBlank>
          <WhiteSpace/>
        </View>)}
      >
        {
          data.map(i => (
            <RadioItem key={i.value} checked={comment === i.label}
              onChange={() => { 
                this.props.dispatch(setForm({ comment: i.label }));
                Popup.hide();
              }}>
              {i.label}
            </RadioItem>
          ))
        }
      </List>, { animationType: 'slide-up' , maskClosable: true });
  }

  findOutGoing() {
    const outGoingId = this.props.form.outGoingId;
    return this.props.outgoing.find(function (x) {
      return x.id == outGoingId;
    });
  }

  _reset() {
    this.refs.scrollView.scrollTo({ y: 0 });
  }

  _onFocus(refName) {
    let scrollResponder = this.refs.scrollView.getScrollResponder();      
    setTimeout(()=> {
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        100, 
        true);
    }, 100);
  }

  renderFlow = () => {
    const data = this.props.outgoing.map((x) => { return {value: x.id, label: x.name}; });

    let users = this.findOutGoing() ? this.findOutGoing().users.map((u) => { return {value:u.id, label:u.userName}; }) : [];

    users = [{ value:'', label:'请选择' }].concat(users);

    const alert = Modal.alert;

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }} ref="scrollView" >
        <List ref="next" renderHeader={() => '下一环节'}>
          {data.map(i => (
            <RadioItem key={i.value} checked={this.props.form.outGoingId === i.value} onChange={() => this.props.dispatch(setForm({ outGoingId: i.value , userId: ''}))}>
              {i.label}
            </RadioItem>
          ))}
        </List>
        <List renderHeader={() => '人员'}>
          <Picker disabled={!this.props.form.outGoingId} data={users} cols={1} value={[ this.props.form.userId ]} onChange={(val) => this.props.dispatch(setForm({ userId: val[0] })) }>
            <List.Item arrow="horizontal">处理人</List.Item>
          </Picker>
        </List>
        <List ref='textarea' renderHeader={() => '意见'} >
          <TextareaItem
            clear
            rows={3}
            count={100}
            value={this.props.form.comment}
            onFocus={this._onFocus.bind(this, 'textarea')}
            onBlur={this._reset.bind(this)}
            onChange={
              (val) => this.props.dispatch(setForm({ comment: val }))
            }
          />
          <List.Item>
            <TouchableOpacity onPress={this.onPressComment}>
                <Text style={{ color: '#108EE9'}}>常用意见</Text>
            </TouchableOpacity>
          </List.Item>
        </List>
        <WhiteSpace size="sm" />
        <View style={{ margin: 10 }}>
          <Button type="primary" inline onClick={() => alert('提交', '确定提交么?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => { 
                if(this.validateForm()) {
                  Toast.loading('正在提交...', 1, () => {
                    let form = {
                      processInstanceId: this.props.processInstanceId,
                      taskId: this.props.taskId,
                      businessId: this.props.businessId,
                    };
                    this.props.dispatch(handleTask(Object.assign({}, form, this.props.form)));
                  }); 
                }
              }, style: { fontWeight: 'bold' } },
          ])}>提交申请单</Button>
          </View>
      </ScrollView>
    );
  }

  renderResult() {
    if(this.props.result){
      return (<Result imgUrl={require('../../public/imgs/success.png')} title='处理成功' message='审批支付单成功' ></Result>);
    } else {
      return (<Result imgUrl={require('../../public/imgs/delete.png')} title='处理失败' message='审批支付单失败' ></Result>)
    }
  }

  validateForm = () => {
    if(!this.props.form.outGoingId){
      Toast.info('请选择下一环节！！！')
      return false;
    }
    if(!this.props.form.userId) {
      Toast.info('请填写处理人！！！')
      return false;
    }
    return true;
  }

  render() {
    if(this.props.complete){
      return (
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <TouchableOpacity style={[ commonStyle.headerLeftIcon ]} onPress={this._backToMain}>
              <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
            </TouchableOpacity>
            <Text style={[commonStyle.headerTitle]} numberOfLines={1}>处理结果</Text>
          </View>
          {
            this.renderResult()
          }
        </View> 
      );
    } else { 
      return (
        <View style={[commonStyle.wrapper]}>
          <View style={[commonStyle.header]}>
            <TouchableOpacity style={[ commonStyle.headerLeftIcon ]} onPress={this._back}>
              <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
            </TouchableOpacity>
            <Text style={[commonStyle.headerTitle]} numberOfLines={1}>处理</Text>
          </View>
            {
              this.renderFlow()
            }
        </View> 
      );
    }
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
