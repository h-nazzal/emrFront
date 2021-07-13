import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
// import "./form.css";
import { useHistory } from 'react-router-dom'

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
  }
  // },
  // submit: {
  //   margin: theme.spacing(3, 0, 2),
  //   backgroundColor: "#385968",
  //   color: "white",
  // },
}))

const ForgotPassword = () => {
  const [email, setemail] = useState()
  const classes = useStyles()
  const history = useHistory()
  const handleSubmit = async () => {
    console.log('email : ', email)
    var formBody = []
    var details = {
      email: email
    }
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    await fetch('http://localhost:8080/autho/forgetPass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(resp => {
        console.log('yes', resp.data)
      })
      .catch(() => {
        console.log('no')
      })

    history.push({
      pathname: '/forgetPasswordCode',
      state: { email: email }
    })
    // this.context.router.push({ //browserHistory.push should also work here
    //   pathname: "/forgetPasswordCode",
    //   // state: {yourCalculatedData: data}
    // });
  }
  return (
    <div className='container-fluid' style={{ height: '100%' }}>
      <div className='row align-items-center' style={{ height: '100%' }}>
        <div className='col-4 justify-content-center '>
          <div className='row'>
            <div className='col justfiy-content-center p-5'>
              <Typography component='h6' variant='h6'>
                please Enter your Email
              </Typography>
              <Form className={classes.form} noValidate>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    id='Email'
                    name='email'
                    autoComplete='Eamil'
                    onChange={event => {
                      setemail(event.target.value)
                    }}
                    placeholder='Enter email'
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <div className='row justify-content-center px-3'>
                  <Button
                    block
                    variant='primary'
                    className={classes.submit}
                    onClick={() => {
                      handleSubmit()
                    }}
                  >
                    Send Code
                  </Button>
                </div>

                {/* <Link
            to={{
              pathname: "/forgetPasswordCode",
               // your data array of objects
            }}
          ><Button variant="contained" onClick ={() =>{
               handleSubmit()
           }}>Submit</Button>
           </Link> */}
              </Form>
            </div>
          </div>
        </div>
        <div
          className='col-8 bg-primary'
          style={{
            height: '100%',
            backgroundImage: "url('./images/side2.jpg') ",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        ></div>
      </div>
    </div>
  )
}
export default ForgotPassword
