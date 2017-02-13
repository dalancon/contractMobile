import React from 'react'
// 引用第三方JS包、CSS文件
import './style.scss'

/** MyComponent */
class MyComponent extends React.Component {
  // 上一级传如果属性
  static propTypes = {}

  // 构造函数定义控件状态
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  // 控件将要加载
  componentWillMount () {}

  // 控件已经加载
  componentDidMount () {}

  // 控件接收到属性的变化
  componentWillReceiveProps (nextProps) {}

  // 控件完成更新
  componentDidUpdate (prevProps, prevState) {}

  // 自定义方法
  myMethod () {}

  // 渲染页面函数
  render () {
    return (
      <div />
    )
  }
}

MyComponent.defaultProps = {}

export default MyComponent
