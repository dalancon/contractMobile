import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


import { fetchAccountingCode } from 'apis/contract';

/** 打印质保金*/
class ReportFormGuarantee extends React.Component {
  static propTypes = {
    businessId: React.PropTypes.string,
    opinions: React.PropTypes.array,
    onClickCancel: React.PropTypes.func,
    onReport: React.PropTypes.func,
    reportCode: React.PropTypes.array,
    validStatus: React.PropTypes.bool,
    pReportCode: React.PropTypes.string,
    printUrl: React.PropTypes.string,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      step: 0,
      validStatus: false,
      accountingCode: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    $('.selectpicker').selectpicker({
      showContent: true,
      width: '100%',
      // noneSelectedText:'<span class='opinion-not-insert'>[未填处理意见]<span>'
    });
  }

  // componentDidMount() {
  //   this.fetchReportCode();
  // }

  vaildateForm() {
    this.setState({ validStatus: true });
    return (this.state.pReportCode !== '');
  }

  // 提交打印请求
  submitForm = () => {
    const component = this;
    if (this.vaildateForm()) {
      component.props.onReport();
      $.ajax({
        cache: true,
        type: this.refs.form.method,
        url: this.refs.form.action,
        data: $(this.refs.form).serialize(),
        async: true,
        success: function (result) {
          component.props.onClickCancel();
          window.open(result);
        }
      });
    }
  }

  getActivityList() {
    const s = [];
    const result = [];
    const component = this;

    this.props.opinions.forEach(function (x) {
      if (s.indexOf(x.activityId) < 0) {
        s.push(x.activityId);
      }
    });

    s.forEach(function (x) {
      result.push(component.props.opinions.filter(function(y) {
        return y.activityId === x;
      }));
    });
    return result;
  }

  reportCodeErrorMsg() {
    if (this.state.validStatus === true) {
      if (this.state.pReportCode === '') {
        return '报表输出样式必填';
      }
    }
  }

  // fetchReportCode () {
  //   this.serverRequest = $.post('/qdp/qdp/permisstion/queryMap.do?' +
  //   'strategyId=5&CONTEXT_code=TGPMSREPORTCODE&CONTEXT_notEqualCode=null', function (result) {
  //     this.setState({
  //       reportCode: [{CODE: null, DESCRIPTION: null}].concat(result.rows)
  //     })
  //   }.bind(this), 'json')
  // }

  getOptions = (input, callback) => {
    const systemCode = this.props.businessId.split('||')[0];
    fetchAccountingCode(input, systemCode).then(function(response) {
      return response.json();
    }).then(function(result) {
      const data = result.map(function (x, i) { return { value: x.code, label: x.description }});
      callback(null, {
        options: data,
        complete: true,
        cache: false,
      });
    }).catch(function(e) {
      console.log("Oops, error");
    });

    // setTimeout(function () {
    //   $.get('/qdp/payment/accountingCode/query', {search: input, systemCode: systemCode}, )
    // }, 500)
  }

  selectAccountingCode = (val) => {
    var accountingCode = { code: val.value, description: val.label };
    this.setState({ accountingCode: accountingCode });
  }

  setReportCode = (e) => {
    this.setState({ pReportCode: e.target.value });
  }

  addStep = (e) => {
    if (this.state.step < 1) {
      this.setState({
        step: this.state.step + 1,
      });
    }
  }

  minusStep = (e) => {
    if (this.state.step > 0) {
      this.setState({
        step: this.state.step - 1,
      });
    }
  }

  render() {
    console.log('reportFormGuarantee:', this.props);
    return (
      <form ref="form" action="/qdp/payment/report/guarantee" method="post">
        <input name="businessId" type="hidden" value={this.props.businessId} />
        <div className={this.state.step === 0 ? 'container-fluid' : 'container-fluid hide'}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>环节</th>
                <th style={{ width: '70%' }}>处理意见</th>
              </tr>
            </thead>
            <tbody className={this.props.loaded ? '' : 'hidden'}>
              {
                this.getActivityList().map(function (x, index) {
                  return (
                    <tr key={index}>
                      <td>{x[0].activityName}</td>
                      <td>
                        <select className='selectpicker' name={x[0].reportParameter}
                          style={{ maxWidth: '500px', width: '100%' }}>
                          {
                            x.map(function (op, i) {
                              return (
                                <option key={i} value={op.processtime + '||' + op.opinion + '||' + op.name}
                                  data-subtext={op.processtime + ' by ' + op.name}>
                                {op.opinion ? op.opinion : '——'}
                                </option>
                              )
                            })
                          }
                        </select>
                      </td>
                    </tr>)
                })
              }
            </tbody>
          </table>
          <div style={{height: '100px'}} className={this.props.loaded ? 'hidden' : 'payment-mask'} />
          <div className='form-group'>
            <label className='control-label'>是否打印处理时间:</label>
            <label className='radio-inline'>
              <input type='radio' name='p_prtTimeFlg' defaultValue='true' defaultChecked />是
            </label>
            <label className='radio-inline'>
              <input type='radio' name='p_prtTimeFlg' defaultValue='false' />否
            </label>
          </div>
        </div>
        <div className={this.state.step === 1 ? 'container-fluid' : 'container-fluid hide'}>
          <div className='form-group'>
            <label className='control-label'>往来科目</label>
            <Select.Async loadOptions={this.getOptions} 
              name='accountingCode' value={this.state.accountingCode.code} placeholder='请输入编码或描述'
              onChange={this.selectAccountingCode} />
          </div>
          <div className='form-group'>
            <label className='control-label'>报表输出样式:
              <label className='error' style={{marginLeft: '2em'}}>
              { this.reportCodeErrorMsg() }
              </label>
            </label>
            <select className='form-control' name='reportCode' onClick={this.setReportCode}>
              {
                this.props.reportCode.map(function (x, i) {
                  return (<option key={i} value={x.CODE}>{x.DESCRIPTION}</option>)
                })
              }
            </select>
          </div>
        </div>
        <div className='row' style={{marginTop: '10px'}}>
          <div className={this.state.step === 1 ? 'hide col-md-6' : 'col-md-6'}>
            <button type='button' onClick={this.addStep}
              className='btn btn-default payment-button btn_payment_next'>下一步</button>
          </div>
          <div className={this.state.step === 0 ? 'hide col-md-4' : 'col-md-4'}>
            <button type='button' onClick={this.minusStep}
              className='btn btn-default payment-button btn_payment_prev'>上一步</button>
          </div>
          <div className={this.state.step === 0 ? 'hide col-md-4' : 'col-md-4'}>
            <button type='button' className='btn btn-default payment-button btn_payment_print'
              onClick={this.submitForm}>打印</button>
          </div>
          <div className={this.state.step === 0 ? 'col-md-6' : 'col-md-4'}>
            <button type='button' className='btn btn-default payment-button btn_payment_cancel'
              onClick={this.props.onClickCancel}>取消</button>
          </div>
        </div>
      </form>
    )
  }
}

export default ReportFormGuarantee
