import React, { Component } from 'react'
import clinicalDB from './clinicalDB.json'
import ModalComp from '../typesGenerator/modalGenerator'
import axios from 'axios'
import DataTableComp from '../typesGenerator/dataTable'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FormGenerator from '../Forms/formGenerationNew'
import ModalGenerator from './../ModalGeneration/modalGeneration'

const optionsInput = [
  { id: 1, name: 'alaa' },
  { id: 2, name: 'lol' }
]
class FamilyHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [],
      openModal: false,
      ModalAddtionInputs: [],
      ModalUpdateInputs: [],
      data: [],
      temp: [],
      typeObj: {},
      type: '',
      formType: 'add',
      addingUserObject: {},
      updateUserObject: {},
      options: []
    }
  }
  handleDataTable = type => {
    var temp = []
    var temp2 = []
    for (var p in clinicalDB[type].columnsTable) {
      // for Adding actions Buttons to DataTable
      if (p === 'actionsR') {
        clinicalDB[type].columnsTable[p]['cell'] = row => {
          return (
            <div className='row'>
              <div className='col-auto'>
                <button
                  size='sm'
                  className='btn btn-success'
                  onClick={() => {
                    this.handleResolve(row.id)
                  }}
                >
                  Resolve
                </button>
              </div>

              <div className='col-auto'>
                <button
                  size='sm'
                  className='btn btn-danger'
                  onClick={() => {
                    this.handleDelete(row.id)
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-trash'
                    viewBox='0 0 16 16'
                  >
                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                    <path
                      fill-rule='evenodd'
                      d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        }
        temp.push(clinicalDB[type].columnsTable[p])
      } else if (p === 'actionsD') {
        clinicalDB[type].columnsTable[p]['cell'] = row => {
          return (
            <div className='row'>
              <div className='col-auto'>
                <button
                  size='sm'
                  className='btn btn-danger'
                  onClick={() => {
                    this.handleDelete(row.id)
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    class='bi bi-trash'
                    viewBox='0 0 16 16'
                  >
                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                    <path
                      fill-rule='evenodd'
                      d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        }
        temp.push(clinicalDB[type].columnsTable[p])
      } else {
        temp.push(clinicalDB[type].columnsTable[p])
      }
    }
    this.setState({ columns: temp })
    temp = []
  }
  ///***  to handle Form Inputs***
  handleFormInputs = (type, optionsList) => {
    var details = {}
    var temp2 = []
    var temp = []
    // for Addition Form Inputs
    for (var p in clinicalDB[type].modalAdditionForms) {
      for (var disease of optionsList) {
        var obj = {
          value: disease.id,
          text: disease.name + ' (' + disease.abbreviation + ' )'
        }
        temp2.push(obj)
      }
      console.log('options : ', temp2)
      this.setState({ options: temp2 })
      temp2 = []

      temp.push(clinicalDB[type].modalAdditionForms[p])
      details[clinicalDB[type].modalAdditionForms[p]['name']] = ''
    }
    this.setState({
      ModalAddtionInputs: temp
    })
    console.log('details for Addition: ', details)
  }

  async componentDidMount () {
    var type = this.props.type
    console.log('did mount family.js, ', this.props.id)
    this.setState({ type })
    // put the options Inputs in options which got from jsonFile
    if (type === 'allergy') this.getTypesFromDB()

    if (
      type === 'familyHistory' ||
      type === 'surgeries' ||
      type === 'onGoingProblems' ||
      // type === 'Vitals' ||
      type === 'activeMedication'
    ) {
      var optionsList = await this.loadSelectInputData(type)
      this.handleFormInputs(type, optionsList)
    } else {
      this.handleFormInputs(type, [])
    }
    await this.handleDataTable(type)

    ////////////////////////////////// / * For Modal Forms Inputs *////////////////////////////
    ////////////////////////////////// / * setNew State With user attributes *////////////////////////////

    // to put user attributes in Component's state
    var newState = this.state
    for (var property in clinicalDB[type].state) {
      newState[property] = ''
    }
    await this.getData(type)
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }
  handleopenModal = () => {
    this.setState({ openModal: true })
  }
  // to set the Updated Object to get the old Value from thisa
  setUpdatedObj = id => {
    var obj = this.state.data.find(row => row.id === id)
    this.setState({ typeObj: obj })
  }

  handleUpdate = async () => {
    // **** Change the EndPoint with the New One
    var details = {}

    for (var property in clinicalDB[this.state.type].state) {
      details[property] = this.state[property] || this.state.typeObj[property]
    }
    details['id'] = this.state.typeObj.id

    console.log('details on update : ', details)

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    console.log('formBody: ', formBody)
    await fetch(`${clinicalDB[this.state.type].updateUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(() => {})
      .catch(() => {
        console.log('errror')
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

    fetch(`${clinicalDB[this.state.type].delete}`, {
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
  handleResolve = async id => {
    var details = {
      id: id
    }
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }

    fetch(`${clinicalDB[this.state.type].resolve}`, {
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

    // this.setState({
    //   data: this.state.data.filter(row => row.id !== id)
    // })
  }
  // load data into Select input from DB
  loadSelectInputData = async type => {
    var temp = []
    await axios
      .get(`${clinicalDB[type].getAllDiseases}`, {})
      .then(async resp => {
        console.log('resp : ', resp)
        console.log('AllData: ', resp.data)
        this.setState({ options: resp.data })

        temp = resp.data
      })
    return temp
  }

  handleAdding = async () => {
    // **** Change the EndPoint with the New One
    var details = {}
    // for Addition Form Inputs
    console.log('the thingy', clinicalDB[this.state.type].state)
    for (var p in clinicalDB[this.state.type].state) {
      details[p] = this.state[p]
      console.log('hey', details[p])
    }
    details['ptId'] = this.props.id
    console.log('details on Adding : ', this.state)
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    console.log('the form body:-', formBody)
    console.log('the link', `${clinicalDB[this.state.type].adding}`)
    await fetch(`${clinicalDB[this.state.type].adding}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        resp.json().then(data => {
          console.log('Message From BackEnd: ', data)
        })
      })
      .catch(() => {
        console.log('errror')
      })
    this.getData(this.state.type)
  }
  getData = async type => {
    console.log('UserEndpoint: ', clinicalDB[type].getAll, this.props.id)
    await axios
      .post(`${clinicalDB[type].getAll}`, {
        ptId: this.props.id
      })
      .then(async resp => {
        this.setState({
          data: resp.data,
          temp: resp.data
        })
        console.log('All Incoming Data in GetData Funciton : ', resp.data)
      })
  }
  //** this function used when loading data from DB in dropDown list */
  getTypesFromDB = async () => {
    console.log('====================================================')
    var temp2 = []
    await axios
      .get('http://localhost:8080/allergy/getAllergy', {})
      .then(async resp => {
        console.log('AllIncomingData: ', resp.data)

        //********* Here You should search by abbreviation or name and the value will be the name  */
        for (var place of resp.data) {
          var obj = {
            value: place.name,
            text: place.name
          }
          temp2.push(obj)
        }
        this.setState({ options: temp2 })
        temp2 = []
      })
  }
  handleChange = evt => {
    // console.log('ahhhhh')
    // if it is autoComplete the Object will change it will contain the newValue
    if (
      evt.text &&
      evt.text === 'autoComplete' &&
      evt.newValue &&
      evt.newValue.value
    ) {
      console.log('evt: ', evt, '  Value :')
      this.setState({
        [evt.input]: evt.newValue.value
      })
    } else {
      if (evt.target) {
        // to handle after deletion the choice from autoComplete input
        const value = evt.target.value
        this.setState({
          [evt.target.name]: value
        })
      }
    }
  }
  componentWillUnmount () {
    this.setState({ data: [] })
    this.setState({ type: '' })
  }
  render () {
    const tableData = {
      columns: this.state.columns,
      data: this.state.data
    }

    return (
      <Container>
        {console.log('modalAdditionInputs : ', this.state.ModalAddtionInputs)}
        {console.log('the button flag:', this.props.addButtonFlag)}
        <Row className='py-3'>
          <Col>
            {clinicalDB && this.state.type && (
              <>
                <h3>{clinicalDB[this.state.type].title}</h3>
                <div>{clinicalDB[this.state.type].description}</div>
              </>
            )}
          </Col>
        </Row>
        {this.props.addButtonFlag && (
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
        )}
        <Row className='py-3'>
          <Col sm={12} className='py-3'>
            <DataTableComp
              data={this.state.data}
              columns={this.state.columns}
              tableData={tableData}
              title=''
            />
          </Col>
        </Row>

        {this.state.formType === 'add' &&
        this.state.ModalAddtionInputs &&
        this.state.ModalAddtionInputs.length > 0 ? (
          <ModalGenerator
            onHide={this.handleClose}
            show={this.state.openModal}
            formType={this.state.formType}
          >
            {/*  for Addition Modal */}
            <FormGenerator
              ModalInputs={this.state.ModalAddtionInputs}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator>
        ) : (
          // for Update
          <ModalGenerator
            onHide={this.handleClose}
            show={this.state.openModal}
            formType={this.state.formType}
          >
            {/*  for Updating Modal */}
            <FormGenerator
              updatedTypeObj={this.state.typeObj}
              ModalInputs={this.state.ModalAddtionInputs}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={[]}
              formType={this.state.formType}
            />
          </ModalGenerator>
        )}
      </Container>
    )
  }
}

export default FamilyHistory
