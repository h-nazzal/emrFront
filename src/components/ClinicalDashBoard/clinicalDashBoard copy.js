import Button from '@material-ui/core/Button';
import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import FormControl from '@material-ui/core/FormControl';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { BrowserRouter as Route, Switch,Link } from "react-router-dom";
import { useState } from 'react';
import "./index.css";
import PatientProblems from "./problems";
import UserInfo from "./userInfo";
import PatientAppointement from './patientAppointements';
import Visit from '../Visit/visit';
import Prescription from "../Prescription/Prescription";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AllOrders from "../orderGeneration/allOrders"

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width:"100%"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
      
    }),
    backgroundColor: "#648695",
    // padding: "0.4em",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
   
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  loginLogoutButton : {
    backgroundColor: "transparent",
    border: "1px solid #fff",
    transitions:"all 0.4s",
    color: '#fff',
    '&:hover': {
      backgroundColor: '#9fb8c3',
    
  },
  },
  cardStyle:{
    width:"90%",
    height:"auto",
    borderRadius:"1em",
    padding:"1em"
    // display:"flex",
    // backgroundColor:"yellow"
  },
  media: {
    height: 50,
    margin:"1em",
    padding:"3em 1em"
  },
  cardContentHeight:{
    height: 80,
    // backgroundColor:"yellow"
  },
  button:{  

  },
  learnMoreBtn:{
    padding:"0.5em 2em",
    backgroundColor:"transparent",
    border:"2px solid #9fb8c3",
    boxShadow:"2px 2px 9px #bcb4b4",
    '&:hover': {
      backgroundColor: '#9fb8c3',
  },
  },
  GridSpacing:{
    // padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(1),
    },
  }
  
    
}));

const ClinicalDashBoard = ({match}) => {
  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const [logged, setlogged] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [ptId, setPtId] = useState(41);
  
  
  
const [ appBarList , setAppBarList] = useState(["OnGoingProblems" , "index2" , "index3" , "index4"]);
const [ role , setRole] = useState("Doctor");
const [ isLogin , setisLogin] = useState(false);
const [ dropDownFunctions , setdropDownFunctions] = useState(["Dr.DahshBoard" 
                , "appointments" ,"activityLog" ,"trash"]);


  useEffect(()=>{ 
    console.log("herree dashBoard:" , localStorage.getItem("role"));
    var localStorageRole = parseInt(localStorage.getItem("role"));

 });
 
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
   
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"  
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
          
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          
          {/* DashBoard Header */}
          <Typography variant="h6" noWrap> 
            Our Clinical DashBoard
          </Typography>

          <Typography  component="div" style={{marginLeft :"auto",    marginRight: "1em" , display:"flex" , alignItems:"center"}}>
          <Button variant="contained" className={classes.loginLogoutButton}  onClick= {()=>{
                 localStorage.removeItem("userId");
                 localStorage.removeItem("role");
                 localStorage.removeItem("labId");
                 setlogged(false);
                 history.push("/login")
              }}>
              LogOut
            </Button>
            <span>
              <AccountCircleIcon style={{fontSize:"2em"}} onClick={()=>{
                history.push(`${match.path}/profile`)
              }}/>
            </span>
     
                 <FormControl className={classes.formControl}>

        
      </FormControl>
                </Typography>
        </Toolbar>
      </AppBar>
      <Drawer

        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider/>
        {/* for SideBar of DashBoard */}
        <List>
          {appBarList.map((text, index) => (
            <ListItem button key={text} onClick = {()=>{
     
            }}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text}  />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.root}>
      <main
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
      >

      <div className={classes.drawerHeader} />

      <Typography className="row">
      <div className="col-4 col-md-4 col-lg-3 ">
      <div class="wrapper">
    {/* Bootstrap SideBar */}
    <nav id="sidebar">
        <div className="sidebar-header">
            
        </div>

        <ul className="list-unstyled components">
            <li>
     
            {
              parseInt(localStorage.getItem("role")) === 8?
              (
                <Link to={match.path+"/clinicalDashBoard"} style={{cursor:"pointer"}} >
                Clinical DashBoard
                </Link>
              ):(
                <Link to="#" style={{cursor:"not-allowed"}} >
                Clinical DashBoard
                </Link>
              )
            }
            </li>
            <li>
            <Link to={match.path+`/patientAppointement/${ptId}`}>
                       Patient Appointement
            </Link>
            </li>
            <li>
            <Link to={match.path+`/patientOnGoingProblems/${"onGoingProblems"}`}>
                        On Going Problems
                      </Link>
            </li>
            <li>
            <Link to={match.path+`/patientAllergyproblems/${"allergy"}`} >
                        Allergies
            </Link>
            </li>
            <li>
            <Link to={match.path+`/allLabOrders/${"lab"}/${ptId}`} >
                        Lab Orders
            </Link>
            </li>
            <li>
            <Link to={match.path+`/allPathologyOrders/${"pathology"}/${ptId}`} >
                        Pathology Orders
            </Link>
            </li>
            <li>
            <Link to={match.path+`/allRadioOrders/${"radio"}/${ptId}`} >
                        radio Orders
            </Link>
            </li>

        
           
        </ul>
    </nav>

</div>
      </div>
      <div className="col-8">
      <Typography className="row">
        <UserInfo id="25" />
      </Typography>
      <Switch>  
      <Route exact path={match.path+"/clinicalDashBoard"} >
        <PatientProblems type={"allergy"} />
        <PatientProblems type={"onGoingProblems"} />
        
        </Route> 
      <Route exact key={4} path={match.path+"/patientAllergyproblems/:type"}  component={PatientProblems}/> 
      <Route exact key={5} path={match.path+"/patientOnGoingproblems/:type"}  component={PatientProblems}/> 
      <Route exact path={match.path+"/patientAppointement/:id"}  component={PatientAppointement}/> 
      
      
      {/* <Route path={[`${match.path}/AllOrders/lab/:id`, "/users", "/widgets"]} component={Home} /> */}
      
      <Route exact key={1} path={match.path+"/allLabOrders/:type/:id"}  component={AllOrders}/> 
      <Route exact key={11} path={match.path+"/allLabOrders/:type"}  component={AllOrders}/> 
      <Route exact key={2} path={match.path+"/allPathologyOrders/:type/:id"}  component={AllOrders}/> 
      <Route exact key={3} path={match.path+"/allRadioOrders/:type/:id"}  component={AllOrders}/> 
      
     
      <Route exact path={match.path+"/patientAppointement/:id/visit"}  component={Visit}/> 
      <Route exact path={match.path+"/patientAppointement/:id/visit/prescription/:visitId"}  component={Prescription}/> 
      <Route exact path={match.path+"/profile"}  component={Prescription}/> 
     
    </Switch>
      </div>
    </Typography>

 </main>

     </div>

      
      {/* routes */}
      {/* <h1 className="mt-5">dddd</h1> */}

    </div>
 
          
  );
}
// const mapactiontoprops = (disptch) =>{
//   return bindActionCreators({setChangeOpen } ,disptch);
// }
// const mapstatetoprops = (state) =>{
//   console.log("lllllllllllllll",state);
//   return {msg : state.Drawer}
// }

export default ClinicalDashBoard;

      // <div className="container">
      //       <div className="row" style={{marginTop:"5em" }}>
      //           <div className="col-4">

      //           </div>
      //           <div className="col-8">
      //         {/* <OnGoingProblemStep /> */}
      //       <Switch>  
      //       <Route exact path={match.path+"/OnGoingProblems"}  component={OnGoingProblemStep}/> 
      //       {/* <Route exact path={match.path}  component={DashBoardComp}/>  */}
      //       {/* <Route exact path={match.path+"/com"} component={Signup}/>
      //       <Route exact path={match.path+"/login"} component={LoginForm}/> */}
      //       {/* <Route exact path={match.path+"/ptRegistration"} component={ptRegistration}/> */}
      //       </Switch>
      //           </div>
      //       </div>
      // </div>