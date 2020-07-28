import React, { Component } from "react";
import Todo from './components/todo/Todo';
import Navbar from "./components/landing/Navbar";
import Landing from "./components/landing/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from './components/Auth/PrivateRoute';
import {BrowserRouter ,Route,Switch} from 'react-router-dom';
import './App.css';

class App extends Component {
    
  
  render(){
    
    return (
      <BrowserRouter>
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"
        />
           <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login}/>
             
          <Switch>
             <PrivateRoute exact={true} path="/todo" component={Todo} />
          </Switch>


      
      </div>
      </BrowserRouter>
    );
  }
 
}

export default App;
