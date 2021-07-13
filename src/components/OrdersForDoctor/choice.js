import React, { Component } from 'react';
import SessionCode from "../sessionCode";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class ChoicePageForDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return (  
           
                <div className="row mt-5 justify-content-center align-items-center">
                    <div className="col-10 col-md-6">
                            <Card style={{ width: '18rem',height:"15em" }} className="bg-light text-secondary" 
                            onClick={()=>{
                                // this.props.history.push(`${this.props.location.pathname}/addOrder`);
                                // console.log("history: " , this.props);
                                this.props.history.push({
                                    pathname:`${this.props.location.pathname}/addOrder`,
                                    state:"DoctorOrders"
                                  })
                                
                            }}>
                                <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                                <Card.Body className="text-secondary mt-2 mx-auto">
                                <Card.Text className="text-secondary">
                                  Add New Order
                                </Card.Text>
                                </Card.Body>
                                </Card>
                    </div>
                    <div className="col-10 col-md-6 mt-5 mt-md-0">
                    <Card style={{ width: '18rem',height:"15em" }} className="bg-light text-secondary" 
                            onClick={()=>{
                                this.props.history.push(`${this.props.location.pathname}/allOrdersForDoctor`)
                                console.log("history: " , this.props);
                                
                            }}>
                                <Card.Img variant="top" style={{cursor:"pointer"}} src={window.location.origin + '/images/img1.svg'} />
                                <Card.Body className="text-secondary mt-2 mx-auto">
                                <Card.Text className="text-secondary">
                                  Get all Your Orders
                                </Card.Text>
                                </Card.Body>
                                </Card> 
                    </div>
                </div>

           
        );
    }
}
 
export default ChoicePageForDoctor;