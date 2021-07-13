  
import { Box, Button, FormControl, TextField, Typography, withStyles } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import FooterIcon from '@material-ui/icons/BorderBottom';
import HeaderIcon from '@material-ui/icons/BorderTop';
import NoteIcon from '@material-ui/icons/Notes';
import React, { Component } from "react";
import defaultImage from '../../assets/images/default-image.jpg';
import { template_styles as styles } from './styles';


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#EEEEEE",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

export default class UploadImages extends Component {
  constructor(props) {

    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);
    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      headerImage: undefined,
      footerImage: undefined,
      progress: 0,
      open:false,
      message: "",
      isError: false,
      imageInfos: [],
    };
  }

  componentDidMount() {

    // UploadService.getFiles().then((response) => {
    //   this.setState({
    //     imageInfos: response.data,
    //   });
    // });
  }

        //handle Modal Open
   handleOpen = () => {
        this.setState({
            ...this.state,
            open:true
        })
    };
          //handle Modal CLose
    handleClose = () => {
        this.setState({
            ...this.state,
            open:false
        })
    };

  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 100,
      message: ""
    });
  }

  selectHeaderFile=(event)=> {
    this.setState({
        ...this.state,
      headerImage: URL.createObjectURL(event.target.files[0]),

    });
    this.props.setHeader(event.target.files[0])
  }

  selectFooterFile=(event)=> {
    this.setState({
        ...this.state,
      footerImage: URL.createObjectURL(event.target.files[0]),

    });
    this.props.setFooter(event.target.files[0])

  }

  updateNotes = (e)=>{

      this.setState({
          ...this.state,
          notes:e.target.value
      })
      this.props.setNotes(e.target.value)
  }

  upload() {
    this.setState({
      progress: 0
    });

    // UploadService.upload(this.state.currentFile, (event) => {
    //   this.setState({
    //     progress: Math.round((100 * event.loaded) / event.total),
    //   });
    // })
    //   .then((response) => {
    //     this.setState({
    //       message: response.data.message,
    //       isError: false
    //     });
    //     return UploadService.getFiles();
    //   })
    //   .then((files) => {
    //     this.setState({
    //       imageInfos: files.data,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       progress: 0,
    //       message: "Could not upload the image!",
    //       currentFile: undefined,
    //       isError: true
    //     });
    //   });
  }

  render() {
    const {
      currentFile,
      previewImage,
      headerImage,
      footerImage,
      progress,
      message,
      imageInfos,
      isError
    } = this.state;
    // this.classes = useStyles(this.props);
    
    return (
        <div className="mg20">
         {/* Upload Button Start */}
        {/* <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            accept="image/*"
            onChange={this.selectFile} />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             Choose Template
          </Button>
        </label> */}
        {/* Upload Button End */}

        {/* File name Start */}
        <div className="file-name">
        {currentFile ? currentFile.name : null}
        </div>
        {/* File name End */}

        {/* Progress Start */}
        {currentFile && (
          <Box className="my20" display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
            </Box>
          </Box>)
        }
        {/* Progress End */}

        {/* White Shadow Div Start */}
          <div style={styles.parentDiv}>
              {/* Image Div Parent Start */}
              <div style={styles.prescriptionDesign}>

                {/* Header Image Button Start */}
                <label style={styles.HeaderButton} htmlFor="btn-upload">
                <input
                    id="btn-upload"
                    name="btn-upload"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={this.selectHeaderFile} />
                    <Fab color="primary"
                        component="span"
                        aria-label="add"
                        >
                        <HeaderIcon  />
                    </Fab> 
                    </label>
                {/* Header Image Button End */}

             <img  style={styles.headerImage}
              src={
                headerImage?
                headerImage
                :
                this.props.header?
                URL.createObjectURL(this.props.header):
                 defaultImage}  /> 

                {/* Footer Image Button Start */}

                <label style={styles.FooterButton} htmlFor="btn-upload-footer">
                <input
                    id="btn-upload-footer"
                    name="btn-upload-footer"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={this.selectFooterFile}
                     />
                    <Fab 
                    color="primary"
                    component="span"
                    aria-label="add"
                    >
                        <FooterIcon  />
                    </Fab> 
                    
                </label>
                {/* Footer Image Button End */}

                <img  style={styles.footerImage}
              src={
                  footerImage?
                  footerImage
                  :
                  this.props.footer?
                  URL.createObjectURL(this.props.footer):
                   defaultImage}  /> 

            </div>
            {/* Image Div Parent End */}

            {/* Notes Button Start */}
            <div style={styles.NoteButton}>
                <Fab color="primary"  aria-label="add" onClick={()=>this.handleOpen()} >
                    <NoteIcon  />
                </Fab> 
            </div>
            {/* Notes Button Start */}

          </div>
        {/* White Shadow Div End */}
        
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            closeAfterTransition
            style={styles.Modal}
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
            >
                <Fade in={this.state.open}>
                <div style={styles.divModal}>
                    <FormControl style={styles.formControl}>
                    <TextField
                        id="standard-textarea"
                        label="Notes"
                        placeholder="Write Any thing"
                        multiline
                        onChange={this.updateNotes}
                        />
                </FormControl>
                <Button onClick={()=>this.handleClose()} style={styles.Button} variant="contained" color="primary">
                    Save
                </Button>          
                </div>
                </Fade>
        </Modal>

      </div >
    );
  }
}