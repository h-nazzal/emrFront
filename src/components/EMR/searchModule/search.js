import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import  { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
// import  { useState } from 'react';
import { ListItemAvatar, NativeSelect } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
// import AddIcon from '@material-ui/icons/AddIcon';
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
// import "./types.css";
import { useFormik,Formik } from 'formik';
import * as Yup from 'yup';
import SearchForm from "./searchForm";
import DataGridTable from "./dataGrid"
// import EditIcon from '@material-ui/icons/Edit';
import emrFile from "../emrDB.json";
import DataTableComp from "../../typesGenerator/dataTable";
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




var object  = {}
const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor : "white",
    padding:"1em",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontSize:"1.1em",
    fontFamily:"Dosis"
  },
  input2 :{
    height:"10px"
  },
  iconPlus:{
    margin: "auto",
    textAlign:"center"
    // float:"right",
  },
  button: {
    margin: theme.spacing(1),
    fontFamily: 'Roboto Slab'
  },
  deleteButton: {
    backgroundColor:"#c94c4c"
  },
  editButton: {
    backgroundColor:"#c94c4c"
  }
});



var id = 0;
var rowsToKeep = [];
var rowsToBeDeleted = [];

class Search extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 

      searchWord:"",
      list :[]  ,
      openModal1:false,
      result :"",
      id:"",
      filtered : []
          }
        }
        


    getData = async()=>{
      var type = "Search";

      var details = {
        drId:localStorage.getItem("userId")
      }
      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }

      await fetch(`${emrFile["Search"].getAllDoctorPatients}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      }).then((resp)=>{
        resp.json().then((data)=>{
          console.log("resp.data: " , data);
          this.setState({list: data})
          this.setState({filtered:data})
        })
      }).catch(()=>{
        console.log("errror")
      })

     
      
    }


   async componentDidMount(){
     await this.getData()
     this.setState({filtered:this.state.list})
    }




    getSearchName = (name) =>{
      console.log("name : " , name);
      this.setState({searchWord:name});   
          this.setState((state) => {
              state.filtered = this.state.list.filter((item) => {
                  console.log(name.toLowerCase())
                  var searchWordWithoutSpaces = name.split(' ').join('');
                  var itemFirstLastSecond = item.firstName+item.secondName+item.LastName
                  // console.log("$$$$" , item.name.toLowerCase().includes(name.toLowerCase()) )
                  return itemFirstLastSecond.toLowerCase().includes(searchWordWithoutSpaces.toLowerCase())
              })
              return state;
          })  

      
  }

    rendering = () =>{
        return(
        <Container>
            <Row className="mt-5 justify-content-center">
                  <SearchForm  getSearchName = {this.getSearchName} />
            </Row>
          <Row>


                    {
                        this.state.list && this.state.list.length>0 &&
                        <DataGridTable location={this.props.location} 
                          filtered={this.state.filtered.length>0 ? this.state.filtered: this.state.list} 
                          history={this.props.history}
                          list={this.state.list}
                        />
                    }

          </Row>
           
        </Container>
        
        )
    }
    




    render() { 
      const { classes } = this.props;
        
  return (
    <div className="hero">
        {this.rendering()}
       

    </div>
 
  );
    }
}
 
export default withStyles(useStyles)(Search); 