import React from 'react';
import { Table } from 'react-bootstrap';

const SharedTable = ({columns,data})=>{
    return(
        <Table variant='dark' striped bordered hover responsive>
            <thead>
                <tr>
                    {columns.map(col=>(
                        <th>{col.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    data.map(row=>(
                        <tr>
                          {columns.map(col=>{
                              switch (col.type) {
                                case 'single':
                                    return <td>{row[col.name]}</td>              
                                case 'merge':
                                    let split = col.name.split(',')
                                    return (
                                        <td>{
                                            split.map(val=>{
                                                return row[val] + " "
                                            })
                                            }
                                        </td>
                                    )  

                              }
                            
                            })}
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}

export default SharedTable;