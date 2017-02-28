'use strict';
import React, { Navigator } from 'react-native';
// Pages
import LoginPage from '../containers/login';
import MainPage from '../containers/main';
import ExaminePayment from '../containers/examinePayment';
import ContractDetails from '../containers/contractDetails';

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

    toContractDetails(props) {
      this.push(props, {
        page: ContractDetails,
        name: 'contractDetails-page',
        sceneConfig: customFloatFromRight,
      })
    }

    toExamine(props) {
      this.push(props, {
        page: ExaminePayment,
        name: 'examineContract-page',
        sceneConfig: customFloatFromRight
      })
    }

    toLogin(props){
      this.push(props, {
        page: LoginPage,
        name: 'login-page',
        sceneConfig: customFloatFromRight
      })
    }

    toMain(props){
      this.push(props, {
        page: MainPage,
        name: 'main-page',
        sceneConfig: customFloatFromRight
      })
    }

    replaceWithHome() {
        this.navigator.popToTop()
    }

    resetToLogin(){
        this.navigator.resetTo({
            name: 'login-page',
            page: LoginPage,
            //sceneConfig: customFloatFromRight,
        })
    }


}

module.exports = Router

