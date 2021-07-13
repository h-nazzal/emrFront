import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Button from "react-bootstrap/Button";
import { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import steps from "./patientRegistrationDB.json";
import DataTableComp from "../typesGenerator/dataTable";
import ModalGenerator from "./../ModalGeneration/modalGeneration";
import FormGenerator from "../Forms/formGenerationNew";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const example = [
  { id: 1, name: "lol" },
  { id: 2, name: "lol" },
  { id: 3, name: "lol" },
];

class OnGoingProblem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onGoingProblem: [], // to load data with it in table
      openModal: false,
      TypeObj: {},

      key: 1, // ** remove it if you don't use in another lists

      allergyTypes: [], // from DB ,
      activeStatus: true, // for Changing
      activeStatusText: "Active", // for the value of changing
      columns: [], // to handle Columns of the table
      formInputs: [], // to handle Form Inputs the addition or update
      formType: "", // edit or add
      stepType: "", // if it is allergy or onGoingproblems or surgeries or interventions
    };
  }
  //** to get the row which will updated */
  getTypeByID = async (id) => {
    var updatedObj = this.state.onGoingProblem.filter((item) => item.id === id)
    console.log("UpdatedObject: ", updatedObj[0]);
    this.setState({ TypeObj: updatedObj[0]});
  };
  // for Modal
  handleopenModal = () => {
    this.setState({ openModal: true });
  };

  handleClose = () => {
    this.setState({ openModal: false });
  };

  // ***delete from table
  handleDelete = async (id) => {
    this.setState({
      onGoingProblem: this.state.onGoingProblem.filter((row) => row.id !== id),
    });
  };

  // ** handle Inputs of forms (addition or update) from Json file
  handleFormInputs = (type) => {
    var temp = [];
    for (var property in steps[type].modalForms) {
      temp.push(steps[type].modalForms[property]);
    }
    this.setState({ formInputs: temp });
  };

  // ** this function used to change status from active to resolved ----> Not Completed...
  changeActiveStatus = async (row) => {
    var obj = row;
    console.log("objjj: ", obj);
    if (obj["status"] === "Active") {
      obj["status"] = "Resolved";
    } else {
      obj["status"] = "Active";
    }

    const items = await this.state.onGoingProblem.map((item) =>
      item == row ? obj : item
    );

    this.setState({ onGoingProblem: items });

    console.log("AfterChangint: ", obj);
  };
  setonGoingProblemWithHomeList = (type) => {
    if (
      this.props.onGoingProblemListHome &&
      this.props.onGoingProblemListHome.length > 0
    ) {
      this.setState({
        onGoingProblem: this.props.onGoingProblemListHome,
        key: this.props.onGoingProblemListHome.length + 1,
      });
    }
  };

  async componentDidMount() {
    console.log("///////////////////////////////////////////");
    var type = this.props.type; // change it with steptype props
    await this.setonGoingProblemWithHomeList(type);

    this.setState({ stepType: type });
    await this.handleDataTable(type);
    await this.handleFormInputs(type);
    var newState = this.state;
    if (
      type === "surgeries" ||
      type === "familyHistory" ||
      type === "onGoingProblems"
    ) {
      this.getTypesFromDB();
    }

    // *** to fill the state of this stepType component
    for (var property in steps[type].state) {
      newState[property] = steps[type].state[property];
    }

    // this for Navigation if you go to another step the information still at it is
  }
  // update DataTable
  handleUpdate = () => {
    var details = {};
    // for Update Form Inputs

    for (var p in steps[this.state.stepType].state) {
      details[p] = this.state[p] || this.state.TypeObj[p];
    }
    // var obj = this.state.onGoingProblem.find((item) => item == this.state.TypeObj);

    const items = this.state.onGoingProblem.map((item) =>
      item == this.state.TypeObj ? details : item
    );
    console.log("iteeeeems: ", items);

    this.setState({ onGoingProblem: items });
  };

  componentDidUpdate() {
    this.props.getonGoingProblemList(this.state.onGoingProblem);
  }

  handleDataTable = (type) => {
    var temp = [];
    for (var property in steps[type].columnsTable) {
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
                    this.getTypeByID(row.id);
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
                  hidden={this.state.stepType === "allergyStep" ? false : true}
                  onClick={async () => {
                    // console.log("rooooow : " , row)
                    // console.log("id:  " , row)
                    await this.changeActiveStatus(row);
                  }}
                >
                  Resolved
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
        temp.push(steps[type].columnsTable[property]);
      } else {
        temp.push(steps[type].columnsTable[property]);
      }
    }
    this.setState({ columns: temp });
  };
  //** this function used when loading data from DB in dropDown list */
  getTypesFromDB = async () => {
    var temp2 = [];
    await axios
      .get(`${steps[this.state.stepType].getProblemsFromDB}`, {})
      .then(async (resp) => {
        console.log("AllIncomingData: ", resp.data);

        //********* Here You should search by abbreviation or name and the value will be the name  */
        for (var place of resp.data) {
          var obj = {
            value: place.name,
            text: place.name + " (" + place.abbreviation + " )",
          };
          temp2.push(obj);
        }
        this.setState({ options: temp2 });
        temp2 = [];
      });
  };
  handleAdding = () => {
    var details = {};
    // for Addition Form Inputs
    for (var p in steps[this.state.stepType].state) {
      details[p] = this.state[p];
    }
    details["id"] = this.state.key;

    this.setState({});
    console.log("Addition Object : ", details);
    var joined = this.state.onGoingProblem.concat(details);
    this.setState({ onGoingProblem: joined });
    this.setState({ key: this.state.key + 1 });
  };

  // used on props of the form component to handle the values of all variables
  handleChange = (evt) => {
    if (evt.text && evt.text === "autoComplete" && evt.newValue.text) {
      console.log("evt: ", evt, "  Value :");
      this.setState({
        [evt.input]: evt.newValue.value, //// **** Here the value after choosing from dropDown will be the name without abbreviation
      });
    } else {
      const value = evt.target.value;
      this.setState({
        [evt.target.name]: value,
      });
    }
  };
  render() {
    return (
      <Container>
        {console.log(
          "columns : ",
          this.state.columns,
          " FomInputs: ",
          this.state.formInputs,
          " state: ",
          this.state
        )}

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
            {console.log("list: ", this.state.onGoingProblem)}
            <DataTableComp
              data={this.state.onGoingProblem}
              columns={this.state.columns}
              title=""
            />
          </Col>
        </Row>
        <div className="row mt-4"></div>

        {this.state.formInputs && (
          <ModalGenerator onHide={this.handleClose} show={this.state.openModal} formType={this.state.formType}>
            <FormGenerator
             hideModal={this.handleClose}
              ModalInputs={this.state.formInputs}
              updatedTypeObj={this.state.TypeObj}
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

export default OnGoingProblem;
