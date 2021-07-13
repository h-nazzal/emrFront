import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AddBoxIcon from "@material-ui/icons/AddBox";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Form } from "react-bootstrap";
import axios from "axios";
import steps from "./patientRegistrationDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import ModalGenerator from './../ModalGeneration/modalGeneration';
import FormGenerator from '../Forms/formGenerationNew';

const example = [
  {id:1 , name :"lol"},
  {id:2 , name :"lol"},
  {id:3 , name :"lol"},
];



class ListStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allergyList: [], // to load data with it in table
      openModal: false,
      TypeObj: {},
     
      key: 1,  // ** remove it if you don't use in another lists

     
      allergyTypes :[], // from DB ,
      activeStatus: true, // for Changing
      activeStatusText: "Active" , // for the value of changing
      columns:[], // to handle Columns of the table
      formInputs :[], // to handle Form Inputs the addition or update
      formType:"", // edit or add
      stepType : "" // if it is allergy or onGoingproblems or surgeries or interventions

    };
  }
 //** to get the row which will updated */
  getTypeByID = async (row) => {
    console.log("UpdatedObject: " , row)
    this.setState({ TypeObj: row });
  };
  // for Modal
  handleopenModal = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  // ***delete from table
  handleDelete = async (row) => {
    this.setState({
      allergyList: this.state.allergyList.filter((row) => row !== row),
    });
  };

  // ** handle Inputs of forms (addition or update) from Json file
  handleFormInputs = (type) =>{
      var temp = []
    for(var property in steps[type].modalForms ){
        temp.push(steps[type].modalForms[property]);
      }
      this.setState({formInputs : temp});
  }
  
  // ** this function used to change status from active to resolved ----> Not Completed...
  changeActiveStatus = async (row) =>{
      var obj = row;
      console.log("objjj: ",obj);
      if(obj["status"] === "Active"){
        obj["status"]="Resolved";
      }
      else {
        obj["status"] = "Active"
      }

    
        const items = await this.state.allergyList.map((item) =>
          item == row ? obj : item
        );
    
        this.setState({ allergyList: items });

      console.log("AfterChangint: ",obj);


      }
  async componentDidMount() {
    var type = this.props.type; // change it with steptype props
    this.setState({stepType : type})
    await this.handleDataTable(type);
    await this.handleFormInputs(type);
    var newState = this.state;
    if(type === "surgeries" || type === "familyHistory" || type === "onGoingProblems" ){
      this.getTypesFromDB()
    }

    // *** to fill the state of this stepType component
    for(var property in steps[type].state ){ 
        newState[property] = steps[type].state[property];
      }

      // this for Navigation if you go to another step the information still at it is

    switch(type){
     
        case "allergyStep":{
          if (this.props.allergyListHome && this.props.allergyListHome.length > 0) {
            this.setState({
              allergyList: this.props.allergyListHome,
              key: this.props.allergyListHome.length + 1,
            });
          }
          break;
        }
        case "familyHistory":{
          if (this.props.familyHistoryListHome && this.props.familyHistoryListHome.length > 0) {
            this.setState({
              allergyList: this.props.familyHistoryListHome,
              key: this.props.familyHistoryListHome.length + 1,
            });
          }
          break;
        }
        case "surgeries":{
          if (this.props.surgeriesListHome && this.props.surgeriesListHome.length > 0) {
            this.setState({
              allergyList: this.props.surgeriesListHome,
              key: this.props.surgeriesListHome.length + 1,
            });
          }
          break;
        }
        case "onGoingProblems":{
          if (this.props.onGoingProblemListHome && this.props.onGoingProblemListHome.length > 0) {
            this.setState({
              allergyList: this.props.onGoingProblemListHome,
              key: this.props.onGoingProblemListHome.length + 1,
            });
          }
          break;
        }
      
    }

  }
  // update DataTable
  handleUpdate = () => {
    var details = {};
        // for Update Form Inputs

    for (var p in steps[this.state.stepType].state) {
    details[p] = this.state[p] || this.state.TypeObj[p];
    }
    // var obj = this.state.allergyList.find((item) => item == this.state.TypeObj);


    const items = this.state.allergyList.map((item) =>
      item == this.state.TypeObj ? details : item
    );
    console.log("iteeeeems: " , items)

    this.setState({ allergyList: items });
  };

  
  componentDidUpdate() {
    console.log("hhhhhhh");  
    // this.rendering();
    switch(this.props.type){
      case "allergyStep":{
        this.props.getAllergyList(this.state.allergyList);
        break;
      }
      case "familyHistory":{
        this.props.getfamilyHistoryList(this.state.allergyList);
        break;
      }
      case "surgeries":{
        this.props.getsurgeriesList(this.state.allergyList);
        break;
      }
      case "onGoingProblems":{
        this.props.getonGoingProblemList(this.state.allergyList);
        break;
      }
    }
    
  }



  handleDataTable = (type) =>{
      var temp =[];
      for(var property in steps[type].columnsTable ){
            // for Adding actions Buttons to DataTable
            if (property === "actions") {
                steps[type].columnsTable[property]["cell"] = (row) => {
                return (
                  <div className="row">
                    <div className="col-auto">
                      <button
                        className="btn btn-primary"
                        onClick={async () => {
                          // console.log("rooooow : " , row)
                          // console.log("id:  " , row)
                          this.getTypeByID(row);
                          this.setState({ formType: "edit" }); // to get the modal of edit
                          this.handleopenModal();
                        }}
                      >
                        Update
                      </button>
                      </div>
                      <div className="col-auto">
                        <button
                            className="btn btn-primary"
                            hidden = {this.state.stepType === "allergyStep" ? false : true}
                            onClick={async () => {
                            // console.log("rooooow : " , row)
                            // console.log("id:  " , row)
                                await this.changeActiveStatus(row)
                            }}
                        >
                            Resolved
                        </button>
                    </div>
                    <div className="col-auto">
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          this.handleDelete(row);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              };
              temp.push(steps[type].columnsTable[property]);
            } else {
                temp.push(steps[type].columnsTable[property]);
            }
            
      
      
          
       
      }
      this.setState({columns : temp});
  }
  //** this function used when loading data from DB in dropDown list */
  getTypesFromDB = async() =>{
    var temp2 =[];
    await axios.get(`${steps[this.state.stepType].getProblemsFromDB}` ,{
    } ).then(async resp => {
      console.log("AllIncomingData: " , resp.data);

      //********* Here You should search by abbreviation or name and the value will be the name  */
      for(var place of resp.data){
        var obj = {value : place.name ,  text : place.name + " (" + place.abbreviation+" )" }
        temp2.push(obj);
      }
      this.setState({options : temp2})
      temp2=[]; 
    })
  }
  handleAdding = () => {
    var details = {};
        // for Addition Form Inputs
    for (var p in steps[this.state.stepType].state) {
      details[p] = this.state[p];
    }
    details["id"] = this.state.key;

    this.setState({});
    console.log("Addition Object : ", details);
    var joined = this.state.allergyList.concat(details);
    this.setState({ allergyList: joined });
    this.setState({ key: this.state.key + 1 });

  };
  rendering = () => {
    return (
      <div className="container gridDataContent mt-5">
        <div
          className="row gridDataHeader align-items-center"  
        >
            {console.log('list: ' , this.state.allergyList)}
        <DataTableComp data={this.state.allergyList}
          columns = {this.state.columns} 
          title= ""/>
        </div>
        <div className="row mt-4">
          {/* change it with another Design */}
          <Fab
            color="primary"
            aria-label="add"
            // className={this.props.classes.iconPlus}
            onClick={() => {
            this.setState({formType : "add"});
              this.handleopenModal();
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
    );
  };
  // used on props of the form component to handle the values of all variables
  handleChange = (evt) => {
    if(evt.text && evt.text === "autoComplete" && evt.newValue.text){
      console.log("evt: " , evt , "  Value :")
      this.setState({
        [evt.input]: evt.newValue.value, //// **** Here the value after choosing from dropDown will be the name without abbreviation
      });
    }
    else{
      const value = evt.target.value;
      this.setState({
        [evt.target.name]: value,
      });
    }

  };
  render() {

    return (
      <div className="hero">
          {console.log("columns : " , this.state.columns  
          , " FomInputs: " , this.state.formInputs,
          " state: " , this.state)}
        {/* {this.rendering()} */}
        <div className="container gridDataContent mt-5">
        <div
          className="row gridDataHeader align-items-center"
          
        >
            {console.log('list: ' , this.state.allergyList)}
        <DataTableComp data={this.state.allergyList}
          columns = {this.state.columns} 
          title= ""/>
        </div>
        <div className="row mt-4">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
            this.setState({formType : "add"});
              this.handleopenModal();
            }}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
        {
            this.state.formInputs && (
                <ModalGenerator onHide={this.handleClose} show={this.state.openModal}>
                    <FormGenerator
                    ModalInputs={this.state.formInputs}
                    updatedTypeObj={this.state.TypeObj}
                    handleChange={this.handleChange}
                    handleUpdate={this.handleUpdate}
                    handleAdding={this.handleAdding}
                    options={this.state.options}
                    formType={this.state.formType}
                    />
                </ModalGenerator>
            )
        }
        {/* <ModalGenerator onHide={this.handleClose} show={this.state.openModal}>
            <FormGenerator
              ModalInputs={this.state.ModalAddtionInputs}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator> */}
        
  
      </div>
    );
  }
}

export default ListStep;
