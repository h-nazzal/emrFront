import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import DataTableComp from "../../typesGenerator/dataTable";
import emrFile from "../emrDB.json";









class DataGridTable extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      //openModal1:false, /// if this component will have a modal
      columns:[] // that is for DataTable Columns
          }
        }

    async componentDidMount(){
      this.setState({type : "Search"}) // to get the Object of Search from Json file emrDB.json
      this.handleDataTableColumns()
      }
      
  

    // ****if this component Will include Modal****
    // handleopenModal = () => {
    //   this.setState({openModal1 : true})
    // };
  
    //  handleClose = () => {
    //   this.setState({openModal1 : false})
    // };


    handleDataTableColumns = () =>{//handle actions Cell and put button to it
      var type = "Search"
      var temp = [];
    
      for(var p in emrFile[type].columnsTable ){ // for Adding actions Buttons to DataTable
        if(p === "actions"){ // change it if you want to add any button in Actions cell

          emrFile[type].columnsTable[p]["cell"] =  (row) =>{ return(
          <div className = "row">
            <div className="col-auto">
              <button  className="btn btn-info"
                onClick={async () => {  
                  this.props.history.push(`/ClinicalDashBoard/${row.id}`);
                  // this.handleDelete(row.id);

                  }}>Go to ClinicalDashBoard</button>
            </div>
          
          </div>
          )
          }
          temp.push(emrFile[type].columnsTable[p])
        }
        
        else{
  
          temp.push(emrFile[type].columnsTable[p])
        }
      }
      this.setState({columns : temp})
      temp = []
    }
    rendering = () =>{
        return(
        <Container>
          <Row className= "py-3">
              <Col>
                  {
                    emrFile && this.state.type && (
                      <>
                        <h3>{emrFile[this.state.type].title}</h3>
                        <div>{emrFile[this.state.type].description}</div>
                      </>
                    )
                  }
              </Col>
          </Row>

            {console.log("columns : " , this.state.columns)}
            <DataTableComp  data = {this.props.filtered}
            columns = {this.state.columns}
            title = ""
            />

     
        </Container>
        
        )
    }
    


    render() { 
      return (
        <div className="">
            {this.rendering()}
          

        </div>
    
      );
    }
}
 
export default DataGridTable; 