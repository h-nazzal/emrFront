import axios from 'axios'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import appointements from '../appointements.json'
import SessionCode from '../sessionCode'
import DataTableComp from '../typesGenerator/dataTable'
import ModalComp from '../typesGenerator/modalGenerator'

class Appointements extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [],
      openModal: false,
      ModalInputs: [],
      data: [],
      temp: [],
      typeObj: {},
      type: '',
      formType: 'add',
      validRole: false, // if false ==> not Doctor or DoctorFD , if true ==> Doctor OR DoctorFD
      check: '', // which send to back ==>drId OR ==> drFDId,
      current: [], // for current appointements
      future: [], // for Future appointements
      doctorOrPatientAppointemnt: true, //--> if(true) ==> this for Patient appointements , false -->
      appointementsType: ''
    }
  }

  async componentDidMount () {
    var type = 'ForDoctor' /// in json file ForDoctor object handle all appointments of this doctor
    var appointementsType = this.props.match.params.type /// here if future or current
    this.setState({ type: type, appointementsType: appointementsType })
    var temp = []

    for (var p in appointements[type].columnsTable) {
      // for Adding actions Buttons to DataTable
      if (p === 'actions') {
        appointements[type].columnsTable[p]['cell'] = row => {
          return (
            <div className='row'>
              <div className='col-auto'>
                <Button
                  variant='primary'
                  style={{
                    display: this.compareTimeForEditButton(
                      row.date,
                      row.startDate
                    )
                      ? 'none'
                      : 'block'
                  }}
                  onClick={async () => {
                    this.setUpdatedObj(row.id)
                    this.setState({ formType: 'edit' })
                    this.handleopenModal()
                  }}
                >
                  Update
                </Button>
              </div>
              <div className='col-auto'>
                <Button
                  variant='danger'
                  onClick={() => {
                    this.handleDelete(row.id)
                  }}
                >
                  Delete
                </Button>
              </div>
              <div className='col-auto'>
                <SessionCode
                  hidden={this.compareTimeForEditButton(
                    row.date,
                    row.startDate
                  )}
                  buttonValue='Make Visit'
                  fromComponent='appointement'
                  history={this.props.history}
                />
              </div>
            </div>
            // <Row>
            //   <Col >
            //     <Button  variant="primary"
            //       style={{display :this.compareTimeForEditButton(row.date,row.startDate) ?"none" : "block" }}
            //       onClick={async () => {
            //            this.setUpdatedObj(row.id);
            //           this.setState({formType :"edit"})
            //           this.handleopenModal()
            //         }}>Update</Button>
            //   </Col>
            // <Col>
            // <Button  variant="btn-danger"
            //       onClick={() => {
            //           this.handleDelete(row.id)
            //         }}>Delete
            // </Button>
            // </Col>
            // <Col>

            // <SessionCode hidden={this.compareTimeForEditButton(row.date,row.startDate)}
            // buttonValue="Make Visit" fromComponent="appointement" history= {this.props.history}/>
            // </Col>

            // </Row>
          )
        }
        temp.push(appointements[type].columnsTable[p])
      } else if (p === 'patientName') {
        appointements[type].columnsTable[p]['cell'] = row => {
          return (
            <div className='row'>
              <div className='col-auto'>
                <a
                  style={{ color: '#007bff', cursor: 'pointer' }}
                  onClick={e => {
                    e.preventDefault()
                    this.props.history.push('/clinicalDashBoard/' + row.ptId)
                  }}
                >
                  {row.firstName + ' ' + row.secondName + ' ' + row.lastName}
                </a>
              </div>
            </div>
          )
        }
        temp.push(appointements[type].columnsTable[p])
      } else {
        temp.push(appointements[type].columnsTable[p])
      }
    }
    this.setState({ columns: temp })
    temp = []

    ////////////////////////////////// / * ForAddition *////////////////////////////
    var details = {}
    for (var p in appointements[type].modalAdditionForms) {
      // for Addition Form Inputs
      temp.push(appointements[type].modalAdditionForms[p])
      console.log('here: ', appointements[type].modalAdditionForms[p]['name'])
    }
    this.setState({
      ModalAddtionInputs: temp
    })

    // ////////////////////////////////// / * ForUpdate *////////////////////////////
    temp = []
    details = {}
    for (var p in appointements[type].modalUpdateForms) {
      // for Update Form Inputs
      temp.push(appointements[type].modalUpdateForms[p])
    }
    this.setState({
      ModalInputs: temp
    })
    console.log('details for updating: ', details)

    ////////////////////////////////// / * setNew State With user attributes *////////////////////////////
    var newState = this.state
    for (var property in appointements[type].state) {
      // to put Appointements attributes in Component's state
      newState[property] = ''
    }

    await this.checkRole()
    await this.getData(type, appointementsType)
  }
  getData = async (type, appointementsType) => {
    await axios
      .post(`${appointements[type].getAllappointementsForDoctor}`, {
        drId: localStorage.getItem('userId')
        ///heree you must change it according to back
      })

      .then(async resp => {
        console.log('resp : ', resp)
        var dateNow1 = new Date()
        var d = new Date(dateNow1),
          mnth = ('0' + (dateNow1.getMonth() + 1)).slice(-2),
          day = ('0' + dateNow1.getDate()).slice(-2)
        var dateNow2 = [dateNow1.getFullYear(), mnth, day].join('-')

        if (appointementsType === 'current') {
          var current = resp.data.filter(element => {
            if (element.date == dateNow2) {
              return element
            }
          })
          await this.setState({ data: current })
          console.log('Current Response: ', current)
        }

        if (appointementsType === 'future') {
          var future = resp.data.filter(element => {
            if (element.date > dateNow2) {
              return element
            }
          })
          this.setState({ data: future })
          console.log('Future Response daaaaaang: ', future)
        }
      })
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }
  handleopenModal = () => {
    this.setState({ openModal: true })
  }

  setUpdatedObj = id => {
    var obj = this.state.data.find(row => row.id === id)
    console.log('obj: ', obj)
    this.setState({ typeObj: obj })
  }

  handleUpdate = async () => {
    var details = {}

    for (var property in appointements[this.state.type].updatedDetails) {
      details[property] = this.state[property] || this.state.typeObj[property]
    }
    console.log('details on update : ', details)
    details['id'] = this.state.typeObj.id
    // details["appId"] = this.state.typeObj.id;
    // details["check"] = this.state.check;

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    console.log('formBody: ', formBody)
    await fetch(`${appointements[this.state.type].updateAppointements}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(() => {
        console.log('it is inserted')
      })
      .catch(() => {
        console.log('errror')
      })
    this.getData(this.state.type, this.state.appointementsType)
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
    // formBody = formBody.join("&");

    fetch(`${appointements[this.state.type].deleteAppointements}`, {
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
      data: this.state.data.filter(row => row.id !== id)
    })
  }
  handleAdding = async () => {
    var details = {}
    for (var p in appointements[this.state.type].addDetails) {
      // for Addition Form Inputs
      details[p] = this.state[p]
    }
    details['id'] = localStorage.getItem('userId')
    // details["check"] = "drFDId";
    details['check'] = this.state.check

    console.log('details on add : ', details)

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    // console.log("formging:     " , formBody)
    var mes = 'yes'
    await fetch(`${appointements[this.state.type].addAppointement}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        resp.json().then(data => {
          console.log('nooooooooooooooooo', data)
          if (data.message === 'date is not empty') {
            console.log('nooooooooooooooooo')
            alert('date is not empty')
          } else if (data.message === 'no user with this Name') {
            alert('no user with this Name')
          } else {
          }
        })
      })
      .catch(e => {
        console.log('error on Adding...', e)
        // this.props.history.push("/ptRegistration")
      })
    this.getData(this.state.type, this.state.appointementsType)
  }

  checkRole = () => {
    if (
      parseInt(localStorage.getItem('role')) != 8 &&
      parseInt(localStorage.getItem('role')) != 2
    ) {
      this.setState({ validRole: true })
    } else {
      this.setState({ validRole: false })
    }
    if (parseInt(localStorage.getItem('role')) == 8) {
      this.setState({ check: 'drId' })
    } else {
      this.setState({ check: 'drFDId' })
    }
  }

  compareTimeForEditButton = (date, startTime) => {
    var appDate2 = date
    var dateNow1 = new Date()

    var d = new Date(dateNow1),
      mnth = ('0' + (dateNow1.getMonth() + 1)).slice(-2),
      day = ('0' + dateNow1.getDate()).slice(-2)
    var dateNow2 = [dateNow1.getFullYear(), mnth, day].join('-')

    if (appDate2 === dateNow2) {
      var time2 =
        dateNow1.getHours() +
        ':' +
        dateNow1.getMinutes() +
        ':' +
        dateNow1.getSeconds()
      console.log('time1 ', time2, 'time2: ', startTime)
      if (startTime > time2) {
        console.log('not Accepted....')
        return true
      }
    } else if (appDate2 < dateNow2) {
      return true
    } else {
      return false
    }
  }

  handleChange = evt => {
    const value = evt.target.value
    console.log('name: ', evt.target.name, ' value: ', evt.target.value)
    this.setState({
      [evt.target.name]: value
    })
  }
  renderingForDoctorAppointements = () => {
    return (
      <>
        <Row className='py-3 mt-5'>
          <ToastContainer />
          <Col>
            {appointements && this.state.appointementsType && (
              <>
                <h3>All Doctor {this.state.appointementsType} Appointements</h3>
                <div>
                  {' '}
                  you will see here your {this.state.appointementsType}{' '}
                  Appointments
                </div>
              </>
            )}
          </Col>
        </Row>
        <Row className='py-3'>
          <Col sm={10}></Col>
          <Col sm={2}>
            <Button
              variant='success'
              onClick={() => {
                this.setState({ formType: 'add' })
                this.handleopenModal()
              }}
            >
              Add New
            </Button>{' '}
          </Col>
        </Row>
        <Row className=' align-items-center'>
          <Col>
            {/* <DataTableComp  data = {this.state.data}  */}
            <DataTableComp
              data={this.state.data}
              columns={this.state.columns}
              title={''}
            />
          </Col>
        </Row>

        {this.state.formType === 'add' &&
        this.state.ModalAddtionInputs &&
        this.state.ModalAddtionInputs.length > 0 ? (
          <ModalComp
            show={this.state.openModal}
            onHide={this.handleClose}
            ModalInputs={this.state.ModalAddtionInputs}
            updatedTypeObj={this.state.typeObj}
            handleChange={this.handleChange}
            handleUpdate={this.handleUpdate}
            handleAdding={this.handleAdding}
            formType={this.state.formType}
          />
        ) : (
          <ModalComp
            show={this.state.openModal}
            onHide={this.handleClose}
            ModalInputs={this.state.ModalInputs}
            updatedTypeObj={this.state.typeObj}
            handleChange={this.handleChange}
            handleUpdate={this.handleUpdate}
            handleAdding={this.handleAdding}
            formType={this.state.formType}
          />
        )}
      </>
    )
  }
  render () {
    const tableData = {
      columns: this.state.columns,
      data: this.state.data
    }

    return <>{this.renderingForDoctorAppointements()}</>
  }
}

export default Appointements
