import React from 'react';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    getTableRow(data, index) {
        return (
            <tr key={index}>
                {this.props.tableHeaders.map(function (header, index) {
                    let value = data;
                    if (header.index) {
                        value = data[header.index];
                    }

                    if (header.callback) {
                        value = header.callback(value);
                    }

                    return <td className="px-4 py-4 whitespace-nowrap" key={index}>{value}</td>;
                })}
            </tr>
        );
    }

    render() {
        return (
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>{this.props.tableHeaders.map(function (header, index) {
                        return <th className="py-3.5 px-4 text-left" key={index}>{header.label}</th>;
                    })}</tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {this.props.tableData.map(this.getTableRow.bind(this))}
                </tbody>
            </table>
        );
    }
}