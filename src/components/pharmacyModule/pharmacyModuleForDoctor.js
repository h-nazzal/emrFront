import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import pharmacyModule from '../pharmacyModuleDB.json'
import Spinner from '../shared/Spinner'
import DataTableComp from '../typesGenerator/dataTable'
import ModalForView from './modalForView'

const data = {
  drugs: {
    '44': [
      {
        PID: 44,
        notes: 'null',
        created_date: '2021-05-25T19:59:50.000Z',
        genricName: 'mm',
        PID: 57,
        Quantity: '1',
        Duration: '7',
        refailCount: 1
      },
      {
        PID: 44,
        notes: 'null',
        created_date: '2021-05-25T19:59:50.000Z',
        genricName: 'vx',
        PID: 58,
        Quantity: '1',
        Duration: '7',
        refailCount: 1
      },
      {
        PID: 44,
        notes: 'null',
        created_date: '2021-05-25T19:59:50.000Z',
        genricName: 'ccv',
        PID: 59,
        Quantity: '1',
        Duration: '7',
        refailCount: 1
      }
    ],
    '45': [
      {
        PID: 45,
        notes: 'null',
        created_date: '2021-05-25T19:59:50.000Z',
        genricName: 'mm',
        PID: 57,
        Quantity: '1',
        Duration: '7',
        refailCount: 1
      },
      {
        PID: 45,
        notes: 'null',
        created_date: '2021-05-25T19:59:50.000Z',
        genricName: 'vx',
        PID: 58,
        Quantity: '1',
        Duration: '7',
        refailCount: 1
      },
      {
        PID: 45,
        notes: 'null',
        created_date: '2021-05-25T19:59:50.000Z',
        genricName: 'ccv',
        PID: 59,
        Quantity: '1',
        Duration: '7',
        refailCount: 1
      }
    ]
  },
  prescriptions: [
    {
      id: 44,
      created_date: '2021-05-25T19:59:50.000Z',
      notes: 'null'
    },
    {
      id: 45,
      created_date: '2021-05-25T19:59:50.000Z',
      notes: 'null'
    }
  ]
}
const row = [
  { created_date: 'one', patientName: 'one', notes: 'one' },
  { created_date: 'one', patientName: 'one', notes: 'one' },
  { created_date: 'one', patientName: 'one', notes: 'one' }
]
const drugs = [
  { drugName: 'one', quantity: 'one', duration: 'one', refialCount: '' },
  { drugName: 'one', quantity: 'one', duration: 'one', refialCount: '' }
]
class PharmacyModuleForDoctor extends Component {
  // this Component to View All The Not Accepted Orders in our System
  constructor (props) {
    super(props)
    this.state = {
      type: '',
      loading: false,
      columns: [],
      drugs_columns: [
        {
          name: 'Genric Name',
          selector: 'genricName',
          sortable: true
        },
        {
          name: 'Frequency',
          selector: 'Quantity',
          sortable: true
        },
        {
          name: 'Duration',
          selector: 'Duration',
          sortable: true
        },
        {
          name: 'Refill Count',
          selector: 'refailCount',
          sortable: true
        },
        {
          name: 'prescribed by',
          selector: 'drname',
          sortable: true
        }
      ],
      prescriptionDrugs: [], // this will be viewed in DataTable Component
      openModal: false,
      drugQuantity: '', // remove it if you don't use
      prescriptions: '',
      drugsList: []
    }
  }

  getDrugsForPresctiption = presciptionID => {
    var temp = []
    console.log('All Drugs : ', this.state.drugsList)
    for (var p of this.state.drugsList[presciptionID]) {
      temp.push(p)
    }
    this.setState({ prescriptionDrugs: temp })
    temp = []
  }

  async componentDidMount () {
    this.setState({ type: 'pharmacyModule' })
    var type = 'pharmacyModule'
    // **for Pharmacist to get PatientData with code***
    await this.getDataForDoctorPrescriptions(type)
    await this.handleDataTableColumnsForDoctor(type)
    this.handleDaTaTableModel()
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }

  handleopenModal = () => {
    this.setState({ openModal: true })
  }

  handleAccept = async (id, value) => {
    console.log('Accepted IDS:  ', this.state.acceptedIds, ' value: ', value)
    this.setState({
      prescriptionDrugs: this.state.prescriptionDrugs.filter(
        row => row.PID !== id
      )
    })
    //     var details = {
    //       id : id,
    //       labFDId : localStorage.getItem("labId"),
    //     }

    //     console.log("detilaas : " , details)

    //     var formBody = [];
    //     for (var property in details) {
    //       var encodedKey = encodeURIComponent(property);
    //       var encodedValue = encodeURIComponent(details[property]);
    //       formBody.push(encodedKey + "=" + encodedValue);
    //     }
    //     formBody = formBody.join("&");
    //     console.log("formging:     " , formBody)
    //     console.log("formging:     " , JSON.stringify(details))

    // await fetch(`${pharmacyModule[this.state.type].acceptOrder}`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //       },
    //       body: formBody
    //     }).then((resp)=>{
    //       console.log("Getting: " , resp);
    //       resp.json().then((data)=>{
    //         console.log("ddddddddddddddddd;  " , data[0])
    //         this.setState({
    //           TypeObj:data[0]
    //         })
    //         // object = data
    //       })
    //     }).catch(()=>{
    //       console.log("errror")
    //     })
  }

  getDataForDoctorPrescriptions = type => {
    // getData for Doctor Prescriptions
    var details = {
      ptCode: this.props.history.location.state
    }
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    this.setState({ loading: true })

    fetch(
      `${
        pharmacyModule['pharmacyModule'].getLastTenPrescription
      }/${localStorage.getItem('userId')}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      }
    )
      .then(resp => {
        resp.json().then(data => {
          console.log('All Incomming Data;  ', data)
          this.setState({
            prescriptions: data.prescriptions,
            drugsList: data.drugs,
            loading: false
          })
        })
      })
      .catch(() => {
        this.setState({ loading: false })

        console.log('errror')
      })
  }

  handleDataTableColumnsForDoctor = type => {
    console.log('type: ', type, '  ,,,,,,,')
    var temp = []
    for (var p in pharmacyModule[type].columnsTableForDoctor) {
      if (p === 'actions') {
        pharmacyModule[type].columnsTableForDoctor[p]['cell'] = row => {
          return (
            <div className='row'>
              <div className='col-auto'>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    console.log('id:  ', row)
                    this.handleopenModal()
                    this.getDrugsForPresctiption(row.id)
                  }}
                >
                  Show Prescription
                </button>
                {/* <SessionCode  buttonValue={"Accept"}/> */}
              </div>
            </div>
          )
        }
        temp.push(pharmacyModule[type].columnsTableForDoctor[p])
      } else {
        temp.push(pharmacyModule[type].columnsTableForDoctor[p])
      }
    }
    this.setState({ columns: temp })
    temp = []
    var newState = this.state
    for (var property in pharmacyModule[type].state) {
      newState[property] = ''
    }
    this.setState({ newState })
  }

  handleDaTaTableModel = () => {
    // handle DataTable for Modals
    var temp = []
    for (var pp of this.state.drugs_columns) {
      var p = pp.name
    }
  }
  renderModalBody = () => {
    return (
      <DataTableComp
        data={this.state.prescriptionDrugs} //change it to Drugs
        columns={this.state.drugs_columns}
        title=''
      />
    )
  }

  render () {
    return (
      <Container fluid>
        <Spinner loading={this.state.loading} />
        <Row className='py-3'>
          <Col>
            <h3>All Doctor Prescriptions</h3>
            <div>You will see all your prescriptions...</div>
          </Col>
        </Row>
        {/* <Row className= "py-3" >
                <Col sm={10}></Col>
                    <Col sm={2}><Button variant="success"  onClick = {()=>{
                   this.props.history.push({
                       pathname:`${this.props.history.location.pathname}/prescription`,
                       state:{}
                   })
                    }}>Add New</Button>{' '}</Col>
            </Row> */}

        <Row className='py-3'>
          <Col>
            <DataTableComp
              data={this.state.prescriptions} //change it to Drugs
              columns={this.state.columns}
              title=''
            />
          </Col>
        </Row>
        {this.state.prescriptionDrugs && (
          <ModalForView
            show={this.state.openModal}
            onHide={this.handleClose}
            body={this.renderModalBody()}
          />
        )}
      </Container>
    )
  }
}

export default PharmacyModuleForDoctor
