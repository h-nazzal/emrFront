import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "./Navbar.css";


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    padding:"3em 2em"
  },
  cardContentHeight:{
    height: 60,
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

const DashBoardComp = ({match}) => {

  const history = useHistory();
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const MainFunctions = [
    {text: "New Doctor Appointement" , role :"doctor"},
    {text: "New patient registration" , role :"doctor"},
    {text: "EMR Electronic Medical Records" , role :"doctor"},
    {text: "Lap Information System" , role :"doctor"},
    {text: "Rediology information system" , role :"doctor"},
    {text: "Path information system " , role :"doctor"},
    {text: "Electronic proception ERX" , role :"doctor"},
    {text: "Document management" , role :"doctor"},
    {text: "System Admin" , role :"doctor"},
    // {text: "New Doctor Appointement" , role :"doctor"},
]
  // const [logged, setlogged] = React.useState(isLogin);
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [open]


  useEffect(()=>{

  
 });
 
  

  return (
<h1>kkkk</h1>
  );
      }


export default DashBoardComp;

