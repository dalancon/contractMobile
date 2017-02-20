import React, { PropTypes, Component } from 'react';
import {   
  StyleSheet,
  Text,
  View,
  Navigator, } from 'react-native';
import { TabBar, Icon, SearchBar }from 'antd-mobile';

import {connect} from 'react-redux';
import NavigatorBar from 'react-native-navbar';
// import Icon from 'react-native-vector-icons/Ionicons';

// import { TabBar, Icon, SearchBar }from 'antd-mobile'; 

// import { TabBarItem } from 'antd-mobile/lib/tab-bar/TabBarItem';

import makeSelectTodoPage from './selectors';



class TodoPage extends Component {
	render() {
		return (<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <SearchBar placeholder="搜索" />
    </View>);
	}
}

TodoPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectTodoPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);
