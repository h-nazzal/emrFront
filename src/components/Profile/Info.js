import Button from '@material-ui/core/Button';
import axios from 'axios';
import React from 'react';
import '../../styles/info.css';
import {useEffect } from "react";
export default function Info(props)
{
    const[file,setFile] = React.useState(null)
    const[user,setUser] = React.useState(null)
    const[img,setImg] = React.useState(null)
    const updatePhoto = ()=>{
        let data = new FormData();
        console.log(file)
        if(!file)
        {
            alert("empty")
            return;
        }
        data.append('image',file)
        data.append('userId',props.userId)
         axios.post('http://localhost:3000/authenticate/update_phote',data).then(result=>{
             console.log(result.data)
            setImg("http://localhost:3000/images/"+result.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    useEffect(async()=>{
        console.log("kkkkkkkkkkk");
        await getUser()
    },[])
    
    const getUser = ()=>{
        axios.get('http://localhost:3000/authenticate/update_phote/user/'+props.userId).then(result=>{
            console.log("result :   ",result)
            setUser(result.data)
            setImg("http://localhost:3000/images/"+result.data.image)
            console.log(img)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const fileChangedHandler = (event) => {
        setFile(event.target.files[0])
        }
    const getName = ()=>{
    }
    return(
<div className="card">
  <div className="icons-header">
    <div>
      <span className="glyphicon glyphicon-menu-hamburger"></span>
    </div>
    <div>
      <span className="glyphicon glyphicon-heart-empty"></span>
      <span className="glyphicon glyphicon-option-vertical"></span>
    </div>
  </div>
  <div className="img-wrapper">
    <img src={img}id="profile"/>
  </div>
  <div className="about">
    <h1>{user !=null && user.userName} </h1>
    <p>Gorgeous and upcoming actress who potrays "Martha" in Dark.</p>
  </div>
  <div className="details">
    <div className="achievements-banner">
      <h1>major achievements</h1>
    </div>
    <div className="timeline-wrapper">
    <div className="bar">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
      <div className="description-wrapper">
      <div className="description">
        <h2>isi ossi</h2>
        <p>2020</p>
        </div>
      <div className="description">
        <h2>dark</h2>
        <p>2017</p>
      </div>
      <div className="description">
        <h2>luna</h2>
        <p>2017</p>
      </div>
    </div>
    </div>
  </div>
  <hr/>
  <input
  style={{display:'none'}}
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={fileChangedHandler}
      />
      <label htmlFor="contained-button-file">
        <Button style={{marginLeft:'40%'}} variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      <Button onClick={updatePhoto} style={{marginLeft:'40%',marginTop:20}} variant="contained" color="secondary">
          Save
        </Button>
</div>
    )
}