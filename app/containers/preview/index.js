import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../apis/constants';

import {connect} from 'react-redux';
import makeSelectPreview from './selectors';

import commonStyle from '../styles';

import { fetchPreview, fetchSource } from './actions';

class Preview extends Component {

  constructor(props){
    super(props);
    this.state = {
      isPdfDownload: false,
    }
  }

  _back = () => {
    this.props.router.pop();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.preview || nextProps.preview !== this.props.preview) {
      if(this.descideFileType(nextProps.preview) == 'text') {
        this.props.dispatch(fetchSource(nextProps.preview));
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchPreview(this.props.file.remarkText))
  }

  descideFileType(file) {
    if(/(doc(x)?|xls(x)?|ppt(x)?)$/i.test(file)) {
      return 'office';
    } else if (/(gif|jp(e)?g|png)$/i.test(file)) {
      return 'picture';
    } else if(/txt$/i.test(file)) {
      return 'text';
    } else if(/pdf$/i.test(file)) {
      return 'pdf';
    }
  }

  renderPreview = (type) => {
    if(type === 'pdf') {
      return (
        <WebView
          style={{
            flex: 1,
          }}
          scrollEnable={ true }
          source={{
            uri: `${config.baseUrl}/qdp/qdp/pdf/web/viewer.html?file=../../${this.props.preview}`
          }}
        >
        </WebView>)
    }else if(type === 'text') {
      return (
        <WebView
          style={{
            flex: 1,
          }}
          scrollEnable={ true }
          source={{
            html: this.props.source
          }}
        >
        </WebView>)
    }
  }
  
  render() {
   //  console.log('preview:', this.props);

    const { remarkText }= this.props.file;
    const type = this.descideFileType(remarkText);

    return (
      <View style={[commonStyle.wrapper]}>
        <View style={[commonStyle.header]}>
          <TouchableOpacity style={[ commonStyle.headerLeftIcon ]} onPress={this._back}>
            <Icon name="ios-arrow-back" color='white' size={18}><Text style={{ color:'white', fontSize: 18 }}>返回</Text></Icon>
          </TouchableOpacity>
          <Text style={[commonStyle.headerTitle]} numberOfLines={1}>预览</Text>
        </View>
        {
          this.renderPreview(type)
        }
      </View> 
    );
  }
}

Preview.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectPreview();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
