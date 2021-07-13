import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import  { useState , useEffect } from 'react';
import { useHistory } from "react-router-dom";
import FormGenerator from "./formCompoenent";

const useStyles = makeStyles((theme) => ({
  marginTopp:{
    // marginTop: theme.spacing(11),
    // backgroundColor :"yellow"
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:"#e7f0f4",
    border:"1px solid #fff",
    boxShadow:"4px 3px 16px 1px #fff",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding:"1em",
    borderRadius:"1em"

  },
  iconsColor:{
    color:"#385968"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor:"#385968",
    textAlign:"center",
    margin :"0.5em auto",
    
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(3),

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:"#385968",
  },

}));

export default function SignupList1() {
  const [firstname, setFrestname] = useState();
  const [lastName, setlastName] = useState();
  const [ birthdate, setBirthdate] = useState();
  const [ degree, setDegree] = useState();
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();

  const [formObj, setFormObj] = useState({});
  const history = useHistory();
  // const [, setAddress] = useState();
  const classes = useStyles();
  const [role, setRole] = useState("doctor");
  

useEffect(()=>{
  if(role === "doctor"){
    console.log("yes")
  }
  else{
    console.log("Noo")
  }
},[])
var obj ={}
if(role === "doctor"){
   obj ={
    'firstName':"",
    'lastName': "", 
    'Date': "",
    'degree' : "",
    'userName': "",
    'password': "",
    'Email': "",
    'phone' : "",
    'Address': "",
    role :"doctor",
    rootPath:"doctor",
    relativePath :"addDoctor"
  }
}
else if(role === "radiogist"){
   obj ={
    'firstName':"",
    'lastName': "", 
    'Date': "",
    'degree' : "",
    'userName': "",
    'password': "",
    'Email': "",
    'phone' : "",
    'Address': "",
    role :"radiogist",
    rootPath:"radiogist",
    relativePath :"addRadiogist"
  }
}
else if(role === "pathologist"){
   obj ={
    'firstName':"",
    'lastName': "", 
    'Date': "",
    'degree' : "",
    'userName': "",
    'password': "",
    'Email': "",
    'phone' : "",
    'Address': "",
    role :"pathologist",
    rootPath:"pathologist",
    relativePath :"addPathologist"
  }
}
else if(role === "doctor"){
   obj ={
    'firstName':"",
    'lastName': "", 
    'Date': "",
    'degree' : "",
    'userName': "",
    'password': "",
    'Email': "",
    'phone' : "",
    'Address': "",
    role :"nurse",
    rootPath:"nurse",
    relativePath :"addNurse"
  }
}
else if(role === "chemist"){
   obj ={
    'firstName':"",
    'lastName': "", 
    'Date': "",
    'degree' : "",
    'userName': "",
    'password': "",
    'Email': "",
    'phone' : "",
    'Address': "",
    role :"chemist",
    rootPath:"chemist",
    relativePath :"addChemist"
  }
}
else if(role === "doctor"){
   obj ={
    'firstName':"",
    'lastName': "", 
    'Date': "",
    'degree' : "",
    'userName': "",
    'password': "",
    'Email': "",
    'phone' : "",
    'Address': "",
    role :"assistant",
    rootPath:"assistant",
    relativePath :"addAssistant"
  }
}

return (

  // <div className="row align-items-center justify-content-center" style={{
  //   padding:"0" , margin:"0" , height:"100%"}} >
  <>
    {
      role === "doctor" && 
        <FormGenerator formObj={obj} />
      
    }
    
          {/* <Container component="main" maxWidth="xs" style={{height:"100% !important"}}>
    <div className={classes.paper}>import FormGenerator from './../../../../New folder/src/components/Forms/formCompoenent';

                  <Typography className={classes.backgroundHeader}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    ADD Doctor
                  </Typography>
                  </Typography>
                  <form className={classes.form} noValidate>
        <Grid container spacing={4}>
        <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              id="firstname"
              label="FirstName"
              name="firstName"
              autoComplete="firstname"
              onChange = {(event) =>{
                setFrestname(event.target.value);
                // console.log("mmmmmm" , firstname);
              }}
              ///vbvghv
            />
          </Grid>
          
          <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              id="lastname"
              label="LastName"
              name="lastName"
              autoComplete="lastname"
              onChange = {(event) =>{
                setlastName(event.target.value);
                console.log("mmmmmm" , lastName);
              }}
            />
          </Grid>
          <Grid item xs={6}>
        <TextField
         size="small"
         id="date"
        label="Birthday"
        type="date"
       defaultValue="2021-01-01"
       className={classes.textField}
      InputLabelProps={{
      shrink: true,
    }}
    onChange = {(event) =>{
      setBirthdate(event.target.value);
      // console.log("mmmmmm" , lastName);
    }}
       />
       </Grid>
 
    <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              id="degree"
              label="Degree"
              name="Degree"
              autoComplete="Degree"
              onChange = {(event) =>{
                setDegree(event.target.value);
                console.log("mmmmmm" , degree);
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="UserName"
              name="userName"
              autoComplete="username"
              onChange = {(event) =>{
                setUsername(event.target.value);
                console.log("mmmmmm" , username);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(event) =>{
                setPass(event.target.value);
                console.log("password" , pass);
              }}
              
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              // autoComplete="current-password"
              onChange = {(event) =>{
                setEmail(event.target.value);
                console.log("email" , email);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              size="small"
              name="phone"
              label="Phone"
              type="phone"
              id="phone"
              onChange = {(event) =>{
                setPhone(event.target.value);
                console.log("phone" , phone);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
             size="small"
              variant="outlined"
              required
              fullWidth
              name="address"
              label="Address"
              type="address"
              id="address"
              onChange = {(event) =>{
                setAddress(event.target.value);
                console.log("address" , address);
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={()=>{
        
            handleSignup()
          }}
        >
          Sign Up
          </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                          Already have an account? Sign in
                        </Link>
                        <Link href="#" variant="body2">
                          Forgot Password
                        </Link>
                      </Grid>
                    </Grid>
                  </form>
                </div>
       
      </Container> */}
      </>
     
      



);
}