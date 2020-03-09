import React, { Component } from 'react';
import Navigation from './navigation/navigation'
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from './login/login'
import AdminNavigation from './admin/adminNav'
import Chat from './chat/chat'
import './App.css'



class App extends Component {
  render() {
    return (
      <div>
      <BrowserRouter>
      <Navigation/>
      <Switch> 
        <Route path="/login" component={Login}/>
        <Route path="/admin" component={AdminNavigation}/>
        <Route path="/chat" component={Chat}/>
        
      </Switch>
  </BrowserRouter>

  <div>
    <br></br><br></br><br></br><br></br><br></br><br></br>
       <h1 id="a"> Welcome to Chat App!!!</h1>
  </div>
      </div>

      
    );
  }
}


export default App;
