/*
 *
 * Layout
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { makeSelectToolbarBtns, makeSelectLoginUser, makeSelectMenu } from './selectors';
import messages from './messages';

import PaymentToolbar from 'components/PaymentToolbar';
import PaymentNav from 'components/PaymentNav';
import PaymentFooter from 'components/PaymentFooter';

import { fetchUser, initToolbar, initPages } from './actions';

import './icons.scss';
import './styles.scss';

export class Layout extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.element,
    loginUser: React.PropTypes.object,
    toolbarBtns: React.PropTypes.arrayOf(React.PropTypes.shape({
      tip: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      split: React.PropTypes.bool,
      badge: React.PropTypes.number,
    })),
    menu: React.PropTypes.arrayOf(React.PropTypes.shape({
      titie: React.PropTypes.string,
      url: React.PropTypes.string,
      children: React.PropTypes.array,
    })),
  }

  componentDidMount() {
    // console.log('componentDidMount', this.props);
    this.props.dispatch(fetchUser());
    this.props.dispatch(initToolbar());
  }

  render() {
    return (
      <div className='site'>
        <PaymentToolbar btns={this.props.toolbarBtns} />
        <PaymentNav loginUser={this.props.loginUser} pages={this.props.menu} />
        <div className='site-content'>
          {this.props.children && React.cloneElement(this.props.children, { loginUser: this.props.loginUser })}
        </div>
        <PaymentFooter />
      </div>
    );
  }
}

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toolbarBtns: makeSelectToolbarBtns(),
  loginUser: makeSelectLoginUser(),
  menu: makeSelectMenu(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
