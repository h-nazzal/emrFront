import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
// import "./form.css";
import { useHistory, useLocation } from 'react-router-dom'
// import InputLabel from '@material-ui/core/InputLabel';

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

const ChangePassword = () => {
  const location = useLocation()
  const [pass1, setPass1] = useState()
  const [pass2, setPass2] = useState()
  const [email, setEmail] = useState()
  const classes = useStyles()
  const history = useHistory()
  useEffect(() => {
    console.log('from change Pass: ', location.state.email)

    setEmail(location.state.email)
    // var details = {
    //     id:id
    //   }
    //   var formBody = [];
    //   for (var property in details) {
    //     var encodedKey = encodeURIComponent(property);
    //     var encodedValue = encodeURIComponent(details[property]);
    //     formBody.push(encodedKey + "=" + encodedValue);
    //   }
    //   // formBody = formBody.join("&");

    //   fetch(`http://localhost:3000/allergy/getById`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     },
    //     body: formBody
    //   }).then((resp)=>{
    //     console.log("Getting: " , resp);
    //     resp.json().then((data)=>{
    //       console.log("ddddddddddddddddd;  " , data[0])
    //       this.setState({
    //         TypeObj:data[0]
    //       })
    //       object = data
    //     })
    //   }).catch(()=>{
    //     console.log("errror")
    //   })
  }, [])

  const handleSubmit = async () => {
    // console.log("email : " , code);
    var formBody = []
    var details = {
      newPassword: pass1,
      email: email
    }
    for (var property in details) {
      var encodedKey = encodeURIComponent(property)
      var encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    await fetch('http://localhost:8080/autho/updatePass', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
      .then(() => {
        console.log('yes')
      })
      .catch(() => {
        console.log('no')
      })
    // this.context.router.push({ //browserHistory.push should also work here
    //   pathname: "/forgetPasswordCode",
    //   // state: {yourCalculatedData: data}
    // });
    // history.push("/login");
  }
  return (
    <div className='form-hero row'>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component='h6' variant='h6'>
            Please Enter your the code we sent
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2} justify='center'>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  type='password'
                  required
                  size='small'
                  id='pass1'
                  label='New Password'
                  name='pass1'
                  autoComplete='pass1'
                  onChange={event => {
                    setPass1(event.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className='mt-3' justify='center'>
              <Grid item xs={6}>
                <TextField
                  variant='outlined'
                  required
                  type='password'
                  size='small'
                  id='pass2'
                  label='Confirm Password'
                  name='pass2'
                  autoComplete='pass2'
                  onChange={event => {
                    setPass2(event.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <div className='row justify-content-center'>
              <Button
                variant='contained'
                className={classes.submit}
                onClick={() => {
                  handleSubmit()
                }}
              >
                Verify
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
          </form>
        </div>
      </Container>
    </div>
  )
}
export default ChangePassword
