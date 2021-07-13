import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
class ModalForView extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }

    render() { 
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
            <Modal.Title>{this.props.formType} Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
           {this.props.body}
            </Modal.Body>
        


            </Modal>
                
                )
              
          
    }
}
 
export default ModalForView;