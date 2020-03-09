
import React from 'react';
import {API} from '../Controller'
import { DATE } from '../Controller'
import { RND } from '../Controller'
import './admin.css'

class CreateRoom extends React.Component {
    state = {  
        name:"",
        status:""
    }

    handleName = event =>{
        this.setState({name:event.target.value})
    }

    handleStatus = event =>{
        this.setState({status:event.target.value})
    }

    createRoom = event =>{
        API.frontEnd.rooms.create(this.state.name,RND(),DATE(),"not edited yet",this.state.status,).then((res)=>{
            console.log(res)
            window.alert("Room created!")
            this.props.history.push("rooms");

        })
    }

    render() { 
        return (<div>
<div className="row ">
      <div className="col s6 m6 l3 ">
      </div>
      <div className="col s6 m6 l6 bg-light p card pink lighten-5">
         <div id="message" className="pink-text" role="alert"> {this.state.alert}</div>

        <div class="center-align">
        <h5><b>Create Room</b></h5>
        </div>
        <br>
        </br>
         <div className="form-group">
            <input type="text" placeholder="Group name" onChange={ this.handleName}/>
         </div>
         <br>
        </br>
         <div className="form-group">
            <input type="text"  placeholder="Status" onChange={this.handleStatus}/>
         </div >
         <br>
        </br>
        <br>
        </br>
         <div class="center-align">
         <button className="btn pink" type="submit" onClick={this.createRoom}>Create</button>
         </div>
      
      </div>
      <div className="col s0 m3 l3">
      
      </div>
   
</div>
        </div>  );
    }
}
 
export default CreateRoom;