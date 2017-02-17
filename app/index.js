'use strict';

import React, { Component } from 'react';
import {   
  StyleSheet,
  Text,
  View, } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store';

import Root from './root'; 

export default class App extends Component{
	constructor(){
		super();

		this.state = {
			store: configureStore(()=>{this.setState({ isLoading: false })})
		}
	}
	render(){
		return (
			<Provider store={this.state.store}>
				<Root />
			</Provider>
		)
	}
}
