import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Route, Switch, useHistory } from "react-router-dom";

function AdminDashboard(props) {
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  const userTypes = [
    {
      name: "Doctors",
      discription: "Manage Doctors",
      path: "/userCrud/doctor",
      icon: "",
    },
    {
      name: "Nurses",
      discription: "Manage Nurses",
      path: "/userCrud/nurse",
      icon: "",
    },
    {
      name: "Radiogists",
      discription: "Manage Radiogists",
      path: "/userCrud/radiogist",
      icon: "",
    },

    {
      name: "Radiology FD",
      discription: "Manage Radiology Front Disks",
      path: "/userCrud/radioFD",
      icon: "",
    },
    {
      name: "Pathologists",
      discription: "Manage pathologist",
      path: "/userCrud/pathologist",
      icon: "",
    },
    {
      name: "Pathology FD",
      discription: "Manage Pathology Front Disks",
      path: "/userCrud/pathologyFD",
      icon: "",
    },
    {
      name: "Chemists",
      discription: "Manage Chemists",
      path: "/userCrud/chemist",
      icon: "",
    },
    {
      name: "Lab front Disks",
      discription: "Manage Labs Front Disks",
      path: "/userCrud/labFD",
      icon: "",
    },
    {
      name: "pharmacist",
      discription: "Manage pharmacists",
      path: "/userCrud/pharmacist",
      icon: "",
    },
    {
      name: "assistant",
      discription: "Manage Assistants",
      path: "/userCrud/assistant",
      icon: "",
    },

  ];
  const entityTypes = [
    {
      name: "disease",
      discription: "Manage disease types",
      path: "/typesGenerator/disease",
      icon: "",
    },
    {
      name: "Surgeries",
      discription: "Manage Surgeries types",
      path: "/typesGenerator/surgeries",
      icon: "",
    },
    {
      name: "lab",
      discription: "Manage labs types",
      path: "/typesGenerator/lab",
      icon: "",
    },
    {
      name: "pathology",
      discription: "Manage pathologies types",
      path: "/typesGenerator/pathology",
      icon: "",
    },
    {
      name: "radiology",
      discription: "Manage radiologies types",
      path: "/typesGenerator/radiology",
      icon: "",
    },
    {
      name: "drug",
      discription: "Manage drugs types",
      path: "/typesGenerator/drug",
      icon: "",
    },
    {
      name: "allergy",
      discription: "Manage allergy types",
      path: "/typesGenerator/allergy",
      icon: "",
    },

  ]

  const history = useHistory();
  return (
    <div className="container dashboard-container">
      <div class="row">
        {userTypes.map((userType) => {
          return (
            <Col
              xs={10}
              md={4}
              lg={4}
              onClick={() => {
                history.push(userType.path);
              }}
              style={{ marginBottom: "40px", cursor: "pointer" }}
            >
              <div class="icon-box">
                {/*                <div class="icon">
                  <img
                    src={userType.icon ? userType.icon : ""}
                    style={{ size: "60px", height: "60px" }}
                  />
                </div>*/}
                <h1>
                  <a>{userType.name}</a>
                </h1>

                <p> {userType.discription ? userType.discription : ""} </p>
              </div>
            </Col>
          );
        })}
      </div>
      {/* here is the types part of the admin panel */}
      <div class="row">
        {entityTypes.map((entityTypes) => {
          return (
            <Col
              xs={10}
              md={4}
              lg={4}
              onClick={() => {
                history.push(entityTypes.path);
              }}
              style={{ marginBottom: "40px", cursor: "pointer" }}
            >
              <div class="icon-box">
                {/*                <div class="icon">
                  <img
                    src={entityTypes.icon ? entityTypes.icon : ""}
                    style={{ size: "60px", height: "60px" }}
                  />
                </div>*/}
                <h1>
                  <a>{entityTypes.name}</a>
                </h1>

                <p> {entityTypes.discription ? entityTypes.discription : ""} </p>
              </div>
            </Col>
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;
