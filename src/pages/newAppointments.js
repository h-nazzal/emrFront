import DateFnsUtils from '@date-io/date-fns'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import appointements from '../components/appointements.json'
import SessionCode from '../components/sessionCode'
import Spinner from '../components/shared/Spinner'
import DataTableComp from '../components/typesGenerator/dataTable'
import ModalComp from '../components/typesGenerator/modalGenerator'

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
      past: [], // for past appointements
      future: [], // for Future appointements
      doctorOrPatientAppointemnt: true, //--> if(true) ==> this for Patient appointements , false -->
      date: '', // for Date Picker value
      loading: false
    }
  }
  getFormattedDate (date) {
    var year = date.getFullYear()

    var month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : '0' + month

    var day = date.getDate().toString()
    day = day.length > 1 ? day : '0' + day

    return month + '/' + day + '/' + year
  }
  async componentDidMount () {
    var type = 'ForDoctor'

    this.setState({ type })
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
      // to put user attributes in Component's state
      newState[property] = ''
    }

    await this.checkRole()
    //   await this.getData(type);
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }
  handleopenModal = () => {
    this.setState({ openModal: true })
  }

  setUpdatedObj = id => {
    var obj = this.state.data.find(row => row.id === id)
    // console.log("obj: " , obj);
    this.setState({ typeObj: obj })
  }

  handleUpdate = async () => {
    var details = {}

    for (var property in appointements[this.state.type].updatedDetails) {
      details[property] = this.state[property] || this.state.typeObj[property]
    }
    details['id'] = this.state.typeObj.id
    //details["appId"] = this.state.typeObj.id;
    //details["check"] = this.state.check;

    console.log('details on update : ', details)

    var formBody = []
    // property is already declared so ??
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    this.setState({ loading: true })
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
        this.setState({ loading: true })
      })
      .catch(() => {
        console.log('errror')
        this.setState({ loading: false })
      })
    this.getData(this.state.type)
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
    this.setState({ loading: true })

    fetch(`${appointements[this.state.type].deleteAppointements}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(() => {
        console.log('it is deleted')
        this.setState({ loading: false })
      })
      .catch(() => {
        console.log('errror')
        this.setState({ loading: false })
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
    details['check'] = this.state.check
    //details["check"] = "drFDId";

    console.log('details on add : ', details)

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    console.log(
      'formgingggg:     ',
      appointements[this.state.type].addAppointement
    )
    this.setState({ loading: true })

    await fetch(`${appointements[this.state.type].addAppointement}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        console.log('resp.type: ', typeof resp)
        this.setState({ loading: false })

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
      .catch(() => {
        this.setState({ loading: false })

        console.log('errror')
      })
    this.getData(this.state.type)
  }
  getData = async () => {
    var type = this.state.type

    var details = {
      date: this.state.date,
      check: this.state.check, // if He drId or FDId
      id: localStorage.getItem('userId')
    }
    console.log('details: ', details)
    for (var property in appointements[type].getDataObject) {
      details[property] = this.state[property]
    }
    details['id'] = localStorage.getItem('userId')
    var formBody = []

    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    console.log('formBodu : ', formBody)
    this.setState({ loading: true })

    await fetch(appointements[type].getAllappointements, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(response => response.json())
      .then(data => {
        console.log('data: ', data)
        // braz fix date
        let temp = data.map(v => {
          console.log(v)
          let j = new Date(v.date).toLocaleDateString()
          v.date = j
          return v
        })
        this.setState({ data: temp, loading: false })
      })
      .catch(e => {
        this.setState({ loading: false })

        console.log('errror', e)
      })
    console.log('ffffffffffffffffffffffffffffffffffff')
    console.log(this.state.data)
    // await axios.post(`${appointements[type].getAllAppointements}`,).then(async resp => {

    //    this.setState({
    //       data : resp.data,
    //   })
    //   console.log("resp.dataHere: " , resp.data);

    // })
  }
  checkRole = () => {
    if (
      parseInt(localStorage.getItem('role')) != 8 &&
      parseInt(localStorage.getItem('role')) != 2
    ) {
      this.setState({ validRole: true })
    } else {
      console.log('jjjjjjjjjjjjjj')
      this.setState({ validRole: false })
    }
    if (parseInt(localStorage.getItem('role')) == 8) {
      this.setState({ check: 'drId' })
      console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
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
  handleDateChange = async date => {
    console.log('kkkkkk: ', date)
    await this.convert(date)
    this.getData()
  }
  convert = str => {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2)
    var d = [date.getFullYear(), mnth, day].join('-')
    console.log('---------------------------')
    console.log(str)
    console.log(d)
    this.setState({ date: d })
    console.log([date.getFullYear(), mnth, day].join('-'))
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
          <Col>
            {appointements && this.state.type && (
              <>
                <h3>{appointements[this.state.type].title}</h3>
                <div>{appointements[this.state.type].description}</div>
              </>
            )}
          </Col>
        </Row>
        <Row className='justify-content-center mt-5'>
          <Col className='text-center'>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                // label="Material Date Picker"
                format='MM/dd/yyyy'
                value={this.state.date || this.getFormattedDate(new Date())}
                onChange={this.handleDateChange}
              />
            </MuiPickersUtilsProvider>
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

    return (
      <>
        <Spinner loading={this.state.loading} />
        {this.renderingForDoctorAppointements()}
      </>
    )
  }
}

export default Appointements
