import React from 'react';

export class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  getTableRow(data, index) {
    return (
      <tr key={index}>
      {this.props.tableHeaders.map(function(header, index) {
        let value = data;
        if (header.index) {
          value = data[header.index];
        }

        if (header.callback) {
          value = header.callback(value);
        }

        return <td key={index}>{value}</td>
      })}
      </tr>
    );
  }

  render() {
    return (
      <table className="table">
        <thead className="table-thead">
          <tr>{this.props.tableHeaders.map(function(header, index) {
            return <td key={index}>{header.label}</td>;
          })}</tr>
        </thead>
        <tbody className="table-tbody">
          {this.props.tableData.map(this.getTableRow.bind(this))}
        </tbody>
      </table>
    );
  }
}
