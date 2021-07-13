import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// this file will genrate the basic form groups to be loaded into a <form> element.
import Spinner from '../shared/Spinner';

class FormGenerator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error:false,
            data:[],
            errors:[],
            loading:false
        };
    }
    componentDidMount()
    {
        this.props.ModalInputs.map((input)=>{
            this.state.data.push({
                name:input.name,
                value:null
            })
        })
        console.log("data start")

        console.log(this.state.data)
        console.log("data end")

    }

    render() {
        return (
            <>
            <Spinner loading={this.state.loading}/>
            <Form>
                {
                this.state.error
                 &&(
                <div className="alert alert-danger" role="alert">
                    <ul className="list">
                        {this.state.errors.map(row=>(
                            <li className="text-danger">Please Fill {row.name}</li>
                        ))}
                    </ul>
                </div>
                 )
                }
                <Col sm={12}>
                    <Row>
                        <Col sm={12}>
                            {this.props.ModalInputs.map((input) => (
                                <div className="py-2 justify-content-center">
                                    {input.type !== "select" ? (
                                        <Form.Group controlId={input.name}>
                                            <Form.Label>
                                                {input.name}
                                            </Form.Label>
                                            <Form.Control
                                                type={input.type}
                                                name={input.name}
                                                placeholder={
                                                    this.props.formType ===
                                                    "edit"
                                                        ? this.props
                                                              .updatedTypeObj[
                                                              input.name
                                                          ]
                                                        : ""
                                                }
                                                onChange={(e) => {
                                                    let index = this.state.data.findIndex(row=>row.name==input.name)
                                                    if(index != -1)
                                                    {
                                                        this.state.data[index].value = e.target.value
                                                        this.setState({data:[...this.state.data]})
                                                    }
                                                    this.props.handleChange(e);
                                                }}
                                            />
                                        </Form.Group>
                                    ) : (
                                        <>
                                            <Form.Group controlId="exampleForm.SelectCustom">
                                                <Form.Label>
                                                    {input.name}
                                                </Form.Label>
                                                {console.log("input: ", input)}
                                                <Form.Control
                                                    as="select"
                                                    name={input.name}
                                                    onChange={(e) => {
                                                        console.log("e: ", e);
                                                        let index = this.state.data.findIndex(row=>row.name==input.name)
                                                        if(index != -1)
                                                        {
                                                            this.state.data[index].value = e.target.value
                                                            this.setState({data:[...this.state.data]})
                                                        }
                                                        this.props.handleChange(e);

                                                    }}
                                                    custom
                                                >
                                                    <option>
                                                        Choose your option
                                                    </option>
                                                    {input.options
                                                        ? input.options.map(
                                                              (option) => {
                                                                  // return <option value={option.value} >{option.text}</option>
                                                                  return (
                                                                      <option
                                                                          value={
                                                                              option.value
                                                                          }
                                                                      >
                                                                          {
                                                                              option.text
                                                                          }
                                                                      </option>
                                                                  );
                                                              }
                                                          )
                                                        : this.props.options.map(
                                                              (option) => {
                                                                  return (
                                                                      <>
                                                                          <option
                                                                              value={
                                                                                  option.value
                                                                              }
                                                                          >
                                                                              {
                                                                                  option.text
                                                                              }
                                                                          </option>
                                                                      </>
                                                                  );
                                                              }
                                                          )}
                                                </Form.Control>
                                            </Form.Group>
                                        </>
                                    )}
                                </div>
                            ))}
                        </Col>
                    </Row>
                    <Row className=" justify-content-end">
                        <Col sm={12}>
                            <Button
                                block
                                variant="primary"
                                value={this.props.buttonTitle || "Add "}
                                onClick={() => {
                                    let arr = this.state.data.filter(row=>row.value == null)
                                    if(arr.length > 0)
                                    {
                                        this.setState({error:true,errors:arr})
                                        return;
                                    }
                                    this.setState({loading:true})
                                    this.props.handleSubmit();
                                    this.setState({loading:false})

                                }}
                            >
                                {this.props.buttonTitle || "Add "}
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {/* <input type="button" value="Submit" onClick={()=>{
                        this.props.handleUpdate()
                            }} /> */}
                    </Row>
                </Col>
            </Form>
            </>
        );
    }
}

export default FormGenerator;
