import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './Navbar.css'

class EMR extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Container>
        <Row className='mt-5 justify-content-center'>
          <Col
            xs={10}
            md={4}
            lg={4}
            className='my-4 '
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.props.history.push(
                `${this.props.history.location.pathname}/${'search'}`
              )
            }}
          >
            <div class='icon-box'>
              <div class='icon'>
                <img
                  src={
                    'https://cdn2.iconfinder.com/data/icons/coronavirus-10/512/report-clipboard-medical-checklist-healthcare-512.png'
                  }
                  style={{ size: '60px', height: '60px' }}
                />
              </div>
              <h1>
                <a>Your Patients</a>
              </h1>

              <p> View all patients you are curruntly treating. </p>
            </div>
          </Col>
          <Col
            xs={10}
            md={4}
            lg={4}
            className='my-4 '
            onClick={() => {
              this.props.history.push(
                `${
                  this.props.history.location.pathname
                }/Futureappointements/${'future'}`
              )
            }}
          >
            <div class='icon-box'>
              <div class='icon'>
                <img
                  src={
                    'https://cdn2.iconfinder.com/data/icons/coronavirus-10/512/news-feed-mobile-report-virus-128.png'
                  }
                  style={{ size: '60px', height: '60px' }}
                />
              </div>
              <h1>
                <a>Future Appointements</a>
              </h1>

              <p> Get all your Future appointements details. </p>
            </div>
          </Col>
          {/* <Col
            xs={10}
            md={4}
            lg={4}
            className="my-4 "
              style={{ cursor: "pointer" }}
              onClick={() => {
                this.props.history.push(
                  `${
                    this.props.history.location.pathname
                  }/currentAppointements/${"current"}`
                );
              }}
            >
              <div class="icon-box">
            <div class="icon">
              <img
                src={"https://cdn2.iconfinder.com/data/icons/coronavirus-10/512/handbook-book-medicine-medical-education-512.png"}
                style={{ size: "60px", height: "60px" }}
              />
            </div>
            <h1>
              <a>Current Appointements</a>
            </h1>

            <p>   Get all your current appointements details.</p>*/}
          {/*</div>*/}
          {/*</Col>*/}
        </Row>
      </Container>
    )
  }
}

export default EMR
