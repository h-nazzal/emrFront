import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount(){
        console.log("//////////******************/////////")
    }
    render() {  
        return (
            <form className="row justify-content-center">
                        <div className="col-10 align-items-center">
                            <div className="row">
                                <div className="col-10">
                                {this.props.ModalInputs.map((input) => (
                                        <div className="row py-2">
                                               <TextField  id="standard-basic" label={input.name}
                                                            name={input.name}
                                                            type={input.type}
                                                            defaultValue={this.props.formType === "edit" ?this.props.updatedTypeObj[input.name] : ""}
                                                            onChange={(e)=>{
                                                                this.props.handleChange(e)}

                                                            }
                                                            
                                                />

                                        </div>
                            
                            ))}
                                </div>
                          
                  
                              </div>
                                <div className="row">
                                {/* <input type="button" value="Submit" onClick={()=>{
                                  this.props.handleUpdate()
                                        }} /> */}
                            
                                </div>
                            </div>

                    </form>
          );
    }
}
 
export default Form;