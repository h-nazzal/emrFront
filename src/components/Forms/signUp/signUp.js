import React, { Component } from 'react'
import userType from '../../usersDB.json'
// import FormGenerator from "../formGeneration"
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import FormGenerator from './../formGenerationNew'

const arr = [
  { id: 1, name: 'lab1', abbreviation: '', description: '' },
  { id: 3, name: 'lab1', abbreviation: '', description: '' },
  { id: 2, name: 'lab1', abbreviation: '', description: '' }
]

class SignupList1 extends Component {
  //for Doctor - nurse - pathologist - chemist
  constructor (props) {
    super(props)
    this.state = {
      formInputs: [],
      type: '',
      addingUserObject: {},
      list: [], //for labs or ....
      options: []
    }
  }
  async componentDidMount () {
    var list = []
    this.setState({ type: this.props.match.params.type })
    var type = this.props.match.params.type
    if (
      type === 'pathologist' ||
      type === 'radiogist' ||
      type === 'doctor' ||
      type === 'chemist' ||
      type === 'nurse'
    ) {
      await this.getDataForFD(type)
      // await this.handleFormInputs()
    } else {
      await this.handleFormInputs()
    }
  }

  handleFormInputs = async list => {
    console.log('list: ', this.state.list)
    var type = this.props.match.params.type

    this.setState({ type })

    var temp = []
    // console.log("file: ", userType)

    var newState = this.state
    for (var property in userType[type].state) {
      // console.log("propertyyyy :  " , property)
      newState[property] = ''
    }

    // if the page Will Contain modal
    var option = {}
    var temp2 = []
    for (var p in userType[type].modalAdditionForms) {
      console.log('p : ', p)
      temp.push(userType[type].modalAdditionForms[p])
      if (
        p == 'pathoFDId' ||
        p == 'radioFDId' ||
        p == 'pathoId' ||
        p == 'drFDId' ||
        p === 'labFDId' ||
        p === 'drId'
      ) {
        console.log('//////////////////////////////////////')
        for (var place of this.state.list) {
          // console.log("id: " , place.id , " obj:" , place)
          var obj = null
          if (place.organization) {
            obj = { value: place.id, text: place.organization }
          } else {
            //  obj = {value : place.id , text : place.firstName + " " + place.secondName + " " + place.lastName }
            obj = { value: place.id, text: place.firstName }
          }
          temp2.push(obj)
        }
        console.log('options : ', temp2)
        this.setState({ options: temp2 })
        temp2 = []
      }
      if (p == 'drId') {
        console.log('DoctorFD Here ')
        for (var doctor of this.state.list) {
          // console.log("id: " , place.id , " obj:" , place)
          var obj = {
            value: doctor.id,
            text:
              doctor.firstName + ' ' + doctor.secondName + ' ' + doctor.lastName
          }
          temp2.push(obj)
        }
        console.log('options : ', temp2)
        this.setState({ options: temp2 })
        temp2 = []
      }
    }
    this.setState({ formInputs: temp })
  }

  handleChange = evt => {
    // console.log("evnet " , evt.target.value)
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
        const value = evt.target.value
        this.setState({
          [evt.target.name]: value
        })
      }
    }
  }

  getDataForFD = type => {
    //Ex: get lab names for labFD
    console.log(
      'endpoint to get info from DB in dropDownButton:  ',
      userType[type].getAllDataFD
    )
    axios.get(`${userType[type].getAllDataFD}`, {}).then(async resp => {
      this.setState({ list: resp.data })
      console.log('AllData: ', resp.data)
      // return resp.data
      this.handleFormInputs(resp.data)
    })
  }
  handleSignup = async () => {
    var details = {}

    for (var property in userType[this.state.type].state) {
      // console.log("propertyyyy :  " , property)
      details[property] = this.state[property]
    }
    console.log('details: ', details)

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    console.log('formBodu : ', formBody)

    await fetch(`${userType[this.state.type].addUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        resp.text().then(text => {
          console.log('text:  ', text)
          this.props.history.push('/login')
        })
      })
      .catch(() => {
        //**Toastify */
        console.log('errror')
      })
    //  this.props.history.push("/login")
  }

  render () {
    return (
      <div className='container-fluid'>
        <div
          className='row no-gutter'
          style={{
            marginTop: '-20px'
          }}
        >
          <div className='col-md-8 col-lg-6'>
            <div className='login d-flex align-items-center py-5'>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-9 col-lg-8 mx-auto'>
                    {}
                    {this.state.formInputs &&
                      this.state.formInputs.length > 0 && (
                        <FormGenerator
                          ModalInputs={this.state.formInputs}
                          handleChange={this.handleChange}
                          handleAdding={this.handleSignup}
                          options={this.state.options}
                          buttonTitle='Signup'
                          formType='add'
                        />
                      )}
                    <div className='text-center'>
                      <a className='small' href='/forgetPassword'>
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='d-none d-md-flex col-md-4 col-lg-6 bg-image'></div>
        </div>
      </div>
    )
  }
}

export default SignupList1
