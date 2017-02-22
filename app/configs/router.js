'use strict';
import React, { Navigator } from 'react-native';
// Pages
import LoginPage from '../containers/login';
import MainPage from '../containers/main';
import ExamineContract from '../containers/examineContract';

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

    toExamine(props) {
      this.push(props, {
        page: ExamineContract,
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

