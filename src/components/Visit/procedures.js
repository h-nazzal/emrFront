import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
// import "./form.css";
import TextField from '@material-ui/core/TextField'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import Autocomplete from '@material-ui/lab/Autocomplete'
import axios from 'axios'
import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import MyModal from '../Prescription/modal'

const useStyles = makeStyles(theme => ({
  marginTopp: {
    marginTop: theme.spacing(11),
    backgroundColor: 'yellow'
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e7f0f4',
    border: '1px solid #fff',
    boxShadow: '4px 3px 16px 1px #fff',
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding: '1em',
    borderRadius: '1em'
  },
  iconsColor: {
    color: '#385968'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#385968'
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#385968'
  }
}))

export default function Procedures ({
  getSurgeries,
  obj,
  procedures,
  getProcedures,
  ptId
}) {
  const classes = useStyles()
  const [surgys, setSurgys] = React.useState([])
  const [notes, setNotes] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(procedures)
  const [rows, setRows] = React.useState(obj)
  const [id, setID] = React.useState(null)

  const openModal = sid => {
    setOpen(true)
    setID(sid)
    let index = rows.findIndex(val => val.id == sid)
    setNotes(rows[index].notes)
  }

  const EditNotes = () => {
    let index = rows.findIndex(val => val.id == id)
    rows[index]['notes'] = notes
    setRows([...rows])
    handleClose()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const updateRows = newValue => {
    let temp = []
    if (newValue.length > 0) {
      newValue.map(val => {
        let index = rows.findIndex(r => r.id == val.id)
        temp.push({
          id: val.id,
          name: val.name,
          notes: index != -1 ? rows[index].notes : '',
          ptId: ptId
        })
      })
    }
    setRows([...temp])
    getSurgeries([...temp])
  }

  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Surgery', width: 300 },
    { field: 'notes', headerName: 'Notes', width: 300 },
    {
      field: 'Edit',
      headerName: 'Edit',
      renderCell: params => (
        <strong>
          <Button
            onClick={() => openModal(params.row.id)}
            color='primary'
            size='small'
            variant='contained'
          >
            Edit
          </Button>
        </strong>
      )
    }
  ]
  const loadAllSurgeries = () => {
    axios
      .get('http://localhost:8080/surgery/getAll')
      .then(res => {
        setSurgys(res.data)
      })
      .catch(err => {
        alert(err)
      })
  }
  React.useEffect(() => {
    loadAllSurgeries()
  }, [])
  //  this Component will handle Surgies and interventions
  return (
    <Row className='justify-content-center'>
      <MyModal handleClose={handleClose} open={open}>
        <Form noValidate>
          <Row>
            <Col item xs={12}>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                variant='outlined'
                required
                fullWidth
                id='notes'
                placeholder='Notes'
                // defaultValue={this.state.TypeObj.notes}
                name='notes'
                type='text'
                autoComplete='notes'
                value={notes}
                // placeholder="kkdkdkdkdk"
                onChange={event => {
                  setNotes(event.target.value)
                }}
              />
            </Col>
          </Row>

          <Button
            type='button'
            variant='contained'
            color='primary'
            fullWidth
            onClick={() => {
              EditNotes()
              // this.getData();
              // console.log("user: " , obj);
              // handleSignup()
            }}
          >
            Edit
          </Button>
        </Form>
      </MyModal>

      <Col md={8} xs={12}>
        <div>
          <Form className='small-labels' noValidate>
            <Row>
              <Col item xs={6}>
                <Form.Label>Surgeries & interventions</Form.Label>
                {surgys.length > 0 && (
                  <Autocomplete
                    multiple
                    defaultValue={value}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setValue(newValue)
                        //  rows.splice(0,rows.length)
                        //  setRows([rows])
                        getProcedures(newValue)
                        updateRows(newValue)
                      }
                    }}
                    filterSelectedOptions
                    getOptionLabel={option => option.abbreviation}
                    id='controllable-states-demo'
                    options={surgys}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label='Controllable'
                        variant='outlined'
                      />
                    )}
                  />
                )}
              </Col>
              <div
                style={{
                  position: 'relative',
                  height: 400,
                  width: '100%',
                  backgroundColor: '#fff'
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  components={{
                    Toolbar: GridToolbar
                  }}
                />
              </div>
            </Row>

            <Grid container justify='flex-end'>
              <Grid item></Grid>
            </Grid>
          </Form>
        </div>
      </Col>
    </Row>
  )
}
