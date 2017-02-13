import React from 'react'

// 合同基本信息
class ContractBasicInfo extends React.Component {
  static propTypes = {
    contract: React.PropTypes.shape({
      project: React.PropTypes.string,
      projectDesc: React.PropTypes.string,
      poNo: React.PropTypes.string,
      description: React.PropTypes.string,
      department: React.PropTypes.string,
      departmentDesc: React.PropTypes.string,
      company: React.PropTypes.string,
      comDesc: React.PropTypes.string
    })
  }

  render () {
    return (
      <div className='form-horizontal'>
        <div className='form-group'>
          <label className='control-label col-md-2'>工程：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.project ? this.props.contract.project : '-'
            }
            </p>
          </div>
          <label className='control-label col-md-2'>工程描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.projectDesc ? this.props.contract.projectDesc : '-'
            }
            </p>
          </div>
        </div>

        <div className='form-group'>
          <label className='control-label col-md-2'>合同代码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.poNo ? this.props.contract.poNo : '-'
            }
            </p>
          </div>
          <label className='control-label col-md-2'>合同名称：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.description ? this.props.contract.description : '-'
            }
            </p>
          </div>
        </div>

        <div className='form-group'>
          <label className='control-label col-md-2'>所属部门编码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.department ? this.props.contract.department : '-'
            }
            </p>
          </div>
          <label className='control-label col-md-2'>所属部门描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.departmentDesc ? this.props.contract.departmentDesc : '-'
            }
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label className='control-label col-md-2'>承包单位编码：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.company ? this.props.contract.company : '-'
            }
            </p>
          </div>
          <label className='control-label col-md-2'>承包单位描述：</label>
          <div className='col-md-4'>
            <p className='form-control-static'>
            {
              this.props.contract && this.props.contract.comDesc ? this.props.contract.comDesc : '-'
            }
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default ContractBasicInfo
