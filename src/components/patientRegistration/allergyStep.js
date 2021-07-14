import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { Component } from 'react'
import axios from 'axios'
import steps from './patientRegistrationDB.json'
import DataTableComp from '../typesGenerator/dataTable'
import ModalGenerator from './../ModalGeneration/modalGeneration'
import FormGenerator from '../Forms/formGenerationNew'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class AllergyStep extends Component {
  constructor (props) {
    super(props)

    this.state = {
      allergyList: [], // to load data with it in table
      openModal: false,
      TypeObj: {},

      key: 1, // ** remove it if you don't use in another lists

      activeStatus: true, // for Changing
      columns: [], // to handle Columns of the table
      formInputs: [], // to handle Form Inputs the addition or update
      formType: '', // edit or add
      stepType: '' // if it is allergy or onGoingproblems or surgeries or interventions
    }
  }
  //** to get the row which will updated */
  getTypeByID = async id => {
    var updatedObj = await this.state.allergyList.filter(item => item.id === id)
    console.log('UpdatedObject: ', updatedObj[0])
    this.setState({ TypeObj: updatedObj[0] })
  }
  // for Modal
  handleopenModal = () => {
    this.setState({ openModal: true })
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }

  // ***delete from table
  handleDelete = async id => {
    this.setState({
      allergyList: this.state.allergyList.filter(row => row.id !== id)
    })
  }

  // ** handle Inputs of forms (addition or update) from Json file
  handleFormInputs = type => {
    var temp = []
    for (var property in steps[type].modalForms) {
      temp.push(steps[type].modalForms[property])
    }
    this.setState({ formInputs: temp })
  }

  // ** this function used to change status from active to resolved ----> Not Completed...
  changeActiveStatus = async row => {
    var obj = row
    console.log('objjj: ', obj)
    if (obj['status'] === 'Active') {
      obj['status'] = 'Resolved'
    } else {
      obj['status'] = 'Active'
    }

    var details = {}
    // for Update Form Inputs

    for (var p in steps[this.state.stepType].state) {
      if (p === 'status') {
        if (this.state.TypeObj[p] === 'Active') {
          details[p] = 'Resolved'
        } else {
          details[p] = 'Active'
        }
      } else {
        details[p] = this.state.TypeObj[p]
      }
    }
    // var obj = this.state.allergyList.find((item) => item == this.state.TypeObj);

    const items = this.state.allergyList.map(item =>
      item == this.state.TypeObj ? details : item
    )
    console.log('iteeeeems: ', items)

    this.setState({ allergyList: [...items] })

    // const items = await this.state.allergyList.map((item) =>
    //   item == row ? obj : item
    // );

    // this.setState({ allergyList: items });

    // console.log("AfterChangint: ", obj);
  }
  setAllergyListWithHomeList = type => {
    // eslint-disable-next-line default-case
    switch (type) {
      case 'allergyStep': {
        console.log(
          'allergyListFrom Hooooooooom : ',
          this.props.allergyListHome
        )
        if (
          this.props.allergyListHome &&
          this.props.allergyListHome.length > 0
        ) {
          this.setState({
            allergyList: this.props.allergyListHome,
            key: this.props.allergyListHome.length + 1
          })
        }
        break
      }
      case 'familyHistory': {
        if (
          this.props.familyHistoryListHome &&
          this.props.familyHistoryListHome.length > 0
        ) {
          this.setState({
            allergyList: this.props.familyHistoryListHome,
            key: this.props.familyHistoryListHome.length + 1
          })
        }
        break
      }
      case 'surgeries': {
        if (
          this.props.surgeriesListHome &&
          this.props.surgeriesListHome.length > 0
        ) {
          this.setState({
            allergyList: this.props.surgeriesListHome,
            key: this.props.surgeriesListHome.length + 1
          })
        }
        break
      }
      case 'onGoingProblems': {
        if (
          this.props.onGoingProblemListHome &&
          this.props.onGoingProblemListHome.length > 0
        ) {
          this.setState({
            allergyList: this.props.onGoingProblemListHome,
            key: this.props.onGoingProblemListHome.length + 1
          })
        }
        break
      }
    }
  }
  async componentDidMount () {
    var type = this.props.type // change it with steptype props

    await this.setAllergyListWithHomeList(type)
    this.setState({ stepType: type })
    await this.handleDataTable(type)
    await this.handleFormInputs(type)
    var newState = this.state

    this.getTypesFromDB()

    // *** to fill the state of this stepType component
    for (var property in steps[type].state) {
      newState[property] = steps[type].state[property]
    }

    // this for Navigation if you go to another step the information still at it is
  }
  // update DataTable
  handleUpdate = async () => {
    var details = {}
    // for Update Form Inputs

    for (var p in steps[this.state.stepType].state) {
      if (this.state[p]) {
        details[p] = this.state[p]
      } else {
        details[p] = this.state.TypeObj[p]
      }
    }

    console.log('UpdatedObj....: ', this.state.TypeObj)
    details['id'] = this.state.TypeObj['id']
    console.log('details to Update: ', details)
    // var obj = this.state.allergyList.find((item) => item == this.state.TypeObj);

    const items = await this.state.allergyList.map(item =>
      item.id == this.state.TypeObj.id ? details : item
    )

    console.log('iteeeeems: ', items)

    this.setState({ allergyList: items })
  }

  componentDidUpdate () {
    this.props.getAllergyList(this.state.allergyList)
  }

  handleDataTable = type => {
    var temp = []
    for (var property in steps[type].columnsTable) {
      // for Adding actions Buttons to DataTable
      if (property === 'actions') {
        steps[type].columnsTable[property]['cell'] = row => {
          return (
            <div className='row'>
              <div className='col-auto'>
                <button
                  className='btn btn-primary'
                  onClick={async () => {
                    // console.log("rooooow : " , row)
                    // console.log("id:  " , row)
                    await this.getTypeByID(row.id)
                    this.setState({ formType: 'edit' }) // to get the modal of edit
                    this.handleopenModal()
                  }}
                >
                  Update
                </button>
              </div>
              {/* if you want to add button for resolving */}
              {/* <div className="col-auto">
                <button
                  className="btn btn-primary"
                  hidden={this.state.stepType === "allergyStep" ? false : true}
                  onClick={async () => {
                    // console.log("rooooow : " , row)
                    // console.log("id:  " , row)
                    await this.changeActiveStatus(row);
                  }}
                >
                  Resolved
                </button>
              </div> */}
              <div className='col-auto'>
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    this.handleDelete(row.id)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          )
        }
        temp.push(steps[type].columnsTable[property])
      } else {
        temp.push(steps[type].columnsTable[property])
      }
    }
    this.setState({ columns: temp })
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
            text: place.name + ' (' + place.abbreviation + ' )'
          }
          temp2.push(obj)
        }
        this.setState({ options: temp2 })
        temp2 = []
      })
  }
  handleAdding = () => {
    var details = {}
    // for Addition Form Inputs
    for (var p in steps[this.state.stepType].state) {
      details[p] = this.state[p]
    }
    details['id'] = this.state.key

    this.setState({})
    console.log('Addition Object : ', details)
    var joined = this.state.allergyList.concat(details)
    this.setState({ allergyList: joined })
    this.setState({ key: this.state.key + 1 })
  }
  // used on props of the form component to handle the values of all variables
  handleChange = evt => {
    if (evt.text && evt.text === 'autoComplete' && evt.newValue.text) {
      console.log('evt: ', evt, '  Value :')
      this.setState({
        [evt.input]: evt.newValue.value //// **** Here the value after choosing from dropDown will be the name without abbreviation
      })
    } else {
      const value = evt.target.value
      this.setState({
        [evt.target.name]: value
      })
    }
  }
  render () {
    return (
      <Container>
        {console.log(
          'columns : ',
          this.state.columns,
          ' FomInputs: ',
          this.state.formInputs,
          ' state: ',
          this.state
        )}

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
        <Row className='py-3'>
          <Col sm={12} className='py-3'>
            {console.log('list: ', this.state.allergyList)}
            {this.state.allergyList && (
              <DataTableComp
                data={this.state.allergyList}
                columns={this.state.columns}
                title=''
              />
            )}
          </Col>
        </Row>

        <div className='row mt-4'></div>

        {this.state.formType === 'add' && this.state.formInputs ? (
          <ModalGenerator
            onHide={this.handleClose}
            show={this.state.openModal}
            formType={this.state.formType}
          >
            <FormGenerator
              hideModal={this.handleClose}
              ModalInputs={this.state.formInputs}
              // updatedTypeObj={this.state.TypeObj}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator>
        ) : (
          <ModalGenerator
            onHide={this.handleClose}
            show={this.state.openModal}
            formType={this.state.formType}
          >
            <FormGenerator
              hideModal={this.handleClose}
              ModalInputs={this.state.formInputs}
              updatedTypeObj={this.state.TypeObj}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator>
        )}
      </Container>
    )
  }
}

export default AllergyStep
