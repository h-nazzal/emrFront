import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import { CheckCircleSharp } from "@material-ui/icons";
// // import "./form.css";
import Autocomplete from '@material-ui/lab/Autocomplete'
import React, { Component } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'

// // import { useEffect } from 'react';

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
  root: {
    overflow: 'scroll'
    // padding: theme.spacing(2),
  }
}))(MuiAccordionDetails)

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#E7F0F5',
    padding: '1em',
    borderRadius: '1em'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize: '1.1em',
    fontFamily: 'Dosis'
  },
  input2: {
    height: '10px'
  },
  iconPlus: {
    margin: 'auto',
    textAlign: 'center'
    // float:"right",
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Roboto Slab'
  },
  deleteButton: {
    backgroundColor: '#c94c4c'
  },
  editButton: {
    backgroundColor: '#c94c4c'
  }
})

class Investgation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      expanded2: false,
      expande3: false,
      labsChoices: [],
      pathologyChoices: [],
      radioChoices: [],
      labs: [],
      pathology: [],
      radio: [],
      openModal1: false,
      TypeObj: {},
      status: '',
      comments: '',
      result: '',
      date: '',
      pId: 1,
      drId: 1,
      typeUpdate: 'lab',
      allOrdersLabs: [],
      notes: '',
      temp: [],
      labOrdersHome: [],
      allPathologyOrders: [],
      allRadioOrders: []
    }
  }
  handleopenModal1 = () => {
    this.setState({ openModal1: true })
  }

  handleClose = () => {
    this.setState({ TypeObj: {} })
    this.setState({ openModal1: false })
  }
  componentDidMount () {
    this.setState({ labsChoices: this.props.obj.labsChoices })
    this.setState({ radioChoices: this.props.obj.radioChoices })
    this.setState({ pathologyChoices: this.props.obj.pathologyChoices })

    this.setState({ allOrdersLabs: this.props.obj.labOrdersHome })
    this.setState({ allRadioOrders: this.props.obj.radioOrdersHome })
    this.setState({ allPathologyOrders: this.props.obj.pathologyOrdersHome })

    this.setState({ labOrdersHome: this.props.obj.labOrdersHome })

    this.getLabsByPId()
    this.getPathologyByPId()
    this.getRadioByPId()
  }

  getLabsByPId = () => {
    // that will get all labs names to view in multiChoices

    fetch(`http://localhost:8080/lab/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
      .then(resp => {
        resp.json().then(data => {
          console.log('alaaLaps;  ', data)
          this.setState({ labs: data })
        })
      })
      .catch(() => {
        console.log('error Getting Here')
      })
  }
  getPathologyByPId = () => {
    // that will get all pathologies names to view in multiChoices

    fetch(`http://localhost:8080/patho/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      // body: formBody
    })
      .then(resp => {
        resp.json().then(data => {
          console.log('PathologyList;  ', data)
          this.setState({ pathology: data })
        })
      })
      .catch(() => {
        console.log('error Getting Here')
      })
  }
  getRadioByPId = () => {
    // that will get all Radioes names to view in multiChoices
    fetch(`http://localhost:8080/radio/getAll`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
      // body: formBody
    })
      .then(resp => {
        resp.json().then(data => {
          console.log('PathologyList;  ', data)
          this.setState({ radio: data })
        })
      })
      .catch(() => {
        console.log('error Getting Here')
      })
  }

  handleUpdating = (name, type) => {
    // I handeled the update in one function (lab - pathology - radio)
    let _this = this
    console.log('we are updating')
    console.log(name)
    switch (this.state.typeUpdate) {
      case 'lab':
        var details = {
          // that object will send to backend when update lab
          name: name.name,
          ptId: name.ptId, //**change it with the code from Appointements */
          labId: name.labId, // ** change it with ==> localStorage.getItem("userId")
          drId: name.ptId, // ** change it with ==> localStorage.getItem("userId")
          result: _this.state.TypeObj.result,
          comments: _this.state.notes,
          date: _this.getDate()
        }

        const allOrdersLabs = this.state.allOrdersLabs.map(item =>
          item.name === details.name ? details : item
        )

        this.setState({ allOrdersLabs })

        break
      case 'pathology':
        var details = {
          // that object will send to backend when update lab
          name: name.name,
          ptId: name.ptId, //**change it with the code from Appointements */
          pathoId: name.pathoId, // ** change it with ==> localStorage.getItem("userId")
          drId: name.ptId, // ** change it with ==> localStorage.getItem("userId")
          result: _this.state.TypeObj.result,
          comments: _this.state.notes,
          date: _this.getDate()
        }

        const allPathologyOrders = this.state.allPathologyOrders.map(item =>
          item.name === details.name ? details : item
        )

        this.setState({ allPathologyOrders })
        break
      case 'radio':
        var details = {
          // that object will send to backend when update lab
          name: name.name,
          ptId: name.ptId, //**change it with the code from Appointements */
          radioId: name.radioId, // ** change it with ==> localStorage.getItem("userId")
          drId: name.ptId, // ** change it with ==> localStorage.getItem("userId")
          result: _this.state.TypeObj.result,
          comments: _this.state.notes,
          date: _this.getDate()
        }

        const allRadioOrders = this.state.allRadioOrders.map(item =>
          item.name === details.name ? details : item
        )

        this.setState({ allRadioOrders })
        break
    }
  }

  getDate = () => {
    const date = new Date()

    return date.toISOString()
  }

  handleChange = panel => (event, newExpanded) => {
    if (newExpanded) {
      this.setState({ expanded: panel })
    } else {
      this.setState({ expanded: true })
    }
    // this.setState({expanded : newExpanded ? panel : true});
    // setExpanded(newExpanded ? panel : true);
  }
  getOrderById = async (name, type) => {
    console.log('naming  : ', name)
    // console.log("All Pathology Orders   : " , this.state.allPathologyOrders);
    // console.log("All Pathology Orders   : " , this.state.allPathologyOrders);
    // this.setState({TypeObj:{}});
    switch (type) {
      case 1:
        this.setState({ typeUpdate: 'lab' })
        const labObj = this.state.allOrdersLabs.filter(lab => lab.name === name)
        // console.log("yyyyyllll:   ", labObj[0]);
        this.setState({
          TypeObj: labObj[0]
        })
        break
      case 2:
        // console.log("heeereeeeeeeeedhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        this.setState({ typeUpdate: 'pathology' })
        const pathologyObj = this.state.allPathologyOrders.filter(
          lab => lab.name === name
        )
        // console.log("TypeObject for Pathology  ", pathologyObj[0]);
        this.setState({
          TypeObj: pathologyObj[0]
        })
        break
      case 3:
        this.setState({ typeUpdate: 'radio' })
        const radioObj = this.state.allRadioOrders.filter(
          lab => lab.name === name
        )
        // console.log("TypeObject for Pathology  ", pathologyObj[0]);
        this.setState({
          TypeObj: radioObj[0]
        })
        break
    }
  }
  rendering = () => {
    return (
      <Container component='main' maxWidth='sm'>
        {this.props.getLabOrders(this.state.allOrdersLabs)}
        {this.props.getPathologyOrders(this.state.allPathologyOrders)}
        {this.props.getRadioOrders(this.state.allRadioOrders)}
        {/* {console.log("allRadioOrders: " , this.state.allRadioOrders)} */}
        <div>
          <Form className={this.props.classes.form} noValidate>
            <Row>
              <Col item xs={12}>
                <Autocomplete
                  multiple
                  id='tags-outlined'
                  options={this.state.labs}
                  getOptionLabel={option => option.name}
                  defaultValue={
                    this.props.obj.labsChoices || [this.state.labs[0]]
                  }
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      label='Labs'
                      placeholder='Favorites'
                    />
                  )}
                  onChange={async (e, value) => {
                    // console.log("value: " , value);
                    await this.props.getLabsChoices(value)
                    await this.setState({ labsChoices: value })
                    // console.log("eeeeee:    " , value);

                    // this.setState({allOrdersLabs:value});

                    value.map((lab, index) => {
                      if (this.state.allOrdersLabs) {
                        var labb = this.state.allOrdersLabs.find(
                          labOrder => labOrder.name === lab.name
                        )
                        // console.log("laaaaaab:  " , labb)
                      }
                      var details = {
                        name: lab.name,
                        labId: lab.id,
                        ptId: this.props.ptId,
                        drId: localStorage.getItem('userId'),
                        result: null,
                        comments: labb && labb.comments ? labb.comments : '',
                        date: this.getDate()
                      }
                      // Create a new array based on current state:
                      let temp = [...this.state.temp]

                      // Add item to it
                      temp.push(details)

                      // Set state
                      this.setState({ temp })
                    })
                    this.setState({ allOrdersLabs: this.state.temp })
                    this.setState({ temp: [] })
                    // console.log("after value : " ,value);
                  }}
                />
                <Accordion className='mb-5'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography className={this.props.classes.heading}>
                      Edit your info
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography style={{ width: '100%' }}>
                      <table className='table overflow-hidden'>
                        <thead>
                          <tr>
                            <th scope='col'>Lab</th>
                            <th scope='col' className='w-50'>
                              date
                            </th>

                            <th scope='col'>Notes</th>
                            <th scope='col' className='text-center' colSpan='2'>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {// console.log("lkdkdkd:    ",labsChoices[0])
                          this.state.labsChoices.map((choice, index) => {
                            if (this.state.allOrdersLabs) {
                              var lab = this.state.allOrdersLabs.find(
                                labOrder => labOrder.name === choice.name
                              )
                              //  console.log("laaaaaab:  " , lab)
                            }
                            // var lab = this.state.allOrdersLabs.find((labOrder)=>labOrder.name === choice.name)
                            // console.log("choicce:  " , this.state.allOrdersLabs[index]);
                            return (
                              <tr>
                                <td>{choice.name}</td>
                                <td>{this.getDate()}</td>

                                {lab && lab.comments !== '' ? (
                                  <td>{lab.comments}</td>
                                ) : (
                                  <td>null</td>
                                )}
                                <td>
                                  <button
                                    type='button'
                                    className='btn btn-info'
                                    onClick={async () => {
                                      await this.getOrderById(choice.name, 1)
                                      this.handleopenModal1()

                                      // console.log("allLabs : " , this.state.allOrdersLabs);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Col>
              <Col item xs={12}>
                <Autocomplete
                  multiple
                  id='tags-outlined'
                  options={this.state.pathology}
                  getOptionLabel={option => option.name}
                  defaultValue={
                    this.props.obj.pathologyChoices || this.state.pathology[0]
                  }
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      label='Pathology'
                      placeholder='Favorites'
                    />
                  )}
                  onChange={async (e, value) => {
                    // console.log("value: " , value);
                    await this.props.getPathologyChoices(value)
                    await this.setState({ pathologyChoices: value })
                    // console.log("eeeeee:    " , value);

                    // this.setState({allOrdersLabs:value});

                    value.map((lab, index) => {
                      if (this.state.allPathologyOrders) {
                        var labb = this.state.allPathologyOrders.find(
                          labOrder => labOrder.name === lab.name
                        )
                        // console.log("laaaaaab:  " , labb)
                      }
                      var details = {
                        name: lab.name,
                        ptId: this.props.ptId,
                        pathoId: lab.id,
                        drId: localStorage.getItem('userId'),
                        result: null,
                        comments: labb && labb.comments ? labb.comments : '',
                        date: this.getDate()
                      }
                      // Create a new array based on current state:
                      let temp = [...this.state.temp]

                      // Add item to it
                      temp.push(details)

                      // Set state
                      this.setState({ temp })
                    })
                    this.setState({ allPathologyOrders: this.state.temp })
                    this.setState({ temp: [] })
                    // console.log("after value : " ,value);
                  }}
                />
                <Accordion className='mb-5'>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography className={this.props.classes.heading}>
                      Edit
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography style={{ width: '100%' }}>
                      {/* forPathology */}
                      <table className='table'>
                        <thead>
                          <tr>
                            <th scope='col'>Lab</th>
                            <th scope='col' className='w-50'>
                              date
                            </th>

                            <th scope='col'>Notes</th>
                            <th scope='col' className='text-center' colSpan='2'>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {// console.log("lkdkdkd:    ",labsChoices[0])
                          this.state.pathologyChoices.map((choice, index) => {
                            if (this.state.allPathologyOrders) {
                              var lab = this.state.allPathologyOrders.find(
                                labOrder => labOrder.name === choice.name
                              )
                              //  console.log("laaaaaab:  " , lab)
                            }
                            // var lab = this.state.allOrdersLabs.find((labOrder)=>labOrder.name === choice.name)
                            // console.log("choicce:  " , this.state.allOrdersLabs[index]);
                            return (
                              <tr>
                                <td>{choice.name}</td>
                                <td>{this.getDate()}</td>
                                {lab && lab.comments !== '' ? (
                                  <td>{lab.comments}</td>
                                ) : (
                                  <td>null</td>
                                )}
                                <td>
                                  <button
                                    type='button'
                                    className='btn btn-info'
                                    onClick={async () => {
                                      await this.getOrderById(choice.name, 2)
                                      this.handleopenModal1()

                                      // console.log("allLabs : " , this.state.allOrdersLabs);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Col>
              <Col item xs={12}>
                <Autocomplete
                  multiple
                  id='tags-outlined'
                  options={this.state.radio}
                  getOptionLabel={option => option.name}
                  defaultValue={
                    this.props.obj.radioChoices || this.state.radio[0]
                  }
                  filterSelectedOptions
                  renderInput={params => (
                    <TextField
                      {...params}
                      variant='outlined'
                      label='Radio'
                      placeholder='Favorites'
                    />
                  )}
                  onChange={async (e, value) => {
                    // console.log("value: " , value);
                    await this.props.getRadioChoices(value)
                    await this.setState({ radioChoices: value })
                    // console.log("eeeeee:    " , value);

                    // this.setState({allOrdersLabs:value});

                    value.map((lab, index) => {
                      if (this.state.allRadioOrders) {
                        var labb = this.state.allRadioOrders.find(
                          labOrder => labOrder.name === lab.name
                        )
                        // console.log("laaaaaab:  " , labb)
                      }
                      var details = {
                        name: lab.name,
                        radioId: lab.id,
                        ptId: this.props.ptId,
                        drId: localStorage.getItem('userId'),
                        result: null,
                        comments: labb && labb.comments ? labb.comments : '',
                        date: this.getDate()
                      }
                      // Create a new array based on current state:
                      let temp = [...this.state.temp]

                      // Add item to it
                      temp.push(details)

                      // Set state
                      this.setState({ temp })
                    })
                    this.setState({ allRadioOrders: this.state.temp })
                    this.setState({ temp: [] })
                    // console.log("after value : " ,value);
                  }}
                />
                <Accordion
                  square
                  expanded3={this.expande3 === 'panel3'}
                  onChange={this.handleChange('panel3')}
                >
                  <AccordionSummary>
                    <Typography>Edit your Orders</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography style={{ width: '100%' }}>
                      <table className='table overflow-hidden'>
                        <thead>
                          <tr>
                            <th scope='col'>Lab</th>
                            <th scope='col' className='w-50'>
                              date
                            </th>

                            <th scope='col'>Notes</th>
                            <th scope='col' className='text-center' colSpan='2'>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {// console.log("lkdkdkd:    ",labsChoices[0])
                          this.state.radioChoices.map((choice, index) => {
                            if (this.state.allRadioOrders) {
                              var lab = this.state.allRadioOrders.find(
                                labOrder => labOrder.name === choice.name
                              )
                              //  console.log("laaaaaab:  " , lab)
                            }
                            // var lab = this.state.allOrdersLabs.find((labOrder)=>labOrder.name === choice.name)
                            // console.log("choicce:  " , this.state.allOrdersLabs[index]);
                            return (
                              <tr>
                                <td>{choice.name}</td>
                                <td>{this.getDate()}</td>

                                {lab && lab.comments !== '' ? (
                                  <td>{lab.comments}</td>
                                ) : (
                                  <td>null</td>
                                )}
                                <td>
                                  <button
                                    type='button'
                                    className='btn btn-info'
                                    onClick={async () => {
                                      await this.getOrderById(choice.name, 3)
                                      this.handleopenModal1()

                                      // console.log("allLabs : " , this.state.allOrdersLabs);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Col>
            </Row>

            <Grid container justify='flex-end'>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  Forgot Password
                </Link> */}
              </Grid>
            </Grid>
          </Form>
        </div>
      </Container>
    )
  }
  componentDidUpdate () {
    this.rendering()
  }

  render () {
    return (
      <div className='form-hero row'>
        {this.rendering()}
        {console.log('heeeeeerrrr:  ', this.state.TypeObj)}
        <Modal
          show={this.state.openModal1}
          onHide={this.handleClose}
          aria-labelledby='simple-modal-title1'
          aria-describedby='simple-modal-description2'
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <CssBaseline /> */}
            <div>
              <Form className={this.props.classes.form} noValidate>
                <Row>
                  <Col item xs={12}>
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      InputProps={{
                        classes: { input: this.props.classes.input2 }
                      }}
                      variant='outlined'
                      required
                      fullWidth
                      id='notes'
                      placeholder='Notes'
                      // defaultValue={this.state.TypeObj.notes}
                      name='notes'
                      type='text'
                      autoComplete='notes'
                      // placeholder="kkdkdkdkdk"
                      onChange={event => {
                        this.setState({ notes: event.target.value })
                      }}
                    />
                  </Col>
                </Row>

                <Button
                  type='button'
                  variant='contained'
                  color='primary'
                  fullWidth
                  className={this.props.classes.submit}
                  onClick={() => {
                    this.handleUpdating(this.state.TypeObj)
                    // this.getData();
                    // console.log("user: " , obj);
                    // handleSignup()
                  }}
                >
                  Edit
                </Button>
              </Form>
            </div>
            {/* <Box mt={5}>
                      <Copyright />
                    </Box> */}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default withStyles(useStyles)(Investgation)

const labs = [
  { title: 'Lab1', Date: '', patientName: 'Alaa' },
  { title: 'Lab2', Date: '', patientName: 'Lol' },
  { title: 'lab3', Date: '', patientName: 'Loll' },
  { title: 'lab4', Date: '', patientName: 'Lolj' },
  { title: 'lab5', Date: '', patientName: 'Lolnn' }
]
const pathology = [
  { title: 'cc', Date: '', patientName: 'Alaa' },
  { title: 'cccc', Date: '', patientName: 'Lol' },
  { title: 'csss', Date: '', patientName: 'Loll' },
  { title: 'bbb', Date: '', patientName: 'Lolj' },
  { title: 'lab5', Date: '', patientName: 'Lolnn' }
]
const radio = [
  { title: 'ddd', Date: '', patientName: 'Alaa' },
  { title: 'dddd', Date: '', patientName: 'Lol' },
  { title: 'zzz', Date: '', patientName: 'Loll' },
  { title: 'ssss', Date: '', patientName: 'Lolj' },
  { title: 'kkk', Date: '', patientName: 'Lolnn' }
]
