import React, { Component } from 'react';
import DataTableExtensions from "react-data-table-component-extensions";
import DataTable from 'react-data-table-component';
import "./dataTable.css";

class DataTableComp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    
    render() { 
        const tableData = {
            columns:this.props.columns,
            data :this.props.data
          };
        return ( 
            <DataTableExtensions {...tableData} //for filtering
            export = {false}
            print = {false}
            style={{width: "90%" }}
            
            >
              

             <DataTable
               title={` ${this.props.title}`}
               columns={this.props.columns}
               data={this.props.data}
               pagination
               highlightOnHover
               responsive={true}
             />
              </DataTableExtensions>
           
         );
    }
}
 
export default DataTableComp;