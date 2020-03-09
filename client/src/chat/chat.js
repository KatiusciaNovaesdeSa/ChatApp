import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './chat.css'
import io from "socket.io-client";
import Messages from'./messages'
import { CheckUserConnected } from '../Controller'
import { API } from '../Controller'
import { DATE } from '../Controller'
import { TIME } from '../Controller'
import { EVENTID } from '../Controller'
import { PPID } from '../Controller'

class Chat extends Component {
     
  state ={
    name:"Guest",
    room:"",
    rooms:[],
    disconectionBtn :"",
    changeRoomBtn:"",
    textField :""
  }
  
  componentWillMount(){
    this.socket = io("http://localhost:5000");
  }
  
  async componentDidMount() {

    if(CheckUserConnected()){
        if (window.performance) {
            if (performance.navigation.type === 1) {
              localStorage.removeItem('userName')
              localStorage.removeItem('userRoom')
              this.socket.emit('disconnection',{userName:this.state.name})
              API.frontEnd.eventLogs.post("disconnection",this.state.name,DATE(),TIME(),EVENTID("disconnection"),PPID("disconnection")).then((success) => {
              console.log(success.data)
              API.frontEnd.user.put(this.state.name).then((res)=>{
                console.log(res)
              }).catch((error)=>{
                console.log(error)
              })
              window.alert("user disconnected")
            }).catch((error) => {
              console.log(error)
            })
            } else {
              
            }
          }
        }
        
    API.frontEnd.rooms.get().then((success) => {
        var roomsArray =[]
        for(var i=0; i < success.data.length ; i++){
            roomsArray.push(success.data[i]) 
            }
        this.setState({rooms:roomsArray})
    }).catch((error) => {
    })
      this.setState({disconectionBtn:<div className='col s12 m12 l12 mt'><button className='btn mt' id='sub2' onClick={this.handleClick}>Connect</button></div> })
      this.setState({textField: <div className='col s12 m12 l12 mt'><b>Plese enter you name</b><br></br><TextField id='outlined-name' label='Name' onChange={this.handleChangeName} /></div>})
  }



   handleChangeName =  event => {
    this.setState({name: event.target.value})
  };

  handlerRoom = event => {
    this.setState({room: event.target.innerText})
  };

  handleClick = event =>{
    event.preventDefault();
    if(!CheckUserConnected()){
      localStorage.setItem('userName',this.state.name)
      localStorage.setItem('userRoom',this.state.room)
      this.socket.emit('sendUserInfo', { name: this.state.name, room: this.state.room });
      //create connection event log
       API.frontEnd.eventLogs.post("connection",this.state.name,DATE(),TIME(),EVENTID("connection"),PPID("connection")).then((success) => {  
      }).catch((error) => {
        })
        //create joined event log
       API.frontEnd.eventLogs.post("joined",this.state.name,DATE(),TIME(),EVENTID("joined"),PPID("joined")).then((success) => {
        }).catch((error) => {
        })
       API.frontEnd.user.post(this.state.name,DATE(),TIME(),this.state.room).then((success)=>{
       }).catch((error)=>{})
       this.setState({textField: <div className='col s12 m12 l12 mt'>Welcome <b> {this.state.name}</b> <br></br>Room: <b className="pink-text text-darken-2">{this.state.room}</b></div>})
       this.setState({disconectionBtn: <button className='btn mt' id='sub2'  onClick={this.handleClick}>Disconnect</button>})
       this.setState({changeRoomBtn: <button className='btn mt' id='sub2' onClick={this.handleChangeRoom}>Change Room</button>}) 
       console.log(this.state.user)
      }else{
      localStorage.removeItem('userName')
      localStorage.removeItem('userRoom')
      this.socket.emit('disconnection',{userName:this.state.name})
       API.frontEnd.eventLogs.post("disconnection",this.state.name,DATE(),TIME(),EVENTID("disconnection"),PPID("disconnection")).then((success) => {
        console.log(success.data)
        }).catch((error) => {
          console.log(error)
        })
        this.setState({disconectionBtn:<div className='col s12 m12 l12 mt'><button className='btn mt' id='sub2' onClick={this.handleClick}>Connect</button></div> })
        this.setState({textField: <div className='col s12 m12 l12 mt'><b>Plese enter you name</b><br></br><TextField id='outlined-name' label='Name' onChange={this.handleChangeName} /></div>})
        this.setState({room:""})
        API.frontEnd.user.put(this.state.name).then((res)=>{
          console.log(res)
        }).catch((error)=>{
          console.log(error)
        })
        
        this.setState({changeRoomBtn: ""}) 
        // window.location.reload()
        
    }
  }

  handleChangeRoom = event =>{
    this.socket.emit('change_room',{room:this.state.room, name: this.state.name})
      API.frontEnd.rooms.get().then((success) => {
        var roomsArray =[]
        for(var i=0; i < success.data.length ; i++){
            roomsArray.push(success.data[i]) 
            }
        this.setState({rooms:roomsArray})
    }).catch((error) => {
    })
    API.frontEnd.user.putRoom(this.state.name,this.state.room).then((res)=>{
      console.log(res)
    })
    
    this.setState({textField: <div className='col s12 m12 l12 mt'>Welcome <b> {this.state.name}</b> <br></br>Room: <b className="pink-text text-darken-2">{this.state.room}</b></div>})

  }

  render() {
    return <div className="s" >
   <div className="row">
   <div className="col s12 m2 l2 chatNav pb  z-depth-1 ">
      <div className="row">
         <div className="col s12 m12 l12 text-center   ">
            <h3>Chat App </h3>
            <h5>Try it out!!! <span role="img" aria-label="emoji">⬅️</span></h5>
         </div>
         <div className="col s12 m12 l12 text-center  p-2">
             {this.state.textField}

         </div>
         <div className="col s12 m12 l12 text-center pb  p-2  mt">
            <div >
               <b>Chat Rooms</b>
            </div>
            <div className="collection border-none scrollRooms rooms ">
               {this.state.rooms.map((value, index) => {
               return  <span  onClick={this.handlerRoom} class="collection-item  text-dark rooms">{value.name}</span>
               })}
            </div>
         </div>
         <div className="col s12 m12 l12 mt text-center pb  p-2  mt ">
          Room selected: <b className="pink-text text-darken-2">{this.state.room}</b><br></br>
            {this.state.changeRoomBtn}
            {this.state.disconectionBtn}
         </div>
      </div>
   </div>
   <Messages socket={this.socket} isConnected={CheckUserConnected()}  />
</div>
          
    </div>;
  }
}

export default Chat;
