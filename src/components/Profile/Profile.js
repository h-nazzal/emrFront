import { Grid } from '@material-ui/core'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import axios from 'axios'
import React, { useEffect } from 'react'
import Spinner from '../shared/Spinner'
import ChangePassword from './CPassword'
import './profile.css'
const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))

export default function Profile (props) {
  const classes = useStyles(props)
  const [file, setFile] = React.useState(null)
  const [user, setUser] = React.useState(null)
  const [img, setImg] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  //get the logged in user id
  var userId = localStorage.getItem('userId')

  //handle Modal Open
  const handleOpen = () => {
    setOpen(true)
  }
  //handle Modal CLose
  const handleClose = () => {
    setOpen(false)
  }

  //Update Photo function
  const updatePhoto = () => {
    let data = new FormData()
    if (!file) {
      return
    }
    data.append('image', file)
    data.append('userId', userId)
    setLoading(true)

    // axios.post('http://localhost:8080/authenticate/update_phote',data).then(result=>{
    axios
      .post('http://localhost:8080/profile/photo', data)
      .then(result => {
        setLoading(false)
        console.log(result.data)
        setImg('http://localhost:8080/images/' + result.data)
      })
      .catch(err => {
        setLoading(false)

        console.log(err)
      })
  }
  //get user on first load
  useEffect(async () => {
    await getUser()
  }, [])

  //function to retrieve the user data with userId
  const getUser = () => {
    // axios.get('http://localhost:8080/profile/user/'+userId).then(result=>{
    setLoading(true)

    axios
      .get('http://localhost:8080/authenticate/update_phote/user/' + userId)
      .then(result => {
        console.log('result :   ', result)
        setUser(result.data)
        setLoading(false)

        setImg('http://localhost:8080/images/' + result.data.image)
        console.log(img)
      })
      .catch(err => {
        setLoading(false)

        console.log(err)
      })
  }

  //update photo in case the file path changed
  useEffect(() => {
    updatePhoto()
  }, [file])

  //set file path after select
  const fileChangedHandler = event => {
    setFile(event.target.files[0])
  }

  return (
    <div>
      <Spinner loading={loading} />

      <Grid
        style={{ position: 'absolute', marginTop: 25 }}
        container
        spacing={3}
      >
        {/* Box Start */}
        <div className='main-box'>
          {/* Upoad Button Start */}
          <input
            accept='image/*'
            className={classes.input}
            id='icon-button-file'
            type='file'
            onChange={fileChangedHandler}
          />
          <label htmlFor='icon-button-file'>
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='span'
            >
              <PhotoCamera />
            </IconButton>
          </label>
          {/* Upload Button End */}

          {/* Cover Start */}
          <img
            className='cover'
            id='blah'
            src='https://images.ctfassets.net/7thvzrs93dvf/wpImage18643/2f45c72db7876d2f40623a8b09a88b17/linkedin-default-background-cover-photo-1.png?w=800&q=100'
          />
          {/* Cover End */}

          {/* Profile Image Start */}
          <div className='dp-container'>
            <img className='dp' src={img} />
          </div>
          {/* Profile Image End */}

          {/* User Data Start */}
          <div className='box'>
            {/* User Data Content Start */}
            <div className='main-content'>
              <h3 className='profile-h3'>
                User Name : {user != null && user.userName}
              </h3>
              <h4 className='profile-h3'>
                Email : {user != null && user.Email}
              </h4>
              {/* <div class="content">
                        <h4>Thoothukudi, Tamil Nadu, India</h4> 
                        <ul class="content">
                        <li><span>97 connection</span></li>
                        <li><span>contact info</span></li>
                        </ul>
                    </div> */}
            </div>
            {/* User Data Content Start */}
          </div>
          {/* User Data Start */}

          <button className='but' onClick={() => handleOpen()}>
            Change Password
          </button>
          {/* <button class="but1">Add Profile section</button>
                <button class="but1">More...</button> */}
        </div>
        {/* <Grid item xs={6}>
            <ChangePassword userId={userId} />
        </Grid>
        <Grid item xs={6}>  
        <   Info userId={userId} />
        </Grid> */}
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <ChangePassword modalClose={handleClose} userId={userId} />
            </div>
          </Fade>
        </Modal>
      </Grid>
    </div>
  )
}
