import React, { Component } from 'react';


import './chat.css'
import { API } from '../Controller'
import { DATE } from '../Controller'
import { TIME } from '../Controller'
import {RND} from '../Controller'
import { CheckUserConnected } from '../Controller'


import onlineIcon from '../icons/onlineIcon.png';


class messages extends Component {

    state ={
        name:"",
        room:"Room not connected",
        messages:[],
        users:[],
        message:""
      }
      
    componentDidMount(){
    // listen for users list update 
      
        this.props.socket.on("new_update",(data)=>{
            this.setState(prevState => { const { messages }  = prevState;messages.push(data.message);return { messages };});
            API.frontEnd.user.get(data.room).then((res)=>{
               var userList =[]
               this.setState({room:data.room})
               for (var i = 0; i < res.data.length; i++) {
                  if(res.data[i].room === data.room && res.data[i].connected === true ){
                   userList.push(res.data[i].user);
                   this.setState({users:userList})
                  }   
                 }
                
               })
         })
    }
    handleMessage =  event =>{
        this.setState({message: event.target.value})
    }
    handleSubmit = event=>{
      event.preventDefault();
        if(CheckUserConnected()){
        // listen messages update   
            API.frontEnd.messages.post(RND(),localStorage.getItem('userName'),this.state.users,this.state.message,DATE(),TIME(),localStorage.getItem('userRoom')).then((res)=>{
                
            })
        this.props.socket.emit("new_message",{message:this.state.message,room:this.state.room})
        this.setState({message:""})
    }else{
        window.alert("Please connect first")
    }

    } 

    render() { 
        return ( <div>
<div className="col s10 m10 l10">
      <div className="col s12 m9 l9 black">
         <div >
            <div class="row "><h5><div class="text-white">Chat messages</div></h5>
               <div class="col border scroll">
                  
                  <div id="messages mb-4 " >
                     {this.state.messages.map((value, index) => {
                     return <div class="messages border pink lighten-5">{value}</div>
                     })}   
                  </div>
               </div>
            </div>
         </div>
      
         <div>
            <input class="messages border pink lighten-5" value={this.state.message}  onfocus="this.value=''" placeholder="Enter message"  onChange={this.handleMessage} />
         </div>
         <div class="form"> 
         <button class="btn pink waves-effect waves-light" onClick={this.handleSubmit} type="Reset" name="action">
            Send
            <i class="material-icons right">send</i>
         </button>
         </div>
      </div>
      
      <div className="col s12 m3 l3">
      <h6>Currently chatting: <span role="img" aria-label="emoji">💬</span> </h6>
         <div class="col border scroll">

           
            <div id="users" >
               {this.state.users.map((value, index) => {
               return <div class="messages pink lighten-5" >
               <img className="onlineIcon" src={onlineIcon} alt="online icon" />{value}</div>
               })}   
            </div>
         </div>
      </div>
   </div>
</div>
            
        );
    }
}
 
export default messages;