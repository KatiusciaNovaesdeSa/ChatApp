import React from 'react';
import {API} from '../Controller'
import { DATE } from '../Controller'
import './admin.css'

class EditRoom extends React.Component {
    state = { 
        id:"",
        name:"",
        createdDate:"",
        editDate:"",
        status:"",
        alert:""

     }

     componentWillMount(){
         API.frontEnd.rooms.getOne(localStorage.getItem('editRoom')).then((res)=>{
             this.setState({id:res.data[0].id,name:res.data[0].name,createdDate:res.data[0].createdDate,editDate:res.data[0].editDate,status:res.data[0].status})
            })
     }


     handleStatus = event =>{
         this.setState({status:event.target.value})
            console.log(event.target.value)
     }
     
     handleName = event =>{
        this.setState({name:event.target.value})
           console.log(event.target.value)
    }

    editRoom = event =>{
        console.log(this.state.id)
        API.frontEnd.rooms.editOne(localStorage.getItem('editRoom'),this.state.name,this.state.id,this.state.createdDate,DATE(),this.state.status).then((res)=>{
            console.log(res)
            window.alert("room edited")
            this.props.history.push("rooms");
        }).catch((error)=>{
            console.log(error)
            this.setState({alert:"Room already exists! "})
        })
    }
    render() { 
        return ( <div>
            <div className='container-fluid'>
   <div className="row ">
      <div className="col s8 m6 l3 ">
      </div>
      <div className="col s6 m6 l6 bg-light p card pink lighten-5">
         <div id="message" className="red-text" role="alert"> {this.state.alert}</div>

        <div class="center-align">
        <h5><b>Edit Room: {localStorage.getItem("editRoom")}</b></h5>
        </div>
        <div class="right-align">
         <div className="form-group">
            <label className="black-text"><b>Id: </b></label>
            <b className="text pink-text" >{this.state.id} </b >
            <br></br>
            <label className="black-text"><b>Date created: </b></label>
            <b className="text pink-text" >{this.state.createdDate} </b >
            <br></br>
            <label className="black-text"><b> Date edited: </b></label>
            <b className="text pink-text" >{this.state.editDate}</b >
         </div>
         </div>
         <br></br>
         <div className="form-group">
            <label className="text black-text"><b>Change name</b></label>
            <input type="text" name="password" value={this.state.name} onChange={ (event) => this.handleName(event)}/>
         </div>
         
         <div className="form-group">
            <label className="text black-text"><b>Change Status</b></label>
            <input type="text" name="password" value={this.state.status} onChange={ (event) => this.handleStatus(event)}/>
         </div>
         
         <div class="center-align">
         <button className="btn pink" type="submit" onClick={this.editRoom}>Edit Room</button>
         </div>   
      </div>
     
   </div>
</div>
</div>  );
    }
}
 
export default EditRoom;