import React, { PropTypes, Component } from 'react';

import {   
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import {
  ActivityIndicator 
} from 'antd-mobile';

import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'ImageViewer';
import OpenFile from 'react-native-doc-viewer';

import config from '../../apis/constants';

import { connect } from 'react-redux';
import makeSelectPreviewDoc from './selectors';

import commonStyle from '../styles';

import { fetchPreview, fetchSource } from './actions';

class PreviewDoc extends Component {

  // constructor(props){
  //   super(props);
  //   this.state = {
  //     isPdfDownload: false,
  //   }
  // }

  // _back = () => {
  //   this.props.router.pop();
  // }

  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.preview || nextProps.preview !== this.props.preview) {
  //     if(this.descideFileType(nextProps.preview) == 'text') {
  //       this.props.dispatch(fetchSource(nextProps.preview));
  //     }
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if(nextProps.preview || nextProps.preview !== this.props.preview) {
      OpenFile.openDoc([{
        url: `${config.baseUrl}/qdp/qdp/${nextProps.preview}`,
        fileName: nextProps.file.fileShowName,
      }], (error, url) => {
        if(error) {
          console.error(error);
        } else {
          console.log(url);
        }
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchPreview(this.props.file.remarkText));
  }

  // descideFileType(file) {
  //   if(/(doc(x)?|xls(x)?|ppt(x)?)$/i.test(file)) {
  //     return 'office';
  //   } else if (/(gif|jp(e)?g|png)$/i.test(file)) {
  //     return 'picture';
  //   } else if(/txt$/i.test(file)) {
  //     return 'text';
  //   } else if(/pdf$/i.test(file)) {
  //     return 'pdf';
  //   }
  // }

  // renderPreview = (type) => {
  //   if(type === 'pdf') {
  //     return (
  //       <WebView
  //         style={{
  //           flex: 1,
  //         }}
  //         scrollEnable={ true }
  //         source={{
  //           uri: `${config.baseUrl}/qdp/qdp/pdf/web/viewer.html?file=../../${this.props.preview}`
  //         }}
  //       >
  //       </WebView>)
  //   }else if(type === 'text') {
  //     return (
  //       <WebView
  //         style={{
  //           flex: 1,
  //         }}
  //         scrollEnable={ true }
  //         source={{
  //           html: this.props.source
  //         }}
  //       >
  //       </WebView>)
  //   }else if(type === 'picture') {
  //     const cell_w = Dimensions.get('window').width;
  //     const cell_h = Dimensions.get('window').height;
  //     console.log(`${config.baseUrl}/qdp/qdp/${this.props.preview}`);
  //     return (
  //       <View style={{
  //           flex: 1,
  //         }}>
  //         <ImageViewer 
  //           shown={true}
  //           imageUrls={[`${config.baseUrl}/qdp/qdp/${this.props.preview}`]}
  //           onClose={this._back}
  //           index={0} />
  //       </View> 
  //     )
  //   }else if(type === 'office') {
  //       returnOpenFile.openDoc([{
  //         url: `${config.baseUrl}/qdp/qdp/${this.props.preview}`,
  //         fileName: this.props.preview,
  //       }], (error, url) => {
  //         if(error) {
  //           console.error(error);
  //         } else {
  //           console.log(url);
  //         }
  //       });
  //       return;
  //     }
  //   }
  // }
  
  render() {
    console.log('preview:', this.props);

    const { remarkText }= this.props.file;
    // const type = this.descideFileType(remarkText);

    return (
       <View style={[ commonStyle.wrapper ]}>
        <View style={{ flex :1, backgroundColor:'#eee', justifyContent:'center', alignItems:'center' }}>
          <ActivityIndicator text="正在加载,请稍后" />
        </View>
      </View> 
    );
  }
}

PreviewDoc.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = makeSelectPreviewDoc();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDoc);
