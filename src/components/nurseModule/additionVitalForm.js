import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Autocomplete } from '@material-ui/lab'
import { Input, TextField } from '@material-ui/core'

// this file will genrate the basic form groups to be loaded into a <form> element.

class AdditionVital extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  // change Form Button with update and add or upload
  renderFormButton = () => {
    // eslint-disable-next-line default-case
    switch (this.props.formType) {
      case 'add': {
        return (
          <Button
            block
            variant='primary'
            onClick={() => {
              this.props.handleAdding()
            }}
          >
            Add
          </Button>
        )
      }
      case 'edit': {
        return (
          <Button
            block
            variant='primary'
            onClick={() => {
              this.props.handleUpdate()
            }}
          >
            update
          </Button>
        )
      }
      case 'upload': {
        return (
          <Button
            block
            variant='primary'
            onClick={() => {
              this.props.handleUpdate()
            }}
          >
            upload
          </Button>
        )
      }
    }
  }
  renderInputType = input => {
    switch (input.type) {
      case 'select': {
        return (
          <Form.Group controlId='exampleForm.SelectCustom'>
            <Form.Label>{input.name}</Form.Label>
            {console.log('input: ', input)}
            <Form.Control
              as='select'
              name={input.name}
              onChange={e => {
                console.log('e: ', e)
                this.props.handleChange(e)
              }}
              custom
            >
              <option>Choose your option</option>
              {input.options
                ? input.options.map(option => {
                    {
                      /* if this component have not options in props but have it jsonFile */
                    }
                    // return <option value={option.value} >{option.text}</option>
                    return <option value={option.value}>{option.text}</option>
                  })
                : this.props.options.map(option => {
                    {
                      /* if this component have options in props */
                    }
                    return (
                      <>
                        <option value={option.value}>{option.text}</option>
                      </>
                    )
                  })}
            </Form.Control>
          </Form.Group>
        )
      }
      case 'dataList': {
        return (
          <>
            <input
              list='browsers'
              name='browser'
              id='browser'
              onChange={e => {
                console.log('eeeeee: ', e.target.value)
              }}
            />
            <datalist id='browsers'>
              {input.options
                ? input.options.map(option => {
                    {
                      /* if this component have not options in props but have it jsonFile */
                    }
                    // return <option value={option.value} >{option.text}</option>
                    return <option value={option.value}>{option.text}</option>
                  })
                : this.props.options.map(option => {
                    {
                      console.log('input : ', option)
                      /* if this component have options in props */
                    }
                    return (
                      <>
                        <option label='Владивосток'>{option.text}</option>
                      </>
                    )
                  })}
            </datalist>
          </>
        )
      }
      case 'autoComplete': {
        console.log('input: ', input)
        return (
          <>
            <Form.Label>{input.label || input.name} </Form.Label>
            {input.options ? (
              <Autocomplete
                id='combo-box-demo'
                options={input.options}
                onChange={(event, newValue) => {
                  console.log('e: ', newValue, input)
                  var e = {
                    text: 'autoComplete',
                    newValue: newValue,
                    input: input.name
                  }
                  this.props.handleChange(e)
                }}
                getOptionLabel={option => option.text}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='Choose Your frontDist'
                    variant='outlined'
                  />
                )}
              />
            ) : (
              <Autocomplete
                id='combo-box-demo'
                options={this.props.options}
                onChange={(event, newValue) => {
                  console.log('e: ', newValue, input)
                  var e = {
                    text: 'autoComplete',
                    newValue: newValue,
                    input: input.name
                  }
                  this.props.handleChange(e)
                }}
                getOptionLabel={option => option.text}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={input.placeHolder || 'Choose Your frontDisk'}
                    variant='outlined'
                  />
                )}
              />
            )}
          </>
        )
      }
      default: {
        return (
          <Form.Group controlId={input.name}>
            {/* <Form.Label>{input.label || input.name} </Form.Label> */}
            <Form.Label>{input.label || input.name} </Form.Label>
            <Form.Control
              type={input.type}
              name={input.name}
              placeholder={
                this.props.formType === 'edit'
                  ? this.props.updatedTypeObj[input.name]
                  : ''
              }
              onChange={e => {
                this.props.handleChange(e)
              }}
            />
          </Form.Group>
        )
      }
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <Form style={{ width: '' }}>
        <Col sm={12}>
          <Row className='align-items-center'>
            <Col sm={6}>
              <Form.Group>
                {/* <Form.Label>{input.label || input.name} </Form.Label> */}
                <Form.Label>Tempreture </Form.Label>
                <Form.Control
                  type={'number'}
                  min={30}
                  max={50}
                  step={0.01}
                  name='temperature'
                  placeholder={'Temprature'}
                  onChange={e => {
                    this.props.handleChange(e)
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Label>Oxygen saturation</Form.Label>
              <Row className='align-items-center ml-1'>
                <Col sm={8} style={{ padding: '0' }}>
                  <Form.Group>
                    {/* <Form.Label>{input.label || input.name} </Form.Label> */}

                    <Form.Control
                      type={'number'}
                      name='oxygenSaturation'
                      placeholder={' '}
                      onChange={e => {
                        this.props.handleChange(e)
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col sm={2}>
                  <Row>
                    <span className='' style={{ marginBottom: ' 0.6em' }}>
                      <h4>%</h4>
                    </span>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col sm={4}>
              <Form.Group>
                {/* <Form.Label>{input.label || input.name} </Form.Label> */}
                <Form.Label>Systolic Blood Pressure</Form.Label>
                <Form.Control
                  type={'number'}
                  name='systolic'
                  placeholder={'systolic BloodPressure (MmHG)'}
                  onChange={e => {
                    this.props.handleChange(e)
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={2}>
              <span style={{ fontSize: '2.2em' }}>/</span>
            </Col>
            <Col sm={4}>
              <Form.Group>
                {/* <Form.Label>{input.label || input.name} </Form.Label> */}
                <Form.Label>Diastoilc Blood Pressure </Form.Label>
                <Form.Control
                  type={'number'}
                  name='diastolic'
                  placeholder={'diastoilc BloodPressure (MmHG)'}
                  onChange={e => {
                    this.props.handleChange(e)
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                {/* <Form.Label>{input.label || input.name} </Form.Label> */}
                <Form.Label>Pulse </Form.Label>
                <Form.Control
                  type={'number'}
                  name='pulse'
                  placeholder={'Pulse (minute)'}
                  onChange={e => {
                    this.props.handleChange(e)
                  }}
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                {/* <Form.Label>{input.label || input.name} </Form.Label> */}
                <Form.Label>Blood Glucose level </Form.Label>
                <Form.Control
                  type={'number'}
                  name='bloodGlucoseLevel'
                  placeholder={'Blood Glucose level '}
                  onChange={e => {
                    this.props.handleChange(e)
                  }}
                />
              </Form.Group>
            </Col>
            {/* If You want to choose the name from DataBase */}
            {/* <Col sm={6}>
          <Row>
          <Form.Label>Taken By</Form.Label>
          <Autocomplete
            id="combo-box-demo"
            
            options={this.props.options}
            onChange = {(event, newValue) =>{
            //   console.log("e: " , newValue , input)
              var e = {
                text : "autoComplete",
                newValue : newValue ,
                input : "takenBy"
              }
              this.props.handleChange(e)
            }}
            getOptionLabel={(option) => option.firstName + " " +option.secondName + " " + option.lastName }
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Choose Your Name" variant="outlined" />}
          />    
          </Row>
          
            
        </Col> */}
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group>
                {/* <Form.Label>{input.label || input.name} </Form.Label> */}
                <Form.Label>Smoking status</Form.Label>
                <Form.Control
                  type={'number'}
                  name='cigarettes'
                  placeholder={'cigarettes smoked'}
                  onChange={e => {
                    this.props.handleChange(e)
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='justify-content-end mt-2'>
            <Col sm={12}>{this.renderFormButton()}</Col>
          </Row>
          <Row></Row>
        </Col>
      </Form>
    )
  }
}

export default AdditionVital
