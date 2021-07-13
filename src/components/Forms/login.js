import React, { Component } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import loginUser from "../loginDB.json";
import userType from "../usersDB.json";
import FormGenerator from "./formGeneration";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorHandeling from "../ErrorHandling/errorHandeling";

//todo 1- link forgoten pwd 2- add image
//log in page

class Login extends Component {
  //for Doctor - nurse - pathologist - chemist
  constructor(props) {
    super(props);

    this.state = {
      formInputs: [],
      type: "",
      addingUserObject: {},
      errorMessage: "",
      isLoggedIn: props.isLoggedIn,
    };
  }
  async componentDidMount() {
    console.log("propsssss: ", this.props);
    await this.handleDataTableColumns();
  }

  handleDataTableColumns = () => {
    var newState = this.state;
    for (var property in loginUser.state) {
      newState[property] = "";
    }

    var temp = [];
    for (var p in loginUser.modalAdditionForms) {
      temp.push(loginUser.modalAdditionForms[p]);
    }

    this.setState({ formInputs: temp });
  };

  handleChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      [evt.target.name]: value,
    });
  };
  setRoleName = (role) => {
    switch (role) {
      case 2: {
        return "doctorFD";
      }
      case 3: {
        return "labFD";
      }
      case 4: {
        return "radioFD";
      }
      case 5: {
        return "pathologyFD";
      }
    }
  };

  handleSignup = async () => {
    var details = {};

    for (var property in loginUser.state) {
      details[property] = this.state[property];
    }
    console.log("details : ", details);

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log("formBodu : ", formBody);

    fetch(`${loginUser.addUser}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((resp) => {
        console.log("resp.type: ", typeof resp, resp);

        resp.json().then((data) => {
          console.log("data.message :" , data.message)
          if (data.message) {
            // if this user has wrong password or wrong UserName
            toast(`🦄 ${data.message}`, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          // setData on LocalStorage
          else {
            console.log("data:  ", data);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("userName", this.state.userName);
            this.props.getAuthorization(true, this.state.userName); // for App to flip the Login and logout button
          }

          // if (data.role == "") {
          //   // if he is a just user
          //   this.props.history.push("/welcomePage");
          // }

          var roleName = this.setRoleName(data.role); // to get if he is LabFD or pathologyFD or doctorFD or radioFD
          if (parseInt(data.role) == 3) {
            localStorage.setItem("labId", data.labId);
          } else if (parseInt(data.role) == 4) {
            console.log(";;;;;;;;;;;;;;;;;;;;;");
            localStorage.setItem("radioId", data.radioId);
          } else if (parseInt(data.role) == 5) {
            localStorage.setItem("pathoId", data.pathoId);
          } else if (parseInt(data.role) == 2) {
            /// for Doctor FrontDist *****Abdoooooo
          }

          if (parseInt(data.role) > 2) {
            this.setState({ isLoggedIn: true });
          }

          //   if(data.role == "done"){
          //     history.push("/welcomePage");
          //     console.log("heeereeeee")
          //   }
        });
      })
      .catch(() => {
        //***Toastify */
        this.setState({ errorMessage: "SomethingWrong...." });
        toast(`🦄 SomethingWrong.... `, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  render() {
    if (this.state.isLoggedIn) return <Redirect to = "/publicDashBoard" />;

    return (
      <div className="container-fluid">
        <ToastContainer />
        <div className="row no-gutter">
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4 px-2">Welcome back!</h3>
                    {console.log("state: ", this.state)}
                    {this.state.formInputs &&
                      this.state.formInputs.length > 0 && (
                        <FormGenerator
                          ModalInputs={this.state.formInputs}
                          handleChange={this.handleChange}
                          handleSubmit={this.handleSignup}
                          buttonTitle="Login"
                        />
                      )}
                    <div className="text-center">
                      <a className="small" href="/forgetPassword">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        </div>
      </div>
    );
  }
}

export default Login;
