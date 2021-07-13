import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import "./form.css";
import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  marginTopp: {
    marginTop: theme.spacing(11),
    backgroundColor: 'yellow'
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#e7f0f4',
    border: '1px solid #fff',
    boxShadow: '4px 3px 16px 1px #fff',
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding: '1em',
    borderRadius: '1em'
  },
  iconsColor: {
    color: '#385968'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#385968'
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#385968',
    color: 'white'
  }
}))

const ForgotPasswordCode = () => {
  const [code, setCode] = useState()
  const [email, setEmail] = useState()
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()
  useEffect(props => {
    setEmail(location.state.email)
  }, [])

  const handleSubmit = async () => {
    console.log('email : ', code)
    var formBody = []
    var details = {
      code: code,
      email: email
    }
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    await fetch('http://localhost:8080/autho/getCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        resp.json().then(mes => {
          console.log('resp :', mes)
          if (mes.message === 'done') {
            history.push({
              pathname: '/changePassword',
              state: { email: email }
            })
          } else {
            console.log('please enter the code again')
          }
        })
      })
      .catch(() => {
        console.log('no')
      })
  }
  return (
    <div className='container-fluid' style={{ height: '100%' }}>
      <div className='row align-items-center' style={{ height: '100%' }}>
        <div className='col-4 justify-content-center no-gutter'>
          <div className='row'>
            <div className='col justfiy-content-center'>
              <div className='row'>
                <div className='col justfiy-content-center'>
                  <h3>Verification of ownership</h3>
                </div>
              </div>

              <Form className={classes.form} noValidate>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Recovery Code</Form.Label>
                  <Form.Control
                    type='email'
                    id='code'
                    label='Code'
                    name='code'
                    autoComplete='Eamil'
                    onChange={event => {
                      setCode(event.target.value)
                    }}
                    placeholder='Enter Code'
                  />
                  <Form.Text className='text-muted'>
                    Check your inbox for the code .
                  </Form.Text>
                </Form.Group>

                <Button
                  variant='primary'
                  className={classes.submit}
                  onClick={() => {
                    handleSubmit()
                  }}
                >
                  Verify
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <div
          className='col-8 bg-primary'
          style={{
            height: '100%',
            backgroundImage: "url('./images/side3.jpg') ",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></div>
      </div>
    </div>
  )
}
export default ForgotPasswordCode
