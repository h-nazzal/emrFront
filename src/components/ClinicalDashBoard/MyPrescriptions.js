import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MyModal from '../Prescription/modal'
import Prescription from '../Prescription/Prescription'
import Spinner from '../shared/Spinner'
import DataTableComp from '../typesGenerator/dataTable'
import MyDialog from './MyDialog'

const PColumns = [
  { selector: 'drname', name: 'drname' },
  { selector: 'PDate', name: 'Date' },
  { selector: 'PNotes', name: 'Notes' }
]

const PDColumns = [
  { selector: 'drug', name: 'drug' },
  { selector: 'notes', name: 'notes' },
  { selector: 'refill', name: 'refill' },
  { selector: 'Quantity', name: 'Frequency' },
  {
    selector: 'Duration',
    name: 'Duration'
  }
]

const MyPrescriptions = ({ match }) => {
  const [rows, setRows] = useState([])
  const [data, setData] = useState([])
  const [drug_rows, setDrugRows] = useState([])
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [drugModal, setDrugModal] = React.useState(false)
  const base_url = 'http://localhost:8080'

  const ptId = match.params.id

  useEffect(async () => {
    await MyPrescriptions()
  }, [])

  const MyPrescriptions = () => {
    setLoading(true)
    if (ptId) {
      axios
        .post(base_url + '/visit/myPrescriptions', {
          ptId: ptId
        })
        .then(res => {
          if (res.data && res.data.length > 0) {
            res.data.map(r => {
              let d = new Date(r.PDate)
              r.PDate =
                d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
              r.drugs.map(row => {
                d = new Date(row.date)
                row.date =
                  d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
              })
            })
            setData([...res.data])
            setRows([...res.data])
          }
        })
        .catch(err => {
          alert(err)
        })
    } else {
      axios
        .post(base_url + '/visit/myPrescriptionsByDoctor', {
          drId: localStorage.getItem('userId')
        })
        .then(res => {
          if (res.data && res.data.length > 0) {
            res.data.map(r => {
              let d = new Date(r.PDate)
              r.PDate =
                d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
              r.drugs.map(row => {
                d = new Date(row.date)
                row.date =
                  d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
              })
            })
            setData([...res.data])
            setRows([...res.data])
          }
        })
        .catch(err => {
          alert(err)
        })
    }
    setLoading(false)
  }

  const SelectRow = row => {
    let index = rows.findIndex(r => r.id == row.id)
    if (index != -1) {
      setDrugRows([...rows[index].drugs])
      setDrugModal(true)
    }
  }

  const JobFinish = () => {
    MyPrescriptions()
  }

  //handle Modal Open
  const handleOpen = () => {
    setOpen(true)
  }
  //handle Modal CLose
  const handleClose = () => {
    setOpen(false)
  }

  //handle Modal Open
  const handleDrugOpen = () => {
    setDrugModal(true)
  }
  //handle Modal CLose
  const handleDrugClose = () => {
    setDrugModal(false)
  }

  return (
    <>
      <Spinner loading={loading} />
      <MyDialog open={open} handleClose={handleClose}>
        <Prescription
          match={match}
          patient_id={ptId}
          finish_method={JobFinish}
        />
      </MyDialog>
      <MyModal open={drugModal} handleClose={handleDrugClose}>
        <DataTableComp data={drug_rows} columns={PDColumns} title='' />
      </MyModal>
      <div
        style={{
          position: 'relative',
          height: 400,
          width: '100%',
          backgroundColor: '#fff'
        }}
      >
        <DataTableComp
          data={rows}
          columns={PColumns}
          title=''
          handleRowDoubleClicked={row => SelectRow(row)}
        />
        {/* <DataGrid id={Math.random()}  onRowDoubleClick={(row)=>SelectRow(row)} rows={rows} columns={PColumns} pageSize={5}  components={{
                Toolbar: GridToolbar,
            }}
            /> */}
      </div>
      {ptId && (
        <div
          style={{
            position: 'relative',
            margin: 'auto',
            textAlign: 'center',
            zIndex: 999
          }}
        >
          <Fab color='primary' aria-label='add' onClick={() => handleOpen()}>
            <AddIcon />
          </Fab>
        </div>
      )}
    </>
  )
}

export default MyPrescriptions
