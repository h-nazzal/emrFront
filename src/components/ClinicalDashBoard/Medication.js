import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'
import MyModal from '../Prescription/modal'
import Form from '../Prescription/PrescriptionForm'
import { loadMYDrugs, UnActiveDrug } from '../Prescription/request'
import Spinner from '../shared/Spinner'
import DataTableComp from '../typesGenerator/dataTable'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper
  }
}))

export default function ScrollableTabsButtonAuto ({ match }) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [rows, setRows] = React.useState([])
  const [active_rows, setActiveRows] = React.useState([])
  const [un_active_rows, setUnActiveRows] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const ptId = match.params.id
  const inactive_columns = [
    { selector: 'drugName', name: 'Drug' },
    { selector: 'Quantity', name: 'Quantity' },
    {
      selector: 'Duration',
      name: 'Duration'
    },
    {
      selector: 'createdAt',
      name: 'Date'
    }
  ]

  const active_columns = [
    { selector: 'drugName', name: 'Drug' },
    { selector: 'Quantity', name: 'Frequency' },
    {
      selector: 'Duration',
      name: 'Duration'
    },
    {
      selector: 'createdAt',
      name: 'Date'
    },
    {
      selector: 'inActive',
      name: 'Active',
      cell: row => (
        <strong>
          <Button
            onClick={() => unActiveRow(row.id)}
            variant='danger'
            style={{ marginLeft: 16 }}
          >
            UnActive
          </Button>
        </strong>
      )
    }
  ]
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  React.useEffect(async () => {
    await MYDrugs()
  }, [])

  //handle Modal Open
  const handleOpen = () => {
    setOpen(true)
  }
  //handle Modal CLose
  const handleClose = () => {
    setOpen(false)
  }

  const CheckStatus = row => {
    var d = new Date(row.createdAt)
    var newDate = new Date()
    if (
      d.getDate() + row.Duration >= newDate.getDate() &&
      d.getMonth() >= newDate.getMonth() &&
      d.getFullYear() >= newDate.getFullYear()
    ) {
      return true
    }

    return false
  }

  const MYDrugs = () => {
    setLoading(true)
    loadMYDrugs(ptId)
      .then(data => {
        data.map(row => {
          let index = rows.findIndex(r => r.id == row.id)
          if (index == -1) {
            let date = new Date(row.createdAt)
            rows.push({
              id: row.id,
              drugName: row.name,
              Quantity: row.Quantity,
              Duration: row.Duration,
              createdAt:
                date.getDate() +
                '/' +
                (date.getMonth() + 1) +
                '/' +
                date.getFullYear(),
              status:
                CheckStatus(row) && row.active === 1 ? 'active' : 'inactive'
            })
          }
        })
        setRows([...rows])
        setActiveRows(rows.filter(r => r.status == 'active'))
        setUnActiveRows(rows.filter(r => r.status == 'inactive'))
      })
      .catch(err => {
        alert(err)
      })
    setLoading(false)
  }

  const unActiveRow = id => {
    setLoading(true)

    let index = rows.findIndex(r => r.id == id)
    rows[index].status = 'inactive'
    UnActiveDrug(id)
      .then(res => {
        setRows([...rows])
        setActiveRows(rows.filter(r => r.status === 'active'))
        setUnActiveRows(rows.filter(r => r.status === 'inactive'))
      })
      .catch(err => {
        alert(err)
      })
    setLoading(false)
  }

  const add_row = data => {
    let date = new Date()
    let index = active_rows.findIndex(r => r.id == data.id)
    if (index == -1) {
      active_rows.push({
        ...data,
        createdAt:
          date.getDate() +
          '/' +
          (date.getMonth() + 1) +
          '/' +
          date.getFullYear()
      })
    }
    console.log('active_rows')

    console.log(data)
    setActiveRows([...active_rows])
    console.log(active_rows)
    console.log('active_rows')

    handleClose()
  }

  return (
    <div className={classes.root}>
      <Spinner loading={loading} />
      <MyModal open={open} handleClose={handleClose}>
        <Form ptId={ptId} PID={0} add_row={add_row} />
      </MyModal>

      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs example'
        >
          <Tab label='Active Drugs' {...a11yProps(0)} />
          <Tab label='InActive Drugs' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div style={{ position: 'relative' }}>
        <TabPanel value={value} index={0}>
          <DataTableComp data={active_rows} columns={active_columns} title='' />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DataTableComp
            data={un_active_rows}
            columns={inactive_columns}
            title=''
          />
        </TabPanel>
      </div>
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
    </div>
  )
}
