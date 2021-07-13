import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import nurseModule from "../nurseDB.json";
import Spinner from '../shared/Spinner';
import DataTableComp from "../typesGenerator/dataTable";


class PatientsOnVisit extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      typeId:0,
      loading:false,
      patientsOnVisit:[],
      columns:[]
          }
        }

    getData = async()=>{
      this.setState({loading:true})
    var type = "patientsOnVisit"
      var details = {
        date:new Date()
       }
       var formBody = [];
       for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
       }
       formBody = formBody.join("&");
   console.log("/.........................." ,nurseModule[type] )
   
  //  await fetch(`https://localhost:8080/session/getSessionByDate`, {
       await fetch(`${nurseModule[type].getAll}`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         }
         
       }).then(async(resp)=>{
         resp.json().then(async(data)=>{
           console.log("Data:  " , data)
           this.setState({patientsOnVisit : data});
          //  await this.setState({orderlabList: data});
         })
       }).catch(()=>{
         console.log("error Getting Here")
       })
       this.setState({loading:false})
      
    }
  
     handleCloseModal2 = () => {
      this.setState({openModal2 : false})
    };
  
 

   async componentDidMount(){
      this.getData()
      this.handleDataTableColumns()
    }
    handleDataTableColumns = () =>{
      var type = "patientsOnVisit";
      var temp = [];
    
      for(var p in nurseModule[type].columnsTable ){ // for Adding actions Buttons to DataTable
        if(p === "actions"){
          nurseModule[type].columnsTable[p]["cell"] =  (row) =>{ return(
          <div className = "row">
            <div className="col-auto">
              <button  className="btn btn-info"
                onClick={async () => {  
                  console.log("rooooow : " , row)
                  this.props.history.push(`${this.props.location.pathname}/nurseVisit/${row.ptId}`)
                  }}>Fill Vitals</button>
            </div>
          
          </div>
          )
          }
          temp.push(nurseModule[type].columnsTable[p])
        }
        else{
  
          temp.push(nurseModule[type].columnsTable[p])
        }
      }
      this.setState({columns : temp})
      temp = []
    }


    rendering = () =>{
        return(
          <Container>
            <Spinner loading={this.state.loading}/>
          <Row className= "py-3">
              <Col>
                  {
                      <>
                        <h3>All Patients on Active Visit</h3>
                        <div>You will see here all patients on visits....</div>
                      </>
                    
                  }
              </Col>
          </Row>
            {
        this.state.patientsOnVisit &&(
          <DataTableComp data={this.state.patientsOnVisit}
          columns = {this.state.columns} 
          title= ""/>

        )
      }
            </Container> 
            
                    
        
        )
    }



    render() { 
      const { classes } = this.props;
        
  return (
    <div className="hero">
     
        {this.rendering()}

    </div>
 
  );
    }
}
 
export default PatientsOnVisit; 