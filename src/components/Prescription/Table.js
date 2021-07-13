'use strict';

import Fab from '@material-ui/core/Fab';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import * as React from 'react';
import MyModal from './modal';
import Form from './PrescriptionForm';

const columns = [
  { field: 'id', headerName: 'ID', hide:true },
  { field: 'drugName', headerName: 'Drug', flex:1},
  { field: 'Quantity', headerName: 'Quantity',type:'number', flex:1 },
  {
    field: 'Duration',
    headerName: 'Duration',
    type: 'number',
    flex:1
  }

];
const { forwardRef, useRef, useImperativeHandle } = React;
const Table =  forwardRef((props,ref)=>{

    //initialize slection array
  const [selectionModel,setSelectionModel]=React.useState([]);
  const [open, setOpen] = React.useState(false);

  let fromdata= new FormData()
  
  const [rows,setRows] = React.useState([])

  React.useEffect(() => {

      if(props.prescription_rows && props.prescription_rows.length > 0)
      {
        setRows([...props.prescription_rows])

      }

}, [props.prescription_rows]);


    useImperativeHandle(ref, () => ({
      addRow(temp) {
        setRows([...temp]);
      },
    }));



    //event on select row function
    const handleRowSelection = (e)=>{
        if(e.isSelected)
        {
            // let temp = rows.filter(row=>row.id !== e.data.id)
            selectionModel.push(e.data)
            setSelectionModel([...selectionModel])
        }else{
            let index = selectionModel.findIndex(row=>row.id == e.data.id)
            if(index != -1)
            {
                selectionModel.splice(index,1)
                setSelectionModel([...selectionModel])
            }
        }
    }

    //handle Modal Open
    const handleOpen = () => {
        setOpen(true);
    };
    //handle Modal CLose
    const handleClose = () => {
        setOpen(false);
    };
    
    //delete rows function
    const DeleteRows = ()=>{
      if(selectionModel.length <= 0){
        return
      }
        let temp = [...rows]
        var index = -1
        var arr = []
        //remove the selection rows from all rows
        selectionModel.map(id=>{
          arr.push(id)
            index = temp.findIndex(r=>r.id == id)
            if(index != -1)
            {
                temp.splice(index,1)
            }
            return id
        })
        console.log(arr)
        //delete from database
        axios.post('http://localhost:8080/visit/deletePrescription_Drugs',{
          ids : arr
        }).then(res=>{
          setRows([...temp])
          props.DelteFromPDF(temp)
          alert("delted Successfully")
        }).catch(err=>{
          alert(err)
        })
        // console.log(temp)

    }
  return (
    <div>
      <MyModal open={open} handleClose={handleClose}>
         <Form ptId={props.ptId} PID={props.PID} add_row={props.add_row}/>
      </MyModal>
    <div style={{position:'relative', height: 400, width: '100%',backgroundColor:'#fff' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection  components={{
    Toolbar: GridToolbar,
  }}
  // onRowSelected={handleRowSelection}
    //   selectionModel={selectionModel}
      onSelectionModelChange={(newSelection)=>{
          setSelectionModel(newSelection.selectionModel)
      }}
/>
      <div style={{ margin: "0 auto",textAlign:"center"}}>
          <Fab color="primary"  aria-label="add"  onClick={()=>handleOpen()}>
             <AddIcon  />
          </Fab> 
        </div>
        <div style={{ position:'absolute',top:0,right:0,textAlign:"center"}}>
          <Fab color="primary"  aria-label="add" onClick={()=>DeleteRows()} >
             <DeleteIcon  />
          </Fab> 
        </div>
    </div>
    </div>
  );
}) 
export default Table