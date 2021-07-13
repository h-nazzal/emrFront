import BackImage from "../../assets/images/back.png";

export const pdf_styles = {
    parentDiv: {
      borderRadius: 6,
      elevation: 3, //how much comes away from screen
      backgroundImage: `url(${BackImage})`,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: "#333",
      shadowOpacity: 0.3,
      marginHorizontal: 4,
      marginVertical: 6,
      shadowRadius: 2,
      position: "relative",
      marginTop: 10,
      paddingBottom: 40,
    },
    prescriptionDesign: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "50%",
      position: "relative",
    },
  
    headerImage: {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
    },
    HeaderButton: { position: "absolute", top: 0, right: 0, textAlign: "center" },
    footerImage: {
      position: "relative",
      bottom: 0,
      left: 0,
      width: "100%",
    },
  };

  export const template_styles={
    parentDiv:{
        borderRadius:6,
        elevation:3,//how much comes away from screen
        backgroundColor:'#fff',
        shadowOffset:{width:1,height:1},
        shadowColor:'#333',
        shadowOpacity:0.3,
        marginHorizontal:4,
        marginVertical:6,
        shadowRadius:2,
        position:'relative',
        marginTop:10,
        backgroundImage: `url(${BackImage})`,
        paddingTop:20,
        paddingBottom:20
    },
    prescriptionDesign:{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        position:'relative',
        backgroundColor:'#fff'
    },
    HeaderButton:{ position:'absolute',top:0,right:"-3em",textAlign:"center"},
    FooterButton:{ position:'absolute',bottom:0,right:"-3em",textAlign:"center"},
    NoteButton:{ position:'absolute',top:0,right:0,textAlign:"center"},
    Modal:{

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divModal:{
        backgroundColor: '#fff',
        border: '2px solid #000',
        boxShadow: 5,
        padding: 10,
    },
    formControl:{
        marginRight: 2,
        marginTop:10,
        width:'100%'
    },
    Button:{
        marginRight: 2,
        marginTop:40,
        width:'100%'
    },
    headerImage:{
        position:'relative',
        top:0,
        left:0, 
        width:'100%',
        height : 200
    }
    ,
    footerImage:{
        position:'relative',
        bottom:0,
        left:0, 
        width:'100%',
        height : 200

    }
}

export const print_styles = {
    prescriptionDesign: {
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      alignContent: "center",
      justifyContent: "space-between",
      width: "50%",
      position: "relative",
      backgroundColor: "#fff",
    },
  
    headerImage: {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
    },
    footerImage: {
      position: "relative",
      bottom: 0,
      left: 0,
      width: "100%",
    },
  };