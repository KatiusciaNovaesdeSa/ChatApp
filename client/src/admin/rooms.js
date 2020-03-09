import React from 'react';
import axios from "axios";
import {API} from '../Controller'


class Rooms extends React.Component {
    state = { 
        rooms:[],
        editRoom:"",
        deleteRoom:""
     }

    componentDidMount(){
            axios.get(`/api/rooms`).then(res =>{
                  console.log(res.data)
                  var roomsArray =[]
                  for(var i=0; i < res.data.length ; i++){
                    roomsArray.push(res.data[i])
                      
                  }
                  this.setState({rooms:roomsArray})

            }).catch(() => console.log("ss"))
           
        };

        handleEdit = event =>{
        
            localStorage.setItem("editRoom",this.state.rooms[event].name)
            let path = `/admin/editRoom`;
            this.props.history.push(path);
            
        }

        handleDelete = event =>{
            console.log(event)
            var res = window.confirm("Are you sure, you want to delete?")
            if(res){
            API.frontEnd.rooms.delete(this.state.rooms[event].name).then((res)=>{
                console.log(res)
            })
            window.location.reload()
            }
           
        }

        handleCreate = event =>{
            let path = `/admin/createRoom`;
            this.props.history.push(path);
        }

    
    render() { 
        return <div className="m-2">


          <button className='btn ml pink  m' onClick={this.handleCreate}>Create a new Room</button>
            <div className='container-fluid'>
                <div className='row'>                 
                    <div className='col-12 pink lighten-5 rounded z-depth-1'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Room</th>
                                    <th>Creation date</th>
                                    <th>Edit date</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.rooms.map((value, index) => {
                                    return <tr>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.createdDate}</td>
                                    <td>{value.editDate}</td>
                                    <td>{value.status}</td>
                                    <td><button className='btn ml pink' onClick={this.handleEdit.bind(this, index)}><span role="img" aria-label="emoji">🔄</span> Edit</button>
                                    <button className='btn ml black'  onClick={this.handleDelete.bind(this, index)}><span role="img" aria-label="emoji">🚮</span> Delete</button></td>
                                    
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>;
    }
}
 
export default Rooms;