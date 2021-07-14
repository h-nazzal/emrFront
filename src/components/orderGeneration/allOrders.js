import axios from 'axios'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import FormGenerator from '../Forms/formGenerationNew'
import ModalGenerator from '../ModalGeneration/modalGeneration'
import orderType from '../ordersdb.json'
import ModalForView from '../pharmacyModule/modalForView'
import Spinner from '../shared/Spinner'
import DataTableComp from '../typesGenerator/dataTable'
import './order.css'

var object = {}

class AllOrders extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orderlabList: [],
      orderType: 0,
      type: '',
      flagCompoenentType: true, // for patientID ==> false //***OR***//  for LabID ==>true
      modalUploadResultInputs: [],
      openModal: false,
      typeObj: {},
      formType: 'upload',
      numPages: null,
      pageNumber: 1,
      fileResult: '',
      resultStatus: '',
      resultToShow: '',
      loading: false
    }
  }
  async componentDidMount () {
    var flag = false
    console.log('propsppppppppppp:  ', this.props.match.params.id)

    this.setState({ type: this.props.match.params.type })

    if (this.props.match.params.id) {
      // for PatientId
      console.log('yes here is it ')
      this.setState({ flagCompoenentType: false })
      flag = false
      this.setState({ ptId: this.props.match.params.id })
      object = 'columnsTableForPatientOrders' // to get Data without First Name and lastName for PatientId
    } else {
      console.log('no it it is not')
      this.setState({ flagCompoenentType: true })
      flag = true
    }

    if (flag) {
      object = 'columnsTable' // to get Data with First Name and lastName of the patient for all orders of LabId
    } else {
      object = 'columnsTableForPatientOrders' // to get Data without First Name and lastName for PatientId
    }
    this.handleTableColumnsForAllAcceptedOrders(
      this.props.match.params.type,
      object
    )

    this.setState({ drId: localStorage.getItem('userId') })

    // if(this.props.match.params.type != "lab"){
    // this.setState({labID : 1})
    // }

    this.setState({ type: this.props.match.params.type })

    await this.getData(flag, this.props.match.params.type)
  }
  onDocumentLoadSuccess ({ numPages }) {
    this.setState(numPages)
  }

  getTypeByID = async id => {
    // to set object which will be updated
    const labObj = this.state.orderlabList.filter(lab => lab.id === id)
    console.log('typeObj : ', labObj[0])
    this.setState({
      typeObj: labObj[0]
    })
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }
  handleopenModal = () => {
    this.setState({ openModal: true })
  }

  getData = async (flag, type) => {
    this.setState({ loading: true })

    var endPoint = ''
    console.log('orderType: ', type, '.............. ', orderType[type])
    if (!flag) {
      // for PatientID and only Accepted Order
      var details = {
        ptId: this.props.match.params.id
      }
      endPoint = `${orderType[type].getAllOrdersByPtID}`
    } else {
      // for LabId or PathoId or labId
      var details = {}
      endPoint = `${orderType[type].getAllOrdersByLabId}`
      switch (type) {
        case 'lab': {
          // details["labId"] = localStorage.getItem("labId");
          details['labFDId'] = localStorage.getItem('userId')
        }
        case 'pathology': {
          // details["pathoId"] = localStorage.getItem("pathoId");
          details['pathoFDId'] = localStorage.getItem('userId')
        }
        case 'radio': {
          details['radioFDId'] = localStorage.getItem('userId')
        }
      }
    }
    console.log('endPoint: ', endPoint)
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    axios
      .post(`${endPoint}`, details)
      .then(result => {
        this.setState({ loading: false })

        console.log('dataaaaaaaa:  ', result.data)
        this.setState({ orderlabList: result.data })
      })
      .catch(err => {
        this.setState({ loading: false })

        console.log(err)
      })
  }

  handleDelete = async id => {
    this.setState({ loading: true })

    console.log('iiiiiiiiiid', id)
    var details = {
      id: id
    }
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }

    fetch(`${orderType[this.state.type].deleteOrder}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(() => {
        this.setState({ loading: false })

        console.log('it is deleted')
      })
      .catch(() => {
        this.setState({ loading: false })

        console.log('errror')
      })
    this.setState({
      orderlabList: this.state.orderlabList.filter(row => row.id !== id)
    })
  }

  handleUpdate = async () => {
    // Upload files Using updateOrder function
    this.setState({ loading: true })
    var Form = new FormData()
    Form.append('result', this.state.result)
    Form.append('orderId', this.state.typeObj['id'])

    console.log('heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    // await fetch(`http://localhost:8080/visit/updateOrder`, {
    await fetch(`${orderType[this.state.type].uploadResult}`, {
      method: 'POST',
      body: Form
    })
      .then(resp => {
        console.log('Getting: ', resp)
        resp.json().then(data => {
          this.setState({ loading: false })

          console.log('dataaaaaaaaa: ', data)
          //** */ if you want to delete the record with uploaded Result
          // var temp = this.state.orderlabList.filter(row => row.id != this.state.typeObj["id"]);
          // this.setState({orderlabList : temp});
        })
      })
      .catch(() => {
        this.setState({ loading: false })

        console.log('error On Server')
      })

    this.getData(true, this.state.type)
  }

  // type(lab - pathology - radio)
  // object for columns for patient orders **OR**  for all Orders by LabId
  // and this object from OrdersDB.json

  handleTableColumnsForAllAcceptedOrders = (type, object) => {
    console.log(type, object)
    console.log('object : ', orderType[type][object])
    var temp = []
    if (object === 'columnsTable') {
      for (var p in orderType[type][object]) {
        if (p === 'actions') {
          // console.log("object : " , orderType[type][object][p])
          orderType[type][object][p]['cell'] = row => {
            return (
              <div className='row'>
                <div className='col-auto'>
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      console.log('rooooow : ', row)
                      console.log('id:  ', row)
                      this.handleopenModal()
                      this.getTypeByID(row.id)
                      this.setState({ resultStatus: 'upload' })
                    }}
                  >
                    Upload Result
                  </button>
                  <button
                    className='ml-2 btn btn-danger'
                    onClick={() => {
                      // console.log("rooooow : " , row)
                      console.log('id:  ', row)
                      this.handleDelete(row.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          }
          temp.push(orderType[type][object][p])
        } else if (p === 'drname') {
          orderType[type].columnsTable[p]['cell'] = row => {
            return (
              <span>
                {row.OrderingDrFirstName + ' ' + row.tOrderingDrLastName}
              </span>
            )
          }
          temp.push(orderType[type].columnsTable[p])
        } else if (p === 'ptname') {
          orderType[type].columnsTable[p]['cell'] = row => {
            return <span>{row.firstname + ' ' + row.lastname}</span>
          }
          temp.push(orderType[type].columnsTable[p])
        } else {
          temp.push(orderType[type][object][p])
        }
      }
    } else {
      for (var p in orderType[type][object]) {
        if (p === 'actions') {
          // console.log("object : " , orderType[type][object][p])
          orderType[type][object][p]['cell'] = row => {
            return (
              <div className='row'>
                <div className='col-auto'>
                  {/* <a  href= {`http://localhost:8080/${this.state.type}s/${row.result}`}> */}

                  <button
                    className='btn btn-primary'
                    hidden={!row.result ? true : false}
                    onClick={() => {
                      console.log('rooooow : ', row)
                      console.log('id:  ', row)
                      this.setState({ fileResult: row.result })
                      this.getTypeByID(row.id)
                      this.handleopenModal()
                      this.setState({ resultToShow: row.result })
                      //  this.props.history.push(`http://localhost:8080/${this.state.type}/${row.result}`)
                      this.setState({ resultStatus: 'show' })
                    }}
                  >
                    Show Result
                  </button>
                  {/* </a> */}

                  <button
                    className='ml-2 btn btn-danger'
                    onClick={() => {
                      // console.log("rooooow : " , row)
                      console.log('id:  ', row)
                      this.handleDelete(row.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          }
          temp.push(orderType[type][object][p])
        } else if (p === 'drname') {
          orderType[type][object][p]['cell'] = row => {
            return <span>{row.firstName + ' ' + row.lastName}</span>
          }
          temp.push(orderType[type][object][p])
        } else {
          temp.push(orderType[type][object][p])
        }
      }
    }

    this.setState({ columns: temp })
    console.log('temp : ', temp)
    temp = []
    var newState = this.state
    for (var property in orderType[type].state) {
      newState[property] = ''
    }
    this.setState({ newState })

    // if the page Will Contain modal
    for (var p in orderType[type].uploadResultForm) {
      temp.push(orderType[type].uploadResultForm[p])
    }
    // // console.log("temp : "  , temp)
    this.setState({ modalUploadResultInputs: temp })
  }

  renderModalBody = () => {
    return (
      <div className='wrap'>
        <iframe
          style={{ height: '100%', width: '100%' }}
          src={`http://localhost:8080/${
            this.state.type == 'lab'
              ? 'labs'
              : this.state.type == 'pathology'
              ? 'pathologys'
              : 'radios'
          }/${this.state.resultToShow}`}
          title='W3Schools Free Online Web Tutorials'
        ></iframe>
      </div>
    )
  }

  rendering = () => {
    return (
      <Container fluid>
        {console.log('state: ', this.state.columns)}
        <Row className='py-3'>
          <Col>
            {this.state.flagCompoenentType && this.state.type && orderType && (
              <>
                <h3>{orderType[this.state.type].titleForPatientOrders}</h3>
                <div>
                  {orderType[this.state.type].descriptionForPatientOrders}
                </div>
              </>
            )}
            {!this.state.flagCompoenentType && this.state.type && orderType && (
              <>
                <h3>All Patient Orders</h3>
                <div>You can Show result here....</div>
              </>
            )}
          </Col>
        </Row>
        {!this.state.flagCompoenentType && (
          <Row className='py-3'>
            <Col sm={10}></Col>
            <Col sm={2}>
              <Button
                variant='success'
                onClick={() => {
                  console.log('prosp : ', this.props.match.url)
                  if (this.props.match.params.type === 'lab') {
                    this.props.history.push(`${this.props.match.url}/addOrder`)
                  } else if (this.props.match.params.type === 'pathology') {
                    this.props.history.push(`${this.props.match.url}/addOrder`)
                  } else {
                    this.props.history.push(`${this.props.match.url}/addOrder`)
                  }
                }}
              >
                Add New
              </Button>{' '}
            </Col>
          </Row>
        )}

        <Row className='py-3'>
          <Col>
            <DataTableComp
              data={this.state.orderlabList}
              columns={this.state.columns}
              title=''
            />
            {console.log('inputs: ', this.state.formType)}
          </Col>
          {this.state.resultStatus === 'show' && (
            <ModalForView
              show={this.state.openModal}
              onHide={this.handleClose}
              body={this.renderModalBody()}
            />
          )}

          {this.state.resultStatus === 'upload' &&
            this.state.modalUploadResultInputs &&
            this.state.modalUploadResultInputs.length > 0 && (
              // <ModalComp show={this.state.openModal}
              //   onHide={this.handleClose}
              //   ModalInputs={this.state.modalUploadResultInputs}
              //   updatedTypeObj = {this.state.typeObj}
              //   handleChange = {this.handleChange}
              //   handleUpdate = {this.handleUpdate}
              //   handleAdding={this.handleAdding}
              //   formType = {this.state.formType}
              // />
              <ModalGenerator
                onHide={this.handleClose}
                show={this.state.openModal}
              >
                <FormGenerator
                  ModalInputs={this.state.modalUploadResultInputs}
                  handleChange={this.handleChange}
                  handleUpdate={this.handleUpdate}
                  handleAdding={this.handleAdding}
                  options={[]}
                  formType={this.state.formType}
                />
              </ModalGenerator>
            )}
          {/* for Plus Icon */}
          {/* if We Want to Add Order */}
          <div className='row mt-4'>
            {/* <Fab color="primary" aria-label="add" className ={this.props.classes.iconPlus} onClick = {()=>{
                       console.log("hhhhhhhh:  " , this.props.location.pathname)
                       this.props.history.push(`${this.props.location.pathname}/addOrder`)
                        }}>
                          <AddIcon  />
                        </Fab>                       */}
          </div>
        </Row>
      </Container>
    )
  }

  handleChange = e => {
    console.log('value : ', e.target.files[0])
    this.setState({ result: e.target.files[0] })
  }

  render () {
    const { classes } = this.props

    return (
      <div className=''>
        <Spinner loading={this.state.loading} />

        {this.rendering()}
      </div>
    )
  }
}

export default AllOrders
