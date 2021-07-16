import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import { useTheme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import { Link, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import AddOrderForm from '../orderGeneration/addOrderForm'
import AllOrders from '../orderGeneration/allOrders'
import Prescription from '../Prescription/Prescription'
import Visit from '../Visit/visit'
import DiagnoseScreen from './Diagnoses'
import FamilyHistory from './familyHistory'
import Medication from './Medication'
import MyPrescriptions from './MyPrescriptions'
import ClinicalOrders from './orders'
import PatientAppointement from './patientAppointements'
import UserInfo from './userInfo'
import VisitScreen from './Visits'
import VitalsScreen from './Vitals'
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

const ClinicalDashBoard = ({ match }) => {
  const styles = {
    active: {
      backgroundColor: '#007bff'
    },
    active_link: {
      color: '#fff',
      textDecoration: 'none'
    },
    inactive: {
      backgroundColor: 'transparent',
      color: '#007bff',
      textDecoration: 'underline'
    },
    inactive_link: {
      color: '#007bff',
      textDecoration: 'underline'
    }
  }
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(0)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const history = useHistory()
  const [ptId, setPtId] = useState(match.params.id)
  const location = useLocation()
  var arr = location.pathname.split('/')
  console.log(arr)
  useEffect(() => {
    console.log('herree dashBoard:', match.params.id)
    setPtId(match.params.id)
  })

  return (
    <div className='container mt-9' style={{ marginBottom: 40 }}>
      <div className='row'>
        <div className='col-4 col-md-4 col-lg-3 '>
          <div class='wrapper'>
            {/* Bootstrap SideBar */}
            <nav id='sidebar'>
              <div className='sidebar-header'></div>
              <div className='container'>
                <ListGroup
                  style={{
                    position: 'fixed',
                    background: '#ffffff',
                    top: '60px',
                    boxShadow: '0 8px 6px -6px #333'
                  }}
                >
                  <Link
                    className='btn btn-success my-2'
                    to={match.url + `/patientAppointement/visit`}
                  >
                    New Visit
                  </Link>
                  <ListGroup.Item
                    style={
                      arr[1] && arr[arr.length - 1] == 'clinicalDashBoard'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    {parseInt(localStorage.getItem('role')) === 8 ? (
                      <Link
                        to={match.url + `/clinicalDashBoard`}
                        style={
                          arr[1] && arr[arr.length - 1] == 'clinicalDashBoard'
                            ? styles.active_link
                            : styles.inactive_link
                        }
                      >
                        Clinical DashBoard
                      </Link>
                    ) : (
                      <Link to='#' style={{ cursor: 'not-allowed' }}>
                        Clinical DashBoard
                      </Link>
                    )}
                  </ListGroup.Item>
                  {/* <ListGroup.Item style={arr[arr.length-1]=="patientAppointement"?styles.active:styles.inactive}>
                  <Link style={arr[arr.length-1]=="patientAppointement"?styles.active_link:styles.inactive_link}
                   to={match.url + `/patientAppointement`}>
                    Patient Appointement
                  </Link>
                </ListGroup.Item> */}
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'onGoingProblems'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'onGoingProblems'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={
                        match.url +
                        `/patientOnGoingProblems/${'onGoingProblems'}`
                      }
                    >
                      On Going Problems
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'allergy'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'allergy'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/patientAllergyproblems/${'allergy'}`}
                    >
                      Allergies
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'visits'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'visits'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/${'visits'}`}
                    >
                      Visits
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'Vitals'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'Vitals'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/${'Vitals'}`}
                    >
                      Vitals
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'lab' ||
                      arr[arr.length - 2] == 'lab'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'lab' ||
                        arr[arr.length - 2] == 'lab'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/allLabOrders/${'lab'}`}
                    >
                      Lab Orders
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'pathology' ||
                      arr[arr.length - 2] == 'pathology'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'pathology' ||
                        arr[arr.length - 2] == 'pathology'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/allPathologyOrders/${'pathology'}`}
                    >
                      Pathology Orders
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'radio' ||
                      arr[arr.length - 2] == 'radio'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'radio' ||
                        arr[arr.length - 2] == 'radio'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/allRadioOrders/${'radio'}`}
                    >
                      radiology Orders
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'Medication'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'Medication'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/Medication`}
                    >
                      Medications
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'familyHistory'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      to={match.url + `/familyHistory`}
                      style={
                        arr[arr.length - 1] == 'familyHistory'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                    >
                      Family History
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={
                      arr[arr.length - 1] == 'MyPrescriptions'
                        ? styles.active
                        : styles.inactive
                    }
                  >
                    <Link
                      style={
                        arr[arr.length - 1] == 'MyPrescriptions'
                          ? styles.active_link
                          : styles.inactive_link
                      }
                      to={match.url + `/MyPrescriptions`}
                    >
                      prescriptions
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </nav>
          </div>
        </div>
        <div className='col-8 col-md-8 col-lg-9  '>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              textAlign: 'center',
              display: 'none',
              zIndex: 999
            }}
          >
            <Fab
              color='primary'
              aria-label='add'
              onClick={() => handleClickOpen()}
            >
              <AccountBoxIcon />
            </Fab>
          </div>
          <Row>
            {/* <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent> */}
            <UserInfo id={match.params.id} />

            {/* </DialogContent>
              <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Close
              </Button>
              </DialogActions>
           </Dialog> */}
          </Row>
          <div
            style={{
              backgroundColor: '#eee',
              borderRadius: 10,
              boxShadow: 20,
              padding: 20,
              position: 'relative'
            }}
          >
            <Switch>
              <Route exact path={match.url + `/clinicalDashBoard`}>
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
                    <Tab label='Allergies' {...a11yProps(0)} />
                    <Tab label='OnGoing Problems' {...a11yProps(1)} />
                    <Tab label='surgeries ' {...a11yProps(2)} />
                    <Tab label='Interventions ' {...a11yProps(3)} />
                    <Tab label='labs' {...a11yProps(4)} />
                    <Tab label='radiology' {...a11yProps(5)} />
                    <Tab label='pathology ' {...a11yProps(6)} />
                  </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                  <FamilyHistory
                    type={'allergy'}
                    id={match.params.id}
                    addButtonFlag={false}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <FamilyHistory
                    type={'onGoingProblems'}
                    id={match.params.id}
                    addButtonFlag={true}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <FamilyHistory
                    type={'surgeries'}
                    id={match.params.id}
                    addButtonFlag={true}
                  />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <FamilyHistory
                    type={'Interventions'}
                    id={match.params.id}
                    addButtonFlag={true}
                  />
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <ClinicalOrders type={'lab'} id={match.params.id} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <ClinicalOrders type={'radio'} id={match.params.id} />
                </TabPanel>
                <TabPanel value={value} index={6}>
                  <ClinicalOrders type={'pathology'} id={match.params.id} />
                </TabPanel>
              </Route>
              <Route
                exact
                key={4}
                path={match.path + '/patientAllergyproblems/:type'}
              >
                <FamilyHistory
                  type={'allergy'}
                  id={match.params.id}
                  addButtonFlag={true}
                />
              </Route>
              <Route exact key={55} path={match.path + '/ptdata/:type'}>
                <FamilyHistory
                  type={'Vitals'}
                  id={match.params.id}
                  addButtonFlag={false}
                />
              </Route>
              <Route
                exact
                key={5}
                path={match.path + '/patientOnGoingproblems/:type'}
                component={DiagnoseScreen}
              >
                {/* <FamilyHistory type={"onGoingProblems"} id={match.params.id}  addButtonFlag = {false}/> */}
              </Route>
              <Route
                exact
                path={match.path + '/patientAppointement'}
                component={PatientAppointement}
              />
              {/* <Route exact path={match.path+"/patientAppointement/visit"}  component={Visit}/>  */}
              <Route
                exact
                key={1}
                path={match.path + '/allLabOrders/:type'}
                component={AllOrders}
              />
              {/* <Route exact  path={match.path+"/allLabOrders/:type/:id/allOrders"}  component={AllOrders}/>  */}
              <Route
                exact
                key={11}
                path={match.path + '/allLabOrders/:type'}
                component={AllOrders}
              />
              <Route
                exact
                key={2}
                path={match.path + '/allPathologyOrders/:type'}
                component={AllOrders}
              />
              <Route
                exact
                key={3}
                path={match.path + '/allRadioOrders/:type'}
                component={AllOrders}
              />
              <Route
                exact
                path={match.path + '/allLabOrders/:type/addOrder'}
                component={AddOrderForm}
              />
              <Route
                exact
                key={2}
                path={match.path + '/allPathologyOrders/:type/addOrder'}
                component={AddOrderForm}
              />
              <Route
                exact
                key={7}
                path={match.path + '/allRadioOrders/:type/addOrder'}
                component={AddOrderForm}
              />
              <Route
                exact
                key={99}
                path={match.path + '/Medication'}
                component={Medication}
              />
              <Route
                exact
                key={100}
                path={match.path + '/visits'}
                component={VisitScreen}
              />{' '}
              <Route
                exact
                key={100}
                path={match.path + '/Vitals'}
                component={VitalsScreen}
              />
              <Route
                exact
                key={99}
                path={match.path + '/MyPrescriptions'}
                component={MyPrescriptions}
              />
              <Route
                exact
                path={match.path + '/patientAppointement/visit'}
                component={Visit}
              />
              <Route
                exact
                path={
                  match.path +
                  '/patientAppointement/visit/prescription/:visitId'
                }
                component={Prescription}
              />
              <Route
                exact
                path={match.path + '/profile'}
                component={Prescription}
              />
              <Route exact key={15} path={match.path + '/familyHistory'}>
                <FamilyHistory
                  type={'familyHistory'}
                  id={match.params.id}
                  addButtonFlag={true}
                />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <div className='row'></div>
    </div>
  )
}

export default ClinicalDashBoard
