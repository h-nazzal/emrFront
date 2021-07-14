import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import orderType from '../ordersdb.json'
import Spinner from '../shared/Spinner'
import DataTableComp from '../typesGenerator/dataTable'

class AcceptOrders extends Component {
  // this Component to View All The Not Accepted Orders in our System
  constructor (props) {
    super(props)
    this.state = {
      type: '',
      loading: false,
      columns: [],
      allNotAcceptedOrders: [] // this will be viewed in DataTable Component
    }
  }
  async componentDidMount () {
    console.log('000000000000000: ', this.props.match.params.code)
    this.setState({
      type: this.props.match.params.type || this.props.match.params.code
    })
    await this.handleDataTableColumns()
    await this.getData(this.props.match.params.type)
  }

  handleAccept = async id => {
    console.log('Accepted IDS:  ', this.state.acceptedIds)
    var details = {
      id: id

      // labId: localStorage.getItem("labId")
    }
    switch (this.state.type) {
      case 'lab':
        // details["labFDId"] = localStorage.getItem("labId");
        details['labFDId'] = localStorage.getItem('userId')
        break
      case 'pathology':
        // details["pathoFDId"] = localStorage.getItem("pathoId");
        details['pathoFDId'] = localStorage.getItem('userId')
        break
      case 'radio':
        details['radioFDId'] = localStorage.getItem('userId')
        // details["radioFDId"] = localStorage.getItem("radioId");
        break
    }
    console.log('detilaas : ', details)

    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    console.log('formging:     ', formBody)
    console.log(
      'Endpoint for accept:     ',
      orderType[this.state.type].acceptOrder
    )

    await fetch(`${orderType[this.state.type].acceptOrder}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        console.log('Getting: ', resp)
        resp.json().then(data => {
          console.log('ddddddddddddddddd;  ', data[0])
          this.setState({
            TypeObj: data[0]
          })
          // object = data
        })
      })
      .catch(() => {
        console.log('errror')
      })
    // this.props.history.push("./orderLabList");
    // this.getData();
    var temp = this.state.allNotAcceptedOrders.filter(row => row.id != id)
    this.setState({ allNotAcceptedOrders: temp })
  }

  getData = async type => {
    var typeOrder = 0
    switch (type) {
      case 'lab':
        typeOrder = 4
        break
      case 'radio':
        typeOrder = 3
        break
      case 'pathology':
        typeOrder = 5
        break
    }
    var details = {
      ptCode: this.props.history.location.state || this.props.match.params.code
    }
    var formBody = []
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')
    console.log('endPoint : ', orderType[type].getNotAcceptedOrders)
    this.setState({ loading: true })
    fetch(`${orderType[type].getNotAcceptedOrders}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        resp.json().then(data => {
          console.log('All Incomming Data;  ', data)

          this.setState({
            allNotAcceptedOrders: data
          })
        })
      })
      .catch(() => {
        console.log('errror')
      })
    this.setState({ loading: false })
  }

  handleDataTableColumns = async () => {
    var type = this.props.match.params.type

    this.setState({ type })

    var temp = []
    console.log(
      'uuuuuuuuuuuuuuuu: ',
      orderType[type].columnsTableForPatientAcceptOrders
    )
    for (var p in orderType[type].columnsTableForPatientAcceptOrders) {
      if (p === 'actions') {
        orderType[type].columnsTableForPatientAcceptOrders[p]['cell'] = row => {
          return (
            <div className='row'>
              <div className='col-auto'>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    console.log('id:  ', row)
                    this.handleAccept(row.id)
                  }}
                >
                  Accept
                </button>
                {/* <SessionCode  buttonValue={"Accept"}/> */}
              </div>
            </div>
          )
        }
        temp.push(orderType[type].columnsTableForPatientAcceptOrders[p])
      } else if (p === 'drname') {
        orderType[type].columnsTableForPatientAcceptOrders[p]['cell'] = row => {
          return (
            <span>{row.OrderingFirstName + ' ' + row.OrderinglastName}</span>
          )
        }
        temp.push(orderType[type].columnsTableForPatientAcceptOrders[p])
      } else if (p === 'ptname') {
        orderType[type].columnsTableForPatientAcceptOrders[p]['cell'] = row => {
          return <span>{row.PtFirstName + ' ' + row.PtlastName}</span>
        }
        temp.push(orderType[type].columnsTableForPatientAcceptOrders[p])
      } else {
        temp.push(orderType[type].columnsTableForPatientAcceptOrders[p])
      }
    }
    console.log('temp :' + temp)
    await this.setState({ columns: temp })
    temp = []
    var newState = this.state
    for (var property in orderType[type].state) {
      // console.log("propertyyyy :  " , property)
      newState[property] = ''
    }
    this.setState({ newState })

    // if the page Will Contain modal

    // for(var p in columns[type].modalForms ){
    //   // console.log("p : " , columns[type].modalForms[p]);
    //   temp.push(columns[type].modalForms[p])
    // }
    // // console.log("temp : "  , temp)
    // this.setState({ModalInputs : temp})
  }

  render () {
    return (
      <Container fluid>
        <Spinner loading={this.state.loading} />
        <Row className='py-3'>
          <Col>
            <h3>All Available Orders for this patient</h3>
            <div>You can accept orders for this patient from here...</div>
          </Col>
        </Row>

        <Row className='py-3'>
          <Col>
            {console.log('columns: ', this.state.columns)}
            <DataTableComp
              data={this.state.allNotAcceptedOrders}
              columns={this.state.columns}
              title=''
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

export default AcceptOrders
