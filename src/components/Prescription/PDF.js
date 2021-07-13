import Fab from "@material-ui/core/Fab";
import UploadIcon from "@material-ui/icons/CloudUploadRounded";
import PrintIcon from "@material-ui/icons/Print";
import { Document, Image, Page, PDFViewer, StyleSheet, Text, View } from '@react-pdf/renderer';
import axios from "axios";
import React from "react";
import ReactDOM from 'react-dom';
import { useReactToPrint } from "react-to-print";
import { pdf_styles as styles } from './styles';

const mystyles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingBottom:40
  },
  header: {
    flex:1,
    position:'relative',
    top:0,
    marginBottom:0
  },
  text:{
    margin:0,
    fontSize:12,
    color:'#777'
  },
  value:{
    margin:0,
    fontSize:12,
    color:'#000'
  },
  footer: {
    flex:1,
    position:'absolute',
    left:0,
    bottom:0,
    right:0,
  },
  row:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    marginLeft:10,
    marginRight:10,
    marginTop:0,
    marginBottom:0,
    position:'relative',
    top:0
    
  }
});



const { forwardRef, useRef, useImperativeHandle } = React;
const PDF = forwardRef((props, ref) => {
  const componentRef = React.useRef();

  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    if (props.prescription_rows && props.prescription_rows.length > 0) {
      setRows([...props.prescription_rows]);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    addRow(data) {
      setRows([...data]);
    },
    updateData(data) {
      setRows([...data]);
    },
  }));
  let printDiv = null;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleprint2 = ()=>{
    ReactDOM.render(<Viewer />, document.getElementById('printDiv'));

  }

  const Viewer = () => (
    <PDFViewer height={500} width='100%'>
      <MyDocument />
    </PDFViewer>
  );
  // Create Document Component
  const MyDocument = () => (
    <Document>
      <Page size="A5" style={mystyles.page}>
        <View style={mystyles.header}>
          <Image src={URL.createObjectURL(props.header)}/>
        </View>
        <View style={[mystyles.row,{marginTop:10}]}>
        <Text style={mystyles.text}>Drug</Text>
        <Text style={mystyles.text}>Frequency</Text>
        <Text style={mystyles.text}>Duration</Text>
        <Text style={mystyles.text}>Notes</Text>
        </View>
        {rows.map(row=>{
          return(
            <View style={mystyles.row}>
            <Text style={mystyles.value}>{row.drugName}</Text>
            <Text style={mystyles.value}>{row.Quantity}</Text>
            <Text style={mystyles.value}>{row.Duration}</Text>
            <Text style={mystyles.value}>{row.notes}</Text>
            </View>
            
          )
        })}
        <View style={mystyles.footer}>
          <Image src={URL.createObjectURL(props.footer)}/>
        </View>
      </Page>
    </Document>
  );

  const selectHeaderFile = (event) => {
    let file = event.target.files[0];
    alert("sasas");
    let form = new FormData();
    if (!file) {
      alert(file);
      return;
    }
    form.append("result", file);
    form.append("PID", props.PID);
    console.log(form);
    axios
      .post("http://localhost:3000/visit/UpdateResult", form)
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);

        alert(err);
      });
  };

  return (
    <div className="mg20">
      {/* White Shadow Div Start */}
      <div style={styles.parentDiv} id="myDiv">
        <Fab color="primary" aria-label="add" onClick={() => handleprint2()}>
          <PrintIcon />
        </Fab>
        {/* Header Image Button Start */}
        <label style={styles.HeaderButton} htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: "none" }}
            type="file"
            accept="image/*"
            onChange={selectHeaderFile}
          />
          <Fab color="primary" component="span" aria-label="add">
            <UploadIcon />
          </Fab>
        </label>
        {/* Header Image Button End */}
        {/* Image Div Parent Start */}
      <div id="printDiv" style={styles.prescriptionDesign}>
      </div>
        {/* <DivToPrint
          header={props.header}
          footer={props.footer}
          rows={rows}
          ref={componentRef}
        /> */}
        {/* Image Div Parent End */}
      </div>
    </div>
  );
});
export default PDF;
