import { Button, FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
const useStyles = makeStyles((theme) => ({
  root: {
    padding:5,
    backgroundColor:'#fff',
    borderRadius:10,
    marginLeft:10
  },
  formControl: {
    marginRight: 2,
    marginTop:10,
    width:'100%'
  },
  button: {
    marginRight: 2,
    marginTop:40,
    width:'100%'
  },
}));
export default function BasicTextFields({userId,modalClose}) {
  const classes = useStyles();
  const change_password = (values)=>{
    axios.post('http://localhost:3000/authenticate/change_password',{
        old_password:values.old_password,
        password:values.password,
        userId:userId
    }).then(res=>{
        alert("Success")
        modalClose()
    }).catch(err=>{
        console.log(err)
    })
  }
  const PasswordSchema = Yup.object({
    old_password:Yup.string().required(),
    password:Yup.string().required().min(6),
    re_password:Yup.string().required().min(6).oneOf([Yup.ref('password'), null], 'Passwords must match')
})
  return (
    <form className={classes.root} noValidate autoComplete="off">
        <h1 style={{textAlign:'center'}}>Change Password</h1>
        <Formik 
        validationSchema={PasswordSchema}
        initialValues={{old_password:'',password:'',re_password:''}}
        onSubmit={(values,actions)=>{
            change_password(values)
            actions.resetForm()
        }}
        >
            {(formikprops)=>(
                <div>
            <FormControl className={classes.formControl}>
            <TextField
                    type="password"

              label="Enter the old Password"
                helperText={formikprops.touched.old_password && formikprops.errors.old_password}
               error={(formikprops.touched.old_password && formikprops.errors.old_password)?true:false} id="standard-basic"
               value={formikprops.values.old_password}
               onChange={formikprops.handleChange('old_password')}
               onBlur={formikprops.handleBlur('old_password')} />
            </FormControl>
            <FormControl className={classes.formControl}>
            <TextField
                    type="password"

             helperText={formikprops.touched.password && formikprops.errors.password}
             error={(formikprops.touched.password && formikprops.errors.password)?true:false}
            id="standard-basic"
              label="Enter the new Password"
              value={formikprops.values.password}
              onChange={formikprops.handleChange('password')}
              onBlur={formikprops.handleBlur('password')}
               />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    type="password"
                    helperText={formikprops.touched.re_password && formikprops.errors.re_password}
                    id="standard-basic"
                    label="Re-Password"
                    placeholder="r-enter the password"
                    error={(formikprops.touched.re_password && formikprops.errors.re_password)?true:false}
                    value={formikprops.values.re_password}
                    onChange={formikprops.handleChange('re_password')}
                    onBlur={formikprops.handleBlur('re_password')}
                    />
            </FormControl>
            <Button onClick={formikprops.handleSubmit}  className={classes.button} variant="contained" color="primary">
                Change
            </Button>
            </div>
            )}
        </Formik>
    </form>
  );
}