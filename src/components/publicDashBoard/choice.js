import React, { Component } from 'react';
import SessionCode from "../sessionCode";
import { Card, Col } from "react-bootstrap";

class ChoicePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    renderBody = ()=>{
        return (
            <div>

            <div class="icon-box">
              <div class="icon">
                <img
                  src={"https://cdn2.iconfinder.com/data/icons/coronavirus-10/512/handbook-book-medicine-medical-education-512.png"}
                  style={{ size: "60px", height: "60px" }}
                />
              </div>
              <h1>
                <a>Enter the code</a>
              </h1>

              <p>  Enter the code to get patient Orders </p>
            </div>
          </div>
        )
    }
    render() { 
        return (  
           <div>
               <div className="row">
            <Col
            xs={10}
            md={4}
            lg={4}
            className="my-4 "
            onClick={()=>{
                console.log("history: " , this.props);
                if(this.props.match.params.type === "lab"){
                    this.props.history.push(`${this.props.location.pathname}/allLabOrders`)
                }
                else if(this.props.match.params.type === "pathology"){
                    console.log("yes");
                    this.props.history.push(`${this.props.location.pathname}/allPathologyOrders`)
                }
                else if(this.props.match.params.type === "radio"){
                    console.log("yes");
                    this.props.history.push(`${this.props.location.pathname}/allRadioChoice`)
                }
            }}>
            <div class="icon-box">
              <div class="icon">
                <img
                  src={"https://cdn2.iconfinder.com/data/icons/coronavirus-10/512/report-clipboard-medical-checklist-healthcare-512.png"}
                  style={{ size: "60px", height: "60px" }}
                />
              </div>
              <h1>
                <a>Accepted Orders</a>
              </h1>

              <p>   Get all Accepted orders
 </p>
            </div>
          </Col>

          <Col
            xs={10}
            md={4}
            lg={4}
            className="my-4 " 
            onClick={()=>{
                            this.props.history.push(`${this.props.location.pathname}/allResults`)}}>
            <div class="icon-box">
              <div class="icon">
                <img
                  src={"https://cdn2.iconfinder.com/data/icons/coronavirus-10/512/news-feed-mobile-report-virus-128.png"}
                  style={{ size: "60px", height: "60px" }}
                />
              </div>
              <h1>
                <a>All Results</a>
              </h1>

              <p>  Get all Results that has been submited </p>
            </div>
          </Col>
          <Col
            xs={10}
            md={4}
            lg={4}
            className="my-4 " >
                                    <SessionCode buttonValue = "get patient Orders"
                                        fromComponent={"choice"} 
                                        orderType={this.props.match.params.type}
                                        history = {this.props.history}
                                        body={this.renderBody()}/>
                          
                    </Col>
          </div>

                <div className="row mt-5 justify-content-center align-items-center">
                   
                        {/* results start */}

                    
                        {/* results end */}

                   
                </div>
                </div>
           
        );
    }
}
 
export default ChoicePage;