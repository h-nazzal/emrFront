import axios from 'axios'
import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'
class UserInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pId: 1,
      user: {}
    }
  }
  async componentDidMount () {
    console.log('id: ', this.props.id)
    //  await this.setState({pId : this.props.id});
    await this.getUserObj()
  }
  getUserObj = async () => {
    console.log('idddd: ', this.state.pId)
    var details = {
      id: this.props.id
    }
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    await axios
      .post(`http://localhost:8080/pt/findPt`, formBody)
      .then(async resp => {
        // return resp.data;
        await this.setState({ user: resp.data[0] })
        console.log('resp.data: ', resp.data)
      })
  }
  convertDate (inputFormat) {
    function pad (s) {
      return s < 10 ? '0' + s : s
    }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }
  rendering = () => {
    const { stat } = this.state
    const us = this.state.user
    return (
      <Jumbotron>
        <div className='row justify-content-center m-auto'>
          <div class='col-12 text-center'>
            <div>
              <img
                style={{ width: '100px' }}
                src='https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png'
              />
            </div>
            <div>
              <h1>
                {this.state.user.firstName + ' ' + this.state.user.lastName}
              </h1>
            </div>
          </div>
        </div>
        <p>
          here you can find all the clincal data in one place, and make new
          orders , updates to them .
        </p>

        {console.log('user: ', this.state.user)}

        {this.state.user && (
          <div className='col-12  justify-content-center'>
            <div className='row  text-secondary py-2  justify-content-center'>
              <div className='col '>
                <p>
                  <strong>Adress: </strong> {this.state.user.address}
                </p>
              </div>
              <div className='col'>
                <p>
                  <strong>Blood Group: </strong> {this.state.user.bloodGroup}
                </p>
              </div>
              <div className='col '>
                <p>
                  <strong>Phone: </strong> {this.state.user.phone}
                </p>
              </div>
            </div>
            <div className='row text-secondary py-2 '>
              <div className='col-4'>
                <p>
                  <strong>Birth Date: </strong> {this.state.user.birthDate}
                </p>
              </div>
              <div className='col-4'>
                <p>
                  <strong>Marital Status: </strong>{' '}
                  {this.state.user.maritalStatus}
                </p>
              </div>
            </div>
          </div>
        )}
      </Jumbotron>
    )
  }
  componentDidUpdate () {
    this.rendering()
  }
  render () {
    return <div>{this.rendering()}</div>
  }
}

export default UserInfo
