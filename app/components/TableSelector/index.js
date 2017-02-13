import React from 'react';
import { Collapse } from 'react-bootstrap';
import GroupItem from './GroupItem';
import ConditionTag from './ConditionTag';
import classNames from 'classnames';
import './style.scss';

class TableSelector extends React.Component {
  static propTypes = {
    catpath: React.PropTypes.shape({
      text: React.PropTypes.string,
    }),

    // 所有待选项目
    common: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        field: React.PropTypes.string.isRequired,
        required: React.PropTypes.bool,
        multiple: React.PropTypes.bool,
        sub: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            text: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired,
          })
        ),
      })
    ),

    // 选中的项目
    propSelected: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        field: React.PropTypes.string.isRequired,
        required: React.PropTypes.bool,
        multiple: React.PropTypes.bool,
        sub: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            text: React.PropTypes.string.isRequired,
            value: React.PropTypes.string.isRequired,
          })
        ),
      })
    ),
    expand: React.PropTypes.bool,
    total: React.PropTypes.number,
    onPropChange: React.PropTypes.func,
    // onToggleExpand: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      expand: true,  // 是否展开筛选
      propSelected: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      'propSelected': nextProps.propSelected,
      'expand': nextProps.expand,
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate')
  //   if(!Object.is(nextState.propSelected, this.state.propSelected) || nextState.expand !== this.state.expand){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  selectCondition = (field, value) => {
    const condition = Object.assign({}, this.props.common.filter((x) => x.field === field)[0]);
    condition.sub = condition.sub.filter((x) => value.some((v) => v === x.value));
    this.addCondition(condition);
  }

  unSelectCondition = (field, value) => {
    const condition = Object.assign({}, this.props.common.filter((x) => x.field === field)[0]);
    condition.sub = condition.sub.filter((x) => value.some((v) => v === x.value));
    this.removeCondition(condition);
  }

  removeCondition(condition) {
    if (this.state.propSelected.filter((x) => x.field === condition.field).length !== 0) {
      const propSelected = this.state.propSelected.filter((x) => x.field !== condition.field);
      this.setState({ 'propSelected': propSelected });
      this.props.onPropChange(propSelected);
    }
  }

  addCondition(condition) {
    let propSelected;
    if (this.state.propSelected.filter((x) => { return x.field === condition.field }).length !== 0) {
      propSelected = this.state.propSelected.map((x) => {
        if (x.field === condition.field) {
          return condition;
        } else {
          return x;
        }
      });
      this.setState({ 'propSelected': propSelected });
     // this.props.onPropChange(propSelected);
    } else {
      propSelected = this.state.propSelected.concat([condition]);
      this.setState({ 'propSelected': propSelected });
    }
    this.props.onPropChange(propSelected);
  }

  toggleConditions = () => {
    this.setState({ expand: !this.state.expand });
    // this.props.onToggleExpand(this.state.expand);
  }

  render() {
    const component = this;
    const propSelected = this.state.propSelected;

    const toggleClasses = classNames({
      'show-collapse': this.state.expand,
      'J_ToggleNav': true,
      'icon-tag': true,
      'toggle-btn': true,
    });

    return (
      <div className="m-nav">
        <div className="crumb g-clearfix">
          <a className={toggleClasses} onClick={this.toggleConditions}>
            <span className="expand">
              <span>显示筛选</span><span className="glyphicon glyphicon-menu-down" />
            </span>
            <span className="collapse">
              <span>隐藏筛选</span><span className="glyphicon glyphicon-menu-up" />
            </span>
          </a>
          <span className="cat-text">{this.props.catpath.text}</span>
          <span className="glyphicon glyphicon-menu-right" />
          {
            (propSelected || []).map(function (cond, index) {
              const candidate = component.props.common.filter((x) => { return x.field === cond.field })[0].sub
              return (
                <ConditionTag key={index} condition={cond} candidate={candidate}
                  onSelectCondition={component.selectCondition} onUnSelectCondition={component.unSelectCondition} />
              )
            })
          }
          <span className="total">共<span className="m-nav-total-num">{this.props.total}</span>条记录</span>
        </div>
        <Collapse in={this.state.expand}>
          <div className="groups J_NavGroup">
          {
            this.props.common.map(function (cond, index) {
              /* 如果条件是非必须的 且 没有出现在propSelected当中渲染出来 */
              if (cond.required !== true && (propSelected || []).every((x) => { return x.field !== cond.field })) {
                return (
                  <GroupItem key={index} condition={cond} onSubmit={component.selectCondition} />)
              }
            })
          }
          </div>
        </Collapse>
      </div>
    );
  }
}

TableSelector.defaultProps = {
  catpath: {
    text: '条件',
  },
  common: [{
    text: '条件显示名称',
    field: '条件对应字段',
    required: false,
    multiple: false,
    sub: [],
  }],
  propSelected: [],
  total: 0,
  onPropChange: function (propSelected) {
    console.log(propSelected);
  },
};

export default TableSelector
