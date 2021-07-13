import { Modal } from 'react-bootstrap'
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
// import FormModal from "./formModal"

class ModalGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
    }



    render() { 
        return ( 
            <>
            <Modal show={this.props.show} onHide={this.props.onHide} style={{marginTop:"3em"}}>
                <Modal.Header closeButton>
                <Modal.Title>{this.props.formType && this.props.formType.charAt(0).toUpperCase() + this.props.formType.slice(1)} Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {/* render Children Component */}
                        {this.props.children}
                </Modal.Body>
                <Modal.Footer>
               
                <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            </>
         );
        }
    }
    
export default ModalGenerator;
