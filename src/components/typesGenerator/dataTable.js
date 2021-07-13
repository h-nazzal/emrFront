import React, { Component } from 'react'
import DataTable from 'react-data-table-component'
import './dataTable.css'

class DataTableComp extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const tableData = {
      columns: this.props.columns,
      data: this.props.data
    }
    return (
      <div>
        {console.log('the data' + tableData)}
        {this.props.handleRowDoubleClicked ? (
          <DataTable
            onRowDoubleClicked={row => this.props.handleRowDoubleClicked(row)}
            title={` ${this.props.title}`}
            columns={this.props.columns}
            data={this.props.data}
          />
        ) : (
          <DataTable
            title={` ${this.props.title}`}
            columns={this.props.columns}
            data={this.props.data}
          />
        )}
      </div>
    )
  }
}

export default DataTableComp
