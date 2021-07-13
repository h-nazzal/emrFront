import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class FormModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            error:false,
            data:[],
            errors:[],
         }
    }
    componentDidMount()
    {
        this.props.ModalInputs.map((input)=>{
            this.state.data.push({
                name:input.name,
                value:null
            })
        })
        this.props.setData(this.state.data)
        console.log("data start")

        console.log(this.state.data)
        console.log("data end")

    }
    render() {  
        return (
            <Form>

                <Row>
                        <Col sm={10} className="pl-5">
                                {this.props.ModalInputs.map((input) => (
                                        <Row className="p">
                                            <Form.Group controlId={input.name}>
                                                 <Form.Label>{input.name}</Form.Label>
                                                      <Form.Control type={input.type} name={input.name} placeholder={this.props.formType === "edit" ?this.props.updatedTypeObj[input.name] : ""}  onChange={(e)=>{

                                                                let index = this.state.data.findIndex(row=>row.name==input.name)
                                                                if(index != -1)
                                                                {
                                                                    this.state.data[index].value = e.target.value
                                                                    this.setState({data:[...this.state.data]})
                                                                    this.props.setData(this.state.data)

                                                                }
                                                                this.props.handleChange(e);
                                                            }

                                                            }/>
                                                            </Form.Group>
    

                                        </Row>
                            
                            ))}
                                </Col>
                          
                  

                              
                            </Row>
                    </Form>
          );
    }
}
 
export default FormModal;