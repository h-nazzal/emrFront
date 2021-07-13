import React, { Component } from "react";
import columns from "../typesDB.json";
import axios from "axios";
import DataTableComp from "./dataTable";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModalGenerator from "../ModalGeneration/modalGeneration";
import FormGenerator from "../Forms/formGenerationNew";
import "./dataTable.css";

class TypesGenerator extends Component {
  // the baisc set up for the state.
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      openModal: false,
      ModalInputs: [],
      data: [],
      temp: [],
      typeObj: {},
      typeName: "",
      formType: "add",
    };
  }

  // modal handeling
  handleClose = () => {
    this.setState({ openModal: false });
  };
  handleopenModal = () => {
    this.setState({ openModal: true });
  };


  // this to set Updated Object to get the last Value if the user not enter any of them
  setUpdatedObj = (id) => {
    var obj = this.state.data.find((row) => row.id === id);
    this.setState({ typeObj: obj });
  };

  handleUpdate = async () => {
    var details = {
      id: this.state.typeObj.id,
    };
    for (var p in columns[this.state.typeName].state) {
      // take attributes in state and put in object to backend
      details[p] = this.state[p] || this.state.typeObj[p];
    }
    console.log("Details in update object", details);

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("formBody: ", formBody);
    await fetch(`${columns[this.state.typeName].updateType}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then(() => {
        console.log("it is inserted");
      })
      .catch(() => {
        console.log("errror");
      });
    this.getData(this.state.typeName);
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

    await fetch(`${columns[this.state.typeName].deleteType}`, {
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
  handleAdding = async () => {
    var details = {};
    for (var p in columns[this.state.typeName].state) {
      // take attributes in state and put in object to backend
      details[p] = this.state[p] ;
    }
    console.log("detilaas : ", details);

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("formging:     ", formBody);

    await fetch(`${columns[this.state.typeName].addType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((resp) => {
        resp.json().then((data) => {
          console.log("data: ", data);
        });
      })
      .catch(() => {
        console.log("errror");
      });
    this.getData(this.state.typeName);
  };

  //getData once the page loaded
  getData = async (typeName) => {
    await axios.get(`${columns[typeName].getAll}`).then(async (resp) => {
      // return resp.data;
      this.setState({
        data: resp.data,
        temp: resp.data,
      });
      console.log("resp.data: ", resp.data);
    });
  };

  async componentDidMount() {
    var typeName = this.props.match.params.type;
    this.setState({ typeName });

    var temp = [];
    // ///////////////////////////*** this will handle Actions Button in Columns ****///////////////////////////////////
    for (var p in columns[typeName].columnsTable) {
      if (p === "actions") {
        columns[typeName].columnsTable[p]["cell"] = (row) => {
          return (
            <div className="row">
              <div className="col-auto">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    console.log("rooooow : ", row);
                    console.log("id:  ", row); 
                    this.setUpdatedObj(row.id);
                    this.setState({ formType: "edit" }); // to check if this update or add to open modal according to its type
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
                    // console.log("id:  " , row)
                    this.handleDelete(row.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        };
        temp.push(columns[typeName].columnsTable[p]);
      } else {
        temp.push(columns[typeName].columnsTable[p]); // if it is not actions Button
      }
    }
    this.setState({ columns: temp });
    temp = [];

// ///////////////////////////*** to set Forms Inputs ****///////////////////////////////////
    for (var p in columns[typeName].modalForms) { // to handle Forms Inputs 
      temp.push(columns[typeName].modalForms[p]);
    }

    this.setState({ ModalInputs: temp });

// ///////////////////////////*** to set variables in state ****///////////////////////////////////

    var newState = this.state;
    for (var property in columns[typeName].state) { // to set the component's state variables
      newState[property] = "";
    }
    await this.getData(typeName);
  }

  handleChange = (evt) => { // this will be sent to formGeneration to handle the value
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };
  render() {
    const tableData = {
      columns: this.state.columns,
      data: this.state.data,
    };

    return (
      <Container>
        <Row py-3>
          <Col>
            {columns && this.state.typeName && (
              <>
                <h3>{columns[this.state.typeName].title}</h3>
                <div>{columns[this.state.typeName].description}</div>
              </>
            )}
          </Col>
        </Row>

        <Row py-3>
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
        <Row py-3>
          <Col sm={12} className="py-3">
            <DataTableComp
              data={this.state.data}
              columns={this.state.columns}
              tableData={tableData}
              title=""
            />
          </Col>
        </Row>

        {this.state.ModalInputs &&
        this.state.ModalInputs.length > 0 &&
        this.state.formType === "edit" ? (
        
          <ModalGenerator onHide={this.handleClose} show={this.state.openModal}
          formType = {this.state.formType}>
            <FormGenerator
              hideModal = {this.handleClose}
              ModalInputs={this.state.ModalInputs}
              handleChange={this.handleChange}
              updatedTypeObj={this.state.typeObj}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={[]}
              formType={this.state.formType}
            />
          </ModalGenerator>
        ) : (
          <ModalGenerator onHide={this.handleClose} show={this.state.openModal}
          formType = {this.state.formType}>
            <FormGenerator
              hideModal = {this.handleClose}
              ModalInputs={this.state.ModalInputs}
              handleChange={this.handleChange}
              updatedTypeObj={this.state.typeObj}
              handleUpdate={this.handleUpdate}
              handleAdding={this.handleAdding}
              options={[]}
              formType={this.state.formType}
            />
          </ModalGenerator>
        )}
      </Container>
    );
  }
}

export default TypesGenerator;
