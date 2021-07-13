// import React, { Component } from 'react';
// import DataTable from 'react-data-table-component';
// import "./dataTable.css";
// import appointements from "../appointements.json";

// class DataTableComp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           adding:true,
//           updating : true,
//           deleting : true,
//           tableName : "appointements",
//           columns:[]
//           }
//     }
//     componentDidMount(){
//       this.handleDataTableColumns();
//     }
//     handleDataTableColumns = () =>{
//       var temp = [] ;
//       for(var app in appointements){}

//     }

//     handleAdding = () =>{

//     }
//     handleUpdating = async() =>{

//         var details = {}

//         for(var property in  appointements[this.state.type].updatedDetails){ 
//           details[property] = this.state[property] || this.state.typeObj[property]; 
//         }
//         details["id"] =  this.state.typeObj.id;
//         //details["appId"] = this.state.typeObj.id;
//         //details["check"] = this.state.check;
        
//         console.log("details on update : " ,  details)
    
        
//         var formBody = [];
//         // property is already declared so ??
//         for (var property in details) {
//           var encodedKey = encodeURIComponent(property);
//           var encodedValue = encodeURIComponent(details[property]);
//           formBody.push(encodedKey + "=" + encodedValue);
//         }
//         formBody = formBody.join("&");
    
//               console.log("formBody: ",formBody)
//                fetch(`${appointements[this.state.type].updateAppointements}`, {
//                 method: 'PUT',
//                 headers: {
//                   'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//                 },
//                 body: formBody
//               }).then(()=>{
//                 console.log("it is inserted");
//               }).catch(()=>{
//                 console.log("errror")
//               })
//                  this.getData(this.state.type)
//     }
//     handleDeleting = () =>{

//     }
//     render() { 
//         const tableData = {
//             columns:this.props.columns,
//             data :this.props.data
//           };
//         return ( 
//           <div>
//              <DataTable
//                title={` ${this.props.title}`}
//                columns={this.props.columns}
//                data={this.props.data}
//                pagination
//                highlightOnHover
               
//              />
//            </div>
//          );
//     }
// }
 
// export default DataTableComp;