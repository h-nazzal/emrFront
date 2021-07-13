import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import DataTableComp from "./dataTable";


const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    editable: true,

  },
  {
    name: 'Year',
    selector: 'year',
    sortable: true,
    right: true,
    editable: true,

  },
];
const sampleDataTable = () => {
    return (  
        <container>
            <row py-3>
                <col>
                    <h3>here is the title</h3>
                    <div>simple blah blah this the page and what it dose you know stuff...</div>
                </col>
            </row>

            <row py-3 >
            <div className="col-10"></div>
                <col sm={2}><Button variant="success"  onClick = {()=>{
                   this.setState({formType :"add"})
                  this.handleopenModal();
                }}>Add New</Button>{' '}</col>
            </row>
            <row py-3>

                <col sm={12}>
            <DataTable
               
                columns={columns}
                data={data}
      />
      </col>
            </row>
        </container>
    );
}
 
export default sampleDataCrud;




