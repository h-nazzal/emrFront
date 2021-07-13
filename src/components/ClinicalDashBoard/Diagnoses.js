import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import Spinner from '../shared/Loader'
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

const DiagnoseScreen = ({ match }) => {
  const [resolved, setResolved] = useState([])
  const [unresolved, setUnResolved] = useState([])
  const [value, setValue] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const base_url = 'http://localhost:8080'
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const columns_unresolved = [
    {
      name: 'diagnosis',
      selector: 'diagnosis'
    },
    {
      name: 'Treating Doctor',
      selector: 'firstName,lastName',
      cell: row => <span>{row.firstName + ' ' + row.lastName}</span>
    },
    {
      name: 'Date of Creation',
      selector: 'createdAt'
    },
    {
      name: 'actions',
      selector: 'actions',
      cell: row => (
        <Button onClick={e => ResolveDiagnose(row.id)} variant='primary'>
          Resolve{' '}
        </Button>
      )
    }
  ]

  const columns_resolved = [
    {
      name: 'diagnosis',
      selector: 'diagnosis'
    },
    {
      name: 'Treating Doctor',
      selector: 'firstName,lastName',
      cell: row => <span>{row.firstName + ' ' + row.lastName}</span>
    },
    {
      name: 'Date of Creation',
      selector: 'createdAt'
    }
  ]

  const ResolveDiagnose = id => {
    setLoading(true)
    axios
      .post(`${base_url}/visit/ResolveDiagnoses`, {
        id
      })
      .then(async res => {
        await getUnResolved()
        await getResolved()
      })
      .catch(err => {
        alert(err)
      })
    setLoading(false)
  }

  const getUnResolved = () => {
    setLoading(true)
    axios
      .post(`${base_url}/visit/getUnResolvedDiagnoses`, {
        ptId: match.params.id,
        type: 'patient'
      })
      .then(res => {
        setUnResolved(res.data)
      })
      .catch(err => {
        alert(err)
      })
    setLoading(false)
  }
  const getResolved = () => {
    setLoading(true)

    axios
      .post(`${base_url}/visit/getResolvedDiagnoses`, {
        ptId: match.params.id,
        type: 'patient'
      })
      .then(res => {
        setResolved(res.data)
      })
      .catch(err => {
        alert(err)
      })
    setLoading(false)
  }

  useEffect(() => {
    if (!match.params.id) return
    getUnResolved()
    getResolved()
  }, [match])

  return (
    <div className='container'>
      {loading && <Spinner />}

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
          <Tab label='InResolved' {...a11yProps(0)} />
          <Tab label='Resolved' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div style={{ position: 'relative' }}>
        <TabPanel value={value} index={0}>
          <DataTableComp
            data={unresolved}
            columns={columns_unresolved}
            title=''
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DataTableComp data={resolved} columns={columns_resolved} title='' />
        </TabPanel>
      </div>
    </div>
  )
}

export default DiagnoseScreen
