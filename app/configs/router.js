'use strict';
import React, { Navigator } from 'react-native';
// Pages
import LoginPage from '../containers/login';
import MainPage from '../containers/main';
import ExaminePayment from '../containers/examinePayment';
import ApplyPayment from '../containers/applyPayment';
import PoItem from '../containers/poItem';
import ContractDetails from '../containers/contractDetails';
import HanleTask from '../containers/handleTask';
import ParticipantTask from '../containers/participantTask';
import PassTask from '../containers/passTask';
import HistoryTask from '../containers/historyTask';
import TodoTask from '../containers/todoTask';
import Preview from '../containers/preview';
import PreviewDoc from '../containers/previewDoc';
import CheckNetStatus from '../components/checkNetStatus';

// Config
const sceneConfig = require('./sceneConfig')

const customFloatFromRight = sceneConfig.customFloatFromRight;

class Router {
  constructor(navigator) {
      this.navigator = navigator
  }

  push(props, route) {
    let routesList = this.navigator.getCurrentRoutes()
    let nextIndex = routesList[routesList.length - 1].index + 1
    route.props = props
    route.index = nextIndex
    this.navigator.push(route)
  }

  pop() {
    this.navigator.pop()
  }

  toCheckNetStatus(props) {
    this.push(props, {
      page: CheckNetStatus,
      name: 'checkNetStatus-page',
    })
  }

  toPassTask(props) {
    this.push(props, {
      page: PassTask,
      name: 'contractDetails-page',
    })
  }

  toParticipantTask(props) {
    this.push(props, {
      page: ParticipantTask,
      name: 'contractDetails-page',
    })
  }

  toHistoryTask(props) {
    this.push(props, {
      page: HistoryTask,
      name: 'contractDetails-page',
    })
  }

  toTodoTask(props) {
    this.push(props, {
      page: TodoTask,
      name: 'contractDetails-page',
    })
  }

  toContractDetails(props) {
    this.push(props, {
      page: ContractDetails,
      name: 'contractDetails-page',
    })
  }

  toPreview(props) {
    this.push(props, {
      page: Preview,
      name: 'preview-page',
    })
  }

  toPreviewDoc(props) {
    this.push(props, {
      page: PreviewDoc,
      name: 'preview-page',
    })
  }

  toExamine(props) {
    this.push(props, {
      page: ExaminePayment,
      name: 'examineContract-page',
    })
  }

  toApply(props) {
    this.push(props, {
      page: ApplyPayment,
      name: 'applyContract-page',
    })
  }

  toPoItem(props) {
    this.push(props, {
      page: PoItem,
      name: 'poItem-page',
    })
  }

  toLogin(props){
    this.push(props, {
      page: LoginPage,
      name: 'login-page',
    })
  }

  toMain(props){
    this.push(props, {
      page: MainPage,
      name: 'main-page',
      sceneConfig: Navigator.SceneConfigs.FadeAndroid,
    })
  }

  toScence(scenceName, props) {
    switch(scenceName) {
      case 'examinePayment':
        return this.toExamine(props);
      default:
        return;
    }
  }

  toHandleTask(props) {
    this.push(props, {
      page: HanleTask,
      name: 'handleTask-page',
    });
  }

  replaceWithHome() {
    this.navigator.popToTop()
  }

  resetToLogin(){
    this.navigator.resetTo({
      name: 'login-page',
      page: LoginPage,
    })
  }
}

module.exports = Router

