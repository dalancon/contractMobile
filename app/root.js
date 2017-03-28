import React, { Component } from 'react';
import { Navigator, AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import Router from './configs/router';

import LoginPage from './containers/login';
import MainPage from './containers/main';



class Root extends Component {

  constructor(props, context) {
    super(props, context); 

    this.state = {
      init: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('oaAccount', (err, oaAccount) => {
      let initialRoute = {
        name: 'login-page',
        page: LoginPage,
      };

      if(oaAccount) {
        initialRoute = {
          name: 'main-page',
          page: MainPage,
          props: {
            oaAccount: oaAccount,
            logined: false,
          }
        };
      }

      this.setState({
        init: true,
        initialRoute: initialRoute,
      })
    });
  }

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
      return Navigator.SceneConfigs.FloatFromRight;
  }

  render() {
    console.log('render:', this.state.initialRoute);
    if(!this.state.init) {
      return <View></View>;
    }

    return (<Navigator 
      ref={view => this.navigator=view}
      initialRoute={this.state.initialRoute}
      configureScene={this.configureScene.bind(this)}
      renderScene={this.renderScene.bind(this)}
    />);  

    
  }
}

export default Root;
