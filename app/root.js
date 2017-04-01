import React, { Component } from 'react';
import { Navigator, AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import Router from './configs/router';

import LoginPage from './containers/login';
import MainPage from './containers/main';

class Root extends Component {
  renderScene({page, name, id, index, props}, navigator){
    this.router = this.router || new Router(navigator);
    if(page){
        return React.createElement(page, {
            ...props,
            ref: view => this[index] = view,
            router: this.router,
            name,
            route: {
              name,  id,  index
            }
        })
    }
  }

  configureScene(route){
    if(route.sceneConfig){
        return route.sceneConfig;
    }
    return  { ...Navigator.SceneConfigs.HorizontalSwipeJump, gestures: { pop: false }};
  }

  render() {
    let initialRoute = {
      name: 'login-page',
      page: LoginPage,
    };

    return (<Navigator 
      ref={view => this.navigator=view}
      initialRoute={initialRoute}
      configureScene={this.configureScene.bind(this)}
      renderScene={this.renderScene.bind(this)}
    />);  
  }
}

export default Root;
