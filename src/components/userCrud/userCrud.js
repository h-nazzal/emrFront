import React, { Component } from "react";
import userType from "../usersDB.json";
import ModalComp from "../typesGenerator/modalGenerator";
import axios from "axios";
import DataTableComp from "../typesGenerator/dataTablebkp";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormGenerator from "../Forms/formGenerationNew";
import ModalGenerator from "./../ModalGeneration/modalGeneration";

const optionsInput = [
  {id:1 , name:"alaa"},
  {id:2 , name:"lol"}
]
class UserCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      openModal: false,
      ModalAddtionInputs: [],
      ModalUpdateInputs: [],
      data: [],
      temp: [],
      typeObj: {},
      type: "",
      formType: "add",
      addingUserObject: {},
      updateUserObject: {},
      options :[]
    };
  }
  handleDataTable = (type) =>{
    var temp = [];
    var temp2=[]
    for (var p in userType[type].columnsTable) {
      // for Adding actions Buttons to DataTable
      if (p === "actions") {
        userType[type].columnsTable[p]["cell"] = (row) => {
          return (
            <div className="row">
              <div className="col-auto">
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    // console.log("rooooow : " , row)
                    // console.log("id:  " , row)
                    await this.setUpdatedObj(row.id);
                    this.setState({ formType: "edit" });
                    this.handleopenModal();
                  }}
                >
                  Update
                </button>
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.handleDelete(row.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        };
        temp.push(userType[type].columnsTable[p]);
      } else {
        temp.push(userType[type].columnsTable[p]);
      }
      


    }
    this.setState({ columns: temp });
    temp = [];
  }
  handleAdditionInputs = (type  , optionsList) =>{
    console.log("//////////////////////////////////////////")
    var details = {};
    var temp2=[];
    var temp=[];
    for (var p in userType[type].modalAdditionForms) {
      // for Addition Form Inputs
      if (p === "radioFDId" || p === "pathoFDId" || p === "radioId" || p == "drFDId" || p == "labFDId" || p === "drId") { // adding all
        console.log("yeees" , this.state.options)
        for(var place of optionsList){
          var obj =null;
          if(place.organization){
             obj = {value : place.id , text : place.organization }
          }
          else{
             obj = {value : place.id , text : place.firstName + " " + place.secondName + " " + place.lastName }
          }         
           temp2.push(obj);
        }
        console.log("options : " , temp2)
        this.setState({options : temp2})
        temp2=[]
      }


      temp.push(userType[type].modalAdditionForms[p]);
      console.log("here: ", userType[type].modalAdditionForms[p]["name"]);

      details[userType[type].modalAdditionForms[p]["name"]] = "";
    }
    this.setState({
      ModalAddtionInputs: temp,
      addingUserObject: details,
    });
    console.log("details for Addition: ", details);
  }

  async componentDidMount() {
    var type = this.props.match.params.type;
    this.setState({ type });
    var temp = [];
    var temp2 = [];
    var optionsList =[];
    /// load data Which get in dropDown buttons
    if(type === "radiogist" || type === "pathologyFD" || type === "radioFD" || type === "doctor" || type === "chemist" || type === "nurse" || type === "pathologist"){
       optionsList =  await this.loadSelectInputData(type);
       console.log("optionsList : ",optionsList);
       if(!optionsList){
         optionsList = optionsInput
       }
    }
    else{
      optionsList = [];
    }
    // put the options Inputs in options which got from jsonFile
  
    await this.handleDataTable(type);

    ////////////////////////////////// / * ForAddition *////////////////////////////
    this.handleAdditionInputs(type , optionsList);
    ////////////////////////////////// / * ForUpdate Form Inputs *////////////////////////////
    var temp = [];
    var details = {};
    for (var p in userType[type].modalUpdateForms) {
      // for Update Form Inputs
      temp.push(userType[type].modalUpdateForms[p]);
      details[userType[type].modalUpdateForms[p]["name"]] = "";
    }
    this.setState({
      ModalUpdateInputs: temp,
      updateUserObject: details,
    });
    console.log("details for updating: ", details);

    ////////////////////////////////// / * setNew State With user attributes *////////////////////////////
    var newState = this.state;
    for (var property in userType[type].state) {
      // to put user attributes in Component's state
      newState[property] = "";
    }

    await this.getData(type);
  }

  handleClose = () => {
    this.setState({ openModal: false });
  };
  handleopenModal = () => {
    this.setState({ openModal: true });
  };
  setUpdatedObj = (id) => {
    var obj = this.state.data.find((row) => row.id === id);
    console.log("object: " , obj);
    this.setState({ typeObj: obj });
  };

  handleUpdate = async () => {
    var details = {};

    for (var property in this.state.updateUserObject) {
      details[property] = this.state[property] || this.state.typeObj[property];
    }

    console.log("details on update : ", details);
    details["id"] = this.state.typeObj.id;

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("formBody: ", formBody);
    await fetch(`${userType[this.state.type].updateUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((resp) => {
        resp.json().then((data)=>{
          console.log("Update Function: " , data);
        })
      })
      .catch(() => {
        console.log("errror");
      });
    this.getData(this.state.type);
  };
  handleDelete = async (id) => {
    var details = {
      id: id,
    };
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    // formBody = formBody.join("&");

    fetch(`${userType[this.state.type].deleteUser}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then(() => {
        console.log("it is deleted");
      })
      .catch(() => {
        console.log("errror");
      });

    this.setState({
      data: this.state.data.filter((row) => row.id !== id),
    });
  };
  // load data into Select input from DB
  loadSelectInputData = async(type) => {
    var temp = [];
    await axios.get(`${userType[type].getAllDataFD}` ,{
    } ).then(async resp => {
      console.log("resp : " ,resp)
      console.log("AllData: " , resp.data);
      this.setState({options : resp.data});
      
    temp =  resp.data;
    })
    return temp
  }
  handleAdding = async () => {
    var details = {};
    for (var p in this.state.addingUserObject) {
      // for Addition Form Inputs
      details[p] = this.state[p];
    }
    if(this.state.type === "assistant"){
      details["address"]="Giza";
    }
    console.log("details on Adding : ", details);
    console.log("detilaas : ", details);

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch(`${userType[this.state.type].addUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((resp) => {
        resp.json().then((data) =>{
          console.log("data: " , data);
        })
        console.log("it is inserted");
      })
      .catch(() => {
        console.log("errror");
      });
    this.getData(this.state.type);
  };
  getData = async (type) => {
    console.log("UserEndpoint: ", userType[type].getAll);
    await axios.get(`${userType[type].getAll}`).then(async (resp) => {
      this.setState({
        data: resp.data,
        temp: resp.data,
      });
      console.log("resp.data: ", resp.data);
    });
  };

  handleChange = (evt) => {
    if(evt.text && evt.text === "autoComplete" && evt.newValue && evt.newValue.value){
      console.log("evt: " , evt , "  Value :")
      this.setState({
        [evt.input]: evt.newValue.value,
      });
    }
    else{
      if(evt.target){
        const value = evt.target.value;
        this.setState({
          [evt.target.name]: value,
        });
      }
    }

  };
  render() {
    const tableData = {
      columns: this.state.columns,
      data: this.state.data,
    };

    return (
      <Container>
        <Row className="py-3">
          <Col>
            {userType && this.state.type && (
              <>
                <h3>{userType[this.state.type].title}</h3>
                <div>{userType[this.state.type].description}</div>
              </>
            )}
          </Col>
        </Row>

        <Row className="py-3">
          <Col sm={10}></Col>
          <Col sm={2}>
            <Button
              variant="success"
              onClick={() => {
                this.setState({ formType: "add" });
                this.handleopenModal();
              }}
            >
              Add New
            </Button>{" "}
          </Col>
        </Row>
        <Row className="py-3">
          <Col sm={12} className="py-3">
            <DataTableComp
              data={this.state.data}
              columns={this.state.columns}
              tableData={tableData}
              title=""
            />
          </Col>
        </Row>

        {console.log("state : "  ,this.state)}
        {this.state.formType === "add" &&
        this.state.ModalAddtionInputs &&
        this.state.ModalAddtionInputs.length > 0 ? (
          <ModalGenerator onHide={this.handleClose} show={this.state.openModal}   formType={this.state.formType}>
            <FormGenerator
              hideModal = {this.handleClose}
              ModalInputs={this.state.ModalAddtionInputs}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator>
        ) : (
          <ModalGenerator onHide={this.handleClose} show={this.state.openModal}   formType={this.state.formType}>
            <FormGenerator
              hideModal = {this.handleClose}
              updatedTypeObj={this.state.typeObj}
              ModalInputs={this.state.ModalUpdateInputs}
              handleChange={this.handleChange}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={this.state.options}
              formType={this.state.formType}
            />
          </ModalGenerator>
        )}
      </Container>
    );
  }
}

export default UserCrud;
