import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import React, { useState } from "react";
// import Form.Control from "@material-ui/core/Form.Control";
// import Col from "@material-ui/core/Col";
import { Col, Form, Row } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  marginTopp: {
    marginTop: theme.spacing(11),
    backgroundColor: "yellow",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#e7f0f4",
    border: "1px solid #fff",
    boxShadow: "4px 3px 16px 1px #fff",
    // backgroundImage:"url('https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_960_720.jpg')",
    padding: "1em",
    borderRadius: "1em",
  },
  iconsColor: {
    color: "#385968",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#385968",
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#385968",
  },
}));

export default function PaientRegistration({
  getGender,
  getFirstName,
  getSecondName,
  getBloodGroup,
  getuserName,
  getStatus,
  getLastName,
  getAddress,
  getBirthDate,
  getPhone,
  obj,
}) {
  const [firstName, setFirstName] = useState();
  const classes = useStyles();
  
  return (
    <div
      className=" row justify-content-center small-labels"
      style={{ marginTop: "50px" }}
    >
      <Col>
        <div class="card">
          <Form className={classes.form} noValidate>
            <Col container spacing={2}>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    variant="outlined"
                    type="text"
                    required
                    fullWidth
                    size="small"
                    id="firstName"
                    placeholder="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    onChange={(event) => {
                      getFirstName(event.target.value);
                    }}
                    defaultValue={obj.firstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Second Name</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    type="text"
                    size="small"
                    id="secondName"
                    placeholder="Second Name"
                    name="secondName"
                    autoComplete="secondName"
                    onChange={(event) => {                   
                      getSecondName(event.target.value);
                    }}
                    defaultValue={obj.secondName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="lastName"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    autoComplete="lastName"
                    onChange={(event) => {
                      getLastName(event.target.value);
                    }}
                    defaultValue={obj.lastName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>UserName</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="userName"
                    placeholder="UserName"
                    name="userName"
                    type="userName"
                    autoComplete="userName"
                    onChange={(event) => {
                      getuserName(event.target.value);
                      // console.log("yyyyys" , username);
                    }}
                    defaultValue={obj.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    id="address"
                    placeholder="Address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    onChange={(event) => {
                      getAddress(event.target.value);
                    }}
                    defaultValue={obj.address}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                  as = "select"
                  defaultValue = {obj.gg}
                  custom
                    onChange = { (event) => {
                      getGender (event.target.value) ;
                    }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Control>

                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="phone"
                    name="phone"
                    placeholder="Phone"
                    type="text"
                    id="phone"
                    // autoComplete="current-password"
                    onChange={(event) => {
                      getPhone(event.target.value);
                      // console.log("email" , email);
                    }}
                    defaultValue={obj.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col}>
                  <Form.Label>BirthDate</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    name="birthDate"
                    placeholder="BirthDate"
                    type="date"
                    id="birthDate"
                    autoComplete="current-password"
                    onChange={(event) => {
                      getBirthDate(event.target.value);
                      // console.log("password" , pass);
                    }}
                    defaultValue={obj.birthDate}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>status</Form.Label>
                  <Form.Control
                  as = "select"
                  defaultValue = {obj.status}
                  custom
                    onChange = { (event) => {
                      getStatus (event.target.value) ;
                    }}
                >
                  <option value="male">Married</option>
                  <option value="female">Single</option>
                </Form.Control>
                  
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>blood Group</Form.Label>
                  <Form.Control
                    variant="outlined"
                    required
                    fullWidth
                    size="small"
                    name="bloodGroup"
                    placeholder="Blood Group"
                    type="text"
                    id="bloodGroup"
                    // autoComplete="current-password"
                    onChange={(event) => {
                      getBloodGroup(event.target.value);
                      // console.log("email" , email);
                    }}
                    defaultValue={obj.bloodGroup}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon className={classes.iconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              </Row>
            </Col>

            <Col container justify="flex-end">
              <Col item>
                {/* <Link href="#" variant="body2">
                                  Forgot Password
                                </Link> */}
              </Col>
            </Col>
          </Form>
        </div>
      </Col>
    </div>
  );
}
