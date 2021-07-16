import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'
import { Button, Overlay, Popover } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useState, useEffect, useRef } from 'react'
import Row from 'react-bootstrap/Row'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import SessionCode from '../sessionCode'
import './navbar.css'

const NavBar = props => {
  const history = useHistory()
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [target, setTarget] = useState(null)
  const [img, setImg] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const ref = useRef(null)
  // const [userName , setUserName] = useState("");
  var name = 'AlaaMensh'
  const handleClick = event => {
    setShowProfile(!showProfile)
    setTarget(event.target)
  }
  const handleUserDropDownMenu = role => {
    // eslint-disable-next-line default-case
    switch (parseInt(role)) {
      case 8: {
        return (
          <NavDropdown title='Doctor Actions' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item href='/publicDashBoard/appoint'>
              Appointements
            </NavDropdown.Item>
            <NavDropdown.Item>
              <SessionCode
                hidden={false}
                buttonValue='Make Visit'
                fromComponent='navBarVisits'
                history={history}
              />
            </NavDropdown.Item>
            <NavDropdown.Item href='/ptRegistration'>
              Patient Registration
            </NavDropdown.Item>
            <NavDropdown.Item href='/publicDashBoard/choiceForDoctor/lab'>
              Doctor Lab Orders
            </NavDropdown.Item>
            <NavDropdown.Item href='/publicDashBoard/choiceForDoctor/pathology'>
              Doctor Pathology Orders
            </NavDropdown.Item>
            <NavDropdown.Item href='/publicDashBoard/choiceForDoctor/radio'>
              Doctor Radiology Orders
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                className='link-item'
                to={`/publicDashBoard/EMR/search`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                All My Patients
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      // eslint-disable-next-line no-lone-blocks
      case 16: {
        return (
          <NavDropdown title='chemist Actions' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                to={`/publicDashBoard/choice/lab/allLabOrders`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                Get All Accepted Orders
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <SessionCode
                hidden={false}
                buttonValue='Get Patient Orders'
                fromComponent='NavBar'
                history={history}
              />
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 3: {
        return (
          <NavDropdown title='LabFD Actions' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                to={`/publicDashBoard/choice/lab/allLabOrders`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                Get All Accepted Orders
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <SessionCode
                hidden={false}
                buttonValue='Get Patient Orders'
                fromComponent='NavBar'
                history={history}
              />
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 5: {
        return (
          <NavDropdown
            title='Pathology Front Disk Actions'
            id='basic-nav-dropdown'
          >
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                to={`/publicDashBoard/choice/pathology/allLabOrders`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                Get All Accepted Orders
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <SessionCode
                hidden={false}
                buttonValue='Get Patient Pathology Orders'
                fromComponent='Get Patient Pathology Orders'
                history={history}
              />
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 12: {
        return (
          <NavDropdown title='Pathologist  Actions' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                to={`/publicDashBoard/choice/pathology/allLabOrders`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                Get All Accepted Orders
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <SessionCode
                hidden={false}
                buttonValue='Get Patient Pathology Orders'
                fromComponent='Get Patient Pathology Orders'
                history={history}
              />
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 11: {
        return (
          <NavDropdown title='Radiology Actions' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                to={`/publicDashBoard/choice/radio/allLabOrders`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                Get All Accepted Orders
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <SessionCode
                hidden={false}
                buttonValue='Get Patient Radio Orders'
                fromComponent='Get Patient Radio Orders'
                history={history}
              />
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 4: {
        return (
          <NavDropdown
            title='Radiology Front Disk Actions'
            id='basic-nav-dropdown'
          >
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                to={`/publicDashBoard/choice/radio/allLabOrders`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                Get All Accepted Orders
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <SessionCode
                hidden={false}
                buttonValue='Get Patient Radio Orders'
                fromComponent='Get Patient Radio Orders'
                history={history}
              />
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 7: {
        return (
          <NavDropdown title='Nurse Actions' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item
              href='#'
              style={{ cursor: 'pointer', textDecoration: 'none' }}
            >
              <Link
                to={`/publicDashBoard/patientsOnVisit`}
                style={{
                  cursor: 'pointer',
                  textDecoration: 'none',
                  color: '#212529'
                }}
              >
                Nurse Module
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 30: {
        return (
          <NavDropdown title='admin Actions' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/adminDashBoard'>
              admin DashBoard
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      case 2: {
        return (
          <NavDropdown
            title='Doctor Front Disk Actions'
            id='basic-nav-dropdown'
          >
            <NavDropdown.Item href='/publicDashBoard'>
              DashBoard
            </NavDropdown.Item>
            <NavDropdown.Item href='/publicDashBoard/appoint'>
              Appointements
            </NavDropdown.Item>
          </NavDropdown>
        )
      }
      default: {
        if (role !== '') {
          return (
            <NavDropdown title='Pharmacist Actions' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/publicDashBoard'>
                DashBoard
              </NavDropdown.Item>
            </NavDropdown>
          )
        }
      }
    }
  }
  return (
    <Navbar style={{ marginBottom: '20px' }} bg='light' expand='md'>
      <Navbar.Brand href='#home'>Our Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav' ref={ref}>
        <Nav className='ml-auto px-2'>
          {/* *************check here on role on every Choice in the DropDown *************/}
          {props.isAuth && (
            <>{handleUserDropDownMenu(localStorage.getItem('role'))}</>
          )}
        </Nav>

        {props.isAuth && localStorage.getItem('role') !== '' && (
          <React.Fragment>
            <Nav.Link onClick={handleClick} className='text-warning pr-4'>
              <div className='row  align-items-center'>
                <span className='username'>
                  {localStorage.getItem('userName')
                    ? 'Welcome ' + localStorage.getItem('userName')
                    : ''}
                </span>
                {/* <ArrowDropDownIcon
                                    style={{ fontSize: "1.6em" }}
                                /> */}
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    background: 'url(https://imgur.com/yVjnDV8.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                  className='img-fluid'
                ></div>
              </div>
            </Nav.Link>
            <Overlay
              show={showProfile}
              target={target}
              placement='bottom'
              container={ref.current}
              containerPadding={20}
            >
              <Popover id='popover-contained' className='shadow'>
                <Popover.Content>
                  <div class='col m-0 p-0 uprofile'>
                    <div class='media p-2'>
                      <img
                        src='https://imgur.com/yVjnDV8.png'
                        class='mr-1 align-self-start'
                      />
                      <div class='media-body'>
                        <div class='d-flex flex-row justify-content-between'>
                          <h6 class='mt-2 mb-0'>
                            {localStorage.getItem('userName')}
                          </h6>
                          <i class='fas fa-angle-down mr-3 text-muted'></i>
                        </div>
                        <p class='text-muted'>
                          {'Your ID : ' + localStorage.getItem('userId')}
                        </p>
                      </div>
                    </div>
                    <ul class='list text-muted mt-3 pl-0'>
                      <li
                        onClick={e => {
                          handleClick(e)
                          localStorage.removeItem('role')
                          localStorage.removeItem('labId')
                          localStorage.removeItem('pathoId')
                          localStorage.removeItem('radioId')
                          localStorage.removeItem('userId')
                          localStorage.removeItem('userName')
                          history.push('/login')
                          props.logout(false)
                        }}
                      >
                        <i class='fas fa-wallet mr-3 ml-2'></i>
                        Logout
                      </li>
                    </ul>
                  </div>
                </Popover.Content>
              </Popover>
            </Overlay>
          </React.Fragment>
        )}
        {console.log('props.auth: ', props.isAuth)}
        {/* {props.isAuth ? (
              <Button variant="contained"  onClick= {()=>{
                localStorage.removeItem("userId");
                localStorage.removeItem("role");
                localStorage.removeItem("labId");
                history.push("/login")
              }}>
              LogOut
            </Button>
            ):(
              <Button variant="contained"  onClick= {()=>{
                // setlogged(true);
                history.push("/login");
              }}>
              LogIn
            </Button>
            )
          } */}
        {props.isAuth && localStorage.getItem('role') !== '' ? (
          ''
        ) : (
          <Button
            className='nav-btn'
            onClick={() => {
              history.push('/login')
            }}
          >
            login
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
