import React from 'react';
import ReactDOM from 'react-dom';
import ContractLink from './ContractLink';
import { Table, Pagination, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import formatter from 'utils/formatter.js';

/** 合同表格 */
class ContractTable extends React.Component {
  static propTypes = {
    onPageChange: React.PropTypes.func,
    onSearch: React.PropTypes.func,
    current: React.PropTypes.number,
    items: React.PropTypes.number,
    search: React.PropTypes.string,
  }

  generateViewContractUrl(data) {
    return (<ContractLink poNo={data.poNo} id={data.systemId} code={data.systemCode} />);
  }

  render() {
    const generateViewContractUrl = this.generateViewContractUrl;
    const onSearch = this.props.onSearch;
    return (
      <div>
        <InputGroup style={{ width: '50%', float: 'right', marginTop: '1em', marginBottom: '1em' }}>
          <FormControl type="text" value={this.props.search} onChange={(e) => onSearch(e.target.value)} placeholder='合同代码'/>
          <InputGroup.Addon>
            <Glyphicon glyph="search" />
          </InputGroup.Addon>
        </InputGroup>
        <Table >
          <thead>
            <tr>
              <th style={{ width: '15%' }}>合同名称</th>
              <th style={{ width: '40%' }}>合同描述</th>
              <th style={{ width: '15%' }}>所属部门</th>
              <th style={{ width: '15%' }}>合同总金额</th>
              <th style={{ width: '15%' }}>累计完成比</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.contract.map(function (x, index) {
                return (<tr key={index}>
                  <td>{ generateViewContractUrl(x) }</td>
                  <td>{ x.description }</td>
                  <td>{ x.departmentDesc }</td>
                  <td>{ formatter.formatMoney(x.totalAmount) }</td>
                  <td>{ formatter.formatPercent(x.completionRatio) }</td>
                </tr>);
              })
            }
          </tbody>
        </Table>
        <Pagination
          style={{ float: 'right' }}
          prev
          next
          first
          last
          ellipsis
          boundaryLinks
          items={this.props.items}
          maxButtons={5}
          activePage={this.props.current}
          onSelect={this.props.onPageChange} />
      </div>
    );
  }


}

export default ContractTable;
