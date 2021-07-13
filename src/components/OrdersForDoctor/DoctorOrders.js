import axios from 'axios'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { Document, Page } from 'react-pdf'
import '../orderGeneration/order.css'
import orderType from '../ordersdb.json'
import ModalForView from '../pharmacyModule/modalForView'
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Spinner from '../shared/Spinner'
import DataTableComp from '../typesGenerator/dataTable'

var object = {}

class AllOrdersForDoctor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      orderlabList: [],
      orderType: 0,
      loading: false,
      type: '',
      flagCompoenentType: true, // for patientID ==> false //***OR***//  for LabID ==>true
      modalUploadResultInputs: [],
      openModal: false,
      typeObj: {},
      formType: 'uploadResult',
      numPages: null,
      pageNumber: 1,
      fileResult: ''
    }
  }
  async componentDidMount () {
    var flag = false
    console.log('propsppppppppppp:  ', this.props.match.params.id)

    this.setState({ type: this.props.match.params.type })

    console.log('no it it is not')
    this.setState({ flagCompoenentType: true })
    flag = true

    if (flag) {
      object = 'columnsTable' // to get Data with First Name and lastName of the patient for all orders of LabId
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
    switch (this.props.match.params.type) {
      case 'lab':
        this.setState({ orderType: 0 })
        break
      case 'radio':
        this.setState({ orderType: 1 })
        break
      case 'pathology':
        this.setState({ orderType: 2 })
        break
    }

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
    var endPoint = ''
    console.log('orderType: ', type, '.............. ', orderType[type])

    // for LabId or PathoId or labId
    var details = {
      drId: localStorage.getItem('userId')
    }

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    console.log('endPointttttttt: ', orderType[type].getAllDoctorOrders)
    this.setState({ loading: true })
    axios
      .post(`${orderType[type].getAllDoctorOrders}`, formBody)
      .then(result => {
        console.log('dataaaaaaaa:  ', result.data)
        this.setState({ orderlabList: result.data })
      })
      .catch(err => {
        console.log(err)
      })

    this.setState({ loading: false })
  }

  handleDelete = async id => {
    var details = {
      id: id
    }
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    this.setState({ loading: true })

    fetch(`${orderType[this.state.type].deleteOrder}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(() => {
        console.log('it is deleted')
      })
      .catch(() => {
        console.log('errror')
      })
    this.setState({
      orderlabList: this.state.orderlabList.filter(row => row.id !== id),
      loading: false
    })
  }

  handleUpdate = async () => {
    // Upload files Using updateOrder function

    var Form = new FormData()
    Form.append('result', this.state.result)
    Form.append('orderId', this.state.typeObj['id'])
    this.setState({ loading: true })

    await fetch(`http://localhost:8080/visit/updateOrder`, {
      method: 'POST',
      body: Form
    })
      .then(resp => {
        console.log('Getting: ', resp)
        resp.json().then(data => {
          var temp = this.state.orderlabList.filter(
            row => row.id != this.state.typeObj['id']
          )
          this.setState({ orderlabList: temp })
        })
      })
      .catch(() => {
        console.log('errror')
      })

    this.setState({ loading: false })
  }

  // type(lab - pathology - radio)
  // object for columns for patient orders **OR**  for all Orders by LabId
  // and this object from OrdersDB.json

  handleTableColumnsForAllAcceptedOrders = (type, object) => {
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
                    style={{ display: !row.result ? 'none' : 'block' }}
                    className='btn btn-primary'
                    onClick={async () => {
                      console.log('rooooow : ', row)
                      console.log('id:  ', row)
                      await this.setState({ fileResult: row.result })
                      console.log('rewsult ::' + row.result)
                      this.handleopenModal()
                      this.getTypeByID(row.id)
                    }}
                  >
                    Show Result
                  </button>
                </div>
                <div className='col-auto'>
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
        } else if (p == 'ptname') {
          orderType[type][object][p]['cell'] = row => {
            return (
              <a
                style={{ color: '#007bff', cursor: 'pointer' }}
                onClick={e => {
                  e.preventDefault()
                  this.props.history.push('/clinicalDashBoard/' + row.PtID)
                }}
              >
                {row.firstname + ' ' + row.lastname}
              </a>
            )
          }
          temp.push(orderType[type][object][p])
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
                  <button
                    className='btn btn-primary'
                    onClick={() => {
                      console.log('rooooow : ', row)
                      console.log('id:  ', row)
                      this.setState({ fileResult: row.result })
                      this.getTypeByID(row.id)
                    }}
                  >
                    Show Result
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
        } else if (p == 'ptname') {
          orderType[type][object][p]['cell'] = row => {
            return (
              <a
                style={{ color: '#007bff', cursor: 'pointer' }}
                onClick={e => {
                  e.preventDefault()
                  this.props.history.push('/clinicalDashBoard/' + row.PtID)
                }}
              >
                {row.firstname + ' ' + row.lastname}
              </a>
            )
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
  renderingModalBody = () => {
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
          }/${this.state.fileResult}`}
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
                <h3>All Doctor Orders</h3>
                <div>You can Show All you orders....</div>
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
                    this.props.history.push({
                      pathname: `${this.props.match.url}/addOrder`,
                      state: 'DoctorOrders'
                    })
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
          {console.log('columns: ', this.state.columns)}
          <Col>
            <DataTableComp
              data={this.state.orderlabList}
              columns={this.state.columns}
              title=''
            />
            {console.log('inputs: ', this.state.formType)}
          </Col>

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
          <ModalForView
            body={this.renderingModalBody()}
            show={this.state.openModal}
            onHide={this.handleClose}
          />

          {this.state.fileResult && (
            <div>
              <Document
                // file={"D:/back-End/Project_v2/public/labs"+this.state.fileResult}
                file={
                  'D:/back-End/Project_v2/public/labs' + this.state.fileResult
                }
                onLoadSuccess={this.onDocumentLoadSuccess}
              >
                <Page pageNumber={this.state.pageNumber} />
              </Document>
              <p>
                Page {this.state.pageNumber} of {this.state.numPages}
              </p>
            </div>
          )}
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

export default AllOrdersForDoctor
