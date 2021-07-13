import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import appointements from '../appointements.json';
import SessionCode from "../sessionCode";
import Spinner from '../shared/Spinner';
import DataTableComp from "../typesGenerator/dataTable";
import ModalComp from "../typesGenerator/modalGenerator";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

class UserCrud extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      columns:[] ,
      openModal:false,
      loading:false,
      ModalInputs : [] ,
      data:[],
      temp:[],
      typeObj : {},
      type:"",
      formType:"add",
      validRole:false, // if false ==> not Doctor or DoctorFD , if true ==> Doctor OR DoctorFD
      check : "", // which send to back ==>drId OR ==> drFDId,
      past :[], // for past appointements
      future:[], // for Future appointements
      doctorOrPatientAppointemnt : true, //--> if(true) ==> this for Patient appointements , false -->
      value : 0
     }
  }

  async componentDidMount(){
    var type="ForPatient";
    
      this.setState({type});
      var temp = [];
      
      for(var p in appointements[type].columnsTable ){ // for Adding actions Buttons to DataTable
        if(p === "actions"){
          appointements[type].columnsTable[p]["cell"] =  (row) =>{ return(
            <div className = "row">
            <div className="col-auto">
                <Button  variant="primary"
                style={{display :this.compareTimeForEditButton(row.date,row.startDate) ?"none" : "block" }}
                onClick={async () => {  
                     this.setUpdatedObj(row.id);
                    this.setState({formType :"edit"})
                    this.handleopenModal()
                  }}>Update</Button>
                  </div>           
                   <div className="col-auto">
           <Button  variant="danger"
                onClick={() => {
                    this.handleDelete(row.id)
                  }}>Delete
          </Button>
          </div>
          <div className="col-auto">       
         <SessionCode hidden={this.compareTimeForEditButton(row.date,row.startDate)}
          buttonValue="Make Visit" fromComponent="appointement" history={this.props.history}/>
            </div>
          
          </div>
          
          )
          }
          temp.push(appointements[type].columnsTable[p])
        }
        else{
  
          temp.push(appointements[type].columnsTable[p])
        }
      }
      this.setState({columns : temp})
      temp = []
  
  ////////////////////////////////// / * ForAddition *////////////////////////////
  var details = {}
      for(var p in appointements[type].modalAdditionForms ){ // for Addition Form Inputs
        temp.push(appointements[type].modalAdditionForms[p])
        console.log("here: " ,appointements[type].modalAdditionForms[p]["name"] )
      } 
      this.setState({
        ModalAddtionInputs : temp,
      })
      
      
  
      
  // ////////////////////////////////// / * ForUpdate *////////////////////////////
      temp = [];
        details = {}
      for(var p in appointements[type].modalUpdateForms ){  // for Update Form Inputs
        temp.push(appointements[type].modalUpdateForms[p])
      } 
      this.setState({
        ModalInputs : temp,

      })
      console.log("details for updating: " , details)
  
  
  ////////////////////////////////// / * setNew State With user attributes *////////////////////////////
      var newState = this.state;
      for(var property in appointements[type].state ){ // to put user attributes in Component's state
        newState[property] = "" 
      }
      
      await this.checkRole()
      await this.getData(type);
    }
     handleTapsChange = (event, newValue) => {
      this.setState({value:newValue});
    };
  handleClose = () => {
    this.setState({openModal : false})
  };
  handleopenModal = () => {
    this.setState({openModal : true})
  };

  setUpdatedObj = (id)=>{
    var obj =  this.state.data.find(row => row.id === id)
    console.log("obj: " , obj);
    this.setState({typeObj : obj});
  }

  handleUpdate = async()=>{
    this.setState({loading:true})
console.log("objjjject : " , this.state.typeObj)
    var details = {}

    for(var property in  appointements[this.state.type].updatedDetails){ 
      details[property] = this.state[property] || this.state.typeObj[property]; 
    }
    details["id"] = this.state.typeObj.id;
    // details["appId"] = this.state.typeObj.id;
    // details["check"] = this.state.check;
    
    console.log("details on update : " ,  details)

    
    var formBody = [];
    // property is already declared so ??
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

          console.log("formBody: ",formBody)
          await fetch(`${appointements[this.state.type].updateAppointements}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
          }).then(()=>{
            console.log("it is inserted");
          }).catch(()=>{
            console.log("errror")
          })
          this.setState({loading:false})
             this.getData(this.state.type)

  }

  handleDelete= async(id)=>{
    this.setState({loading:true})

    var details = {
      id:id
    }
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    // formBody = formBody.join("&");
    
    fetch(`${appointements[this.state.type].deleteAppointements}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(()=>{
      console.log("it is deleted");
    }).catch(()=>{
      console.log("errror")
    })

    this.setState({
      data: this.state.data.filter(row => row.id !== id),
      loading:false
     })
      
  }
  handleAdding = async()=>{
    this.setState({loading:true})
   
    var details = {}
    for(var p in appointements[this.state.type].addDetails ){ // for Addition Form Inputs
      details[p] = this.state[p]
    } 
    details["id"] = localStorage.getItem("userId");
    details["check"] = this.state.check;
    // details["check"] = "drFDId";



    console.log("details on add : " ,  details)


    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    // console.log("formging:     " , formBody)
    
await fetch(`${appointements[this.state.type].addAppointement}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    }).then(()=>{
      console.log("it is inserted");
    }).catch(()=>{
      console.log("errror")
    })
    this.setState({loading:false})

    this.getData(this.state.type);
  }
  getData = async(type)=>{
    this.setState({loading:true})

    await axios.post(`${appointements[type].getAllAppointements}`,{
       ptId:this.props.match.params.id,
       drId : localStorage.getItem("userId")
    }).then(async resp => {
          var dateNow1 = new Date();
          var d = new Date(dateNow1),
          mnth = ("0" + (dateNow1.getMonth() + 1)).slice(-2),
          day = ("0" + dateNow1.getDate()).slice(-2);
          var dateNow2 = [dateNow1.getFullYear(), mnth, day].join("-");

        var res = resp.data.filter(element => {
          if(element.date < dateNow2){
            return element;
          }
        });

        await this.setState({past : res})
        console.log("reeessssssssssssssss: " , res);

        var future = resp.data.filter(element => {
          if(element.date > dateNow2){
            return element;
          }
        });
        this.setState({future : future});
        console.log("reeessssssssssssssss: " , future);
       this.setState({  
          data : resp.data,
      })
      console.log("resp.data: " , resp.data);
    
    })
    this.setState({loading:false})
    
  }
  checkRole = () =>{
    if(parseInt(localStorage.getItem("role")) != 8 && parseInt(localStorage.getItem("role")) != 2){
      this.setState({validRole : true});
     }
     else{
      console.log("jjjjjjjjjjjjjj") 
       this.setState({validRole: false})
     }
     if(parseInt(localStorage.getItem("role")) == 8){
       this.setState({check : "drId"});
       console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
     }
     else{
      this.setState({check : "drFDId"});
     }

  }




    compareTimeForEditButton = (date , startTime ) =>{
     
      var appDate2 = date;
      var dateNow1 = new Date();
    
      var d = new Date(dateNow1),
          mnth = ("0" + (dateNow1.getMonth() + 1)).slice(-2),
          day = ("0" + dateNow1.getDate()).slice(-2);
          var dateNow2 = [dateNow1.getFullYear(), mnth, day].join("-");

      
        if (appDate2 === dateNow2)
        {
          var time2 = dateNow1.getHours() +":" + dateNow1.getMinutes() +":"+ dateNow1.getSeconds()
          console.log("time1 " , time2 , "time2: " , startTime);
          if(startTime > time2){
            console.log("not Accepted....");
            return true
          }

        }
        else if (appDate2 < dateNow2){
          return true
        }
        else{
          return false;
        }

    }

  handleChange = (evt) =>{
    const value = evt.target.value;
    console.log("name: " , evt.target.name , " value: " , evt.target.value)
    this.setState({
      [evt.target.name]: value
    });
  }
  renderingForPatientAppointements = () =>{
    return(
      <>
      {console.log("updateObject: " , this.state.data)}
        {console.log("state: " , this.state)}
        <Row className= "">
                    <Col>
                        {
                          appointements && this.state.type && (
                            <>
                            <h3>{appointements[this.state.type].title}</h3>
                            </>
                          )
                        }
                    </Col>
          </Row>
          <Row className= "py-3" >
            <Col sm={10}></Col>
                <Col sm={2}><Button variant="success"  onClick = {()=>{
                 this.setState({formType :"add"})
                 this.handleopenModal();
                }}>Add New</Button>{' '}
            </Col>
          </Row>
        <Row className=" align-items-center">
          <div style={{width:'100%'}}>
            <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleTapsChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Current Appointments" {...a11yProps(0)} />
                  <Tab label="Past Appointments" {...a11yProps(1)} />
                  <Tab label="Future Appointments" {...a11yProps(2)} />
                </Tabs>
              </AppBar>

              <TabPanel value={this.state.value} index={0}>
                <DataTableComp  data = {this.state.data} 
                          columns = {this.state.columns}
                          title= {""}
                />
              </TabPanel>

              <TabPanel value={this.state.value} index={1}>

            <DataTableComp   data = {this.state.past}
                      columns = {this.state.columns}
                      title= {"Past Appointements"}
            />
            </TabPanel>

            <TabPanel value={this.state.value} index={2}>
            
              <DataTableComp  data = {this.state.future}
                        columns = {this.state.columns}
                        title= {"Future Appointements"}
              />
          </TabPanel>
          </div>
      </Row>
     {  
      this.state.formType === "add" && this.state.ModalAddtionInputs &&this.state.ModalAddtionInputs.length > 0 ?(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalAddtionInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleUpdate = {this.handleUpdate}
        handleAdding={this.handleAdding}
        formType = {this.state.formType}
       />
       ):(
        <ModalComp show={this.state.openModal}
        onHide={this.handleClose}
        ModalInputs={this.state.ModalInputs}
        updatedTypeObj = {this.state.typeObj}
        handleChange = {this.handleChange}
        handleUpdate = {this.handleUpdate}
        handleAdding={this.handleAdding}
        formType = {this.state.formType}
       />
       )
     }
      </>
    )
  }
  render() { 
    const tableData = {
      columns:this.state.columns,
      data :this.state.data
    };
 
    return (
      <>
      <Spinner loading={this.state.loading}/>
        {this.renderingForPatientAppointements()}
      </ >
    );
  }
}
 
export default UserCrud;