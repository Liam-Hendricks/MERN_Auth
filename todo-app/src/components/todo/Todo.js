import React, { Component } from "react";
import {signout, isAuth,getCookie} from '../../module/Helper';
import {Redirect } from "react-router-dom";
import axios from 'axios';

import jwt_decode from "jwt-decode";
import Input from "./input";
import Items from './items';

import { Card, Container,Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//Todo component
class Todo extends Component {
  //setting state
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      items: [],
      isEmpty: true,
      text: "",
      isAuth:true,
      errors:{},
      isLoading:true,

    };
    //bind event handlers
    this.componentDidMount=this.componentDidMount.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkifEmpty = this.checkifEmpty.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    
    this.deleteItem = this.deleteItem.bind(this);
    this.signOut=this.signOut.bind(this);
  }
  //function for checking if items array is empty
  checkifEmpty() {
    const { items } = this.state;
    if (items.length === 0) {
      this.setState({ isEmpty: true });
    } else {
      this.setState({ isEmpty: false });
     
    }
  }
  //function for handling text change on input
  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }
  
  //excuting functions when component loads
  componentDidMount(){
    //change state to true
    this._isMounted = true;
    //decode cookie
    const decode=jwt_decode(getCookie('token'));
    //perform post request for user data
    axios.post('/api/todo/view',{user:decode.id}
      )       
      .then((response)=>this.setState({items:response.data,isLoading:false}))//set the state from response
      .catch((error)=>{
        //handle errors and set staet
      if(error.response!==undefined){
        if( this._isMounted){
         this.setState({ errors:error.response.data,isEmpty:true });
        }
      }});
  }
  //unmount component
  componentWillMount(){
    this._isMounted = false;

  }
  //function for adding items
  addItem(e) {
    //get state
    const { text } = this.state;
    //check if input is empty
    if (text !== "") {
      //decode stored token
      const decode=jwt_decode(getCookie('token'));
      //set state
      this.setState({isEmpty:true});
      //perform post request
      axios({
        method:'POST',
        data:{user:decode.id,item:text,itemID:Date.now()},
        headers: { 'content-type': 'application/json' },
        url:'/api/todo/create'
      })
      .then((response)=>{
        //create toast
        toast.success(`${response.data.message}`);
        //update the items using componentDidMount
        this.componentDidMount();
        //check if list is empty
        this.checkifEmpty();
      })
      .catch(function(error){
        if(error.response!==undefined){
          console.log(error);
          this.setState({ errors:error.response.data });
        }});
      
    }
    e.preventDefault();
   
  }
  //function for deleting items
  deleteItem(key) {
    //decode stored token
    const decode=jwt_decode(getCookie('token'));
    //set state
    this.setState({isEmpty:true});
    //make delete request
    axios({
      method:'DELETE',
      data:{user:decode.id,itemID:key},
      headers: { 'content-type': 'application/json' },
      url:'/api/todo/delete'
    })
    .then((response)=>{
      //create toast
      toast.success(`${response.data.message}`);
      //update todo list using componentDidMount
      this.componentDidMount();
      //check if items are empty
      this.checkifEmpty();
      
    })
    .catch(function(error){
      //handle errors
    if(error.response!==undefined){
      console.log(error);
      this.setState({ errors:error.response.data });
    }});
    
    
  }
  //function for signing out user
  signOut(){
    //call signout method
    signout();
    //set isAuth state
    this.setState({isAuth:isAuth()});
   
  }


  render() {
    const { items,isAuth,isLoading } = this.state;
    
    return (
      
      <Container style={style}>
        <ToastContainer/>
        {isAuth ? <Redirect to="/todo" /> :  <Redirect to="/login"/>}
        <Button variant='danger' style={buttonStyle} onClick={this.signOut}> Sign out</Button>
        <Card style={card}>
          <Card.Header>What needs to be done?</Card.Header>
          <Input
            handleTextChange={this.handleTextChange}
            addItem={this.addItem}
          />
         
          { isLoading===true?(
              <h2 style={{ color: "lightgray" }}>loading...</h2>
          ):       
          
          items.length===0 ? (
            <h2 style={{ color: "lightgray" }}>no Items on List</h2>
          ) : 
           (
             <div>
               {items.map((itemObject)=>(
                 <Items
                 key={itemObject.itemID}
                 keyvalue={itemObject.itemID}
                 deleteItem={this.deleteItem}
                 item={itemObject.item}
                 />
               ))}
             </div>
           )
          }
      
        </Card>
      </Container>
    );
  }
}
const style = {
  paddingTop: "60px",
};
const card = {
  width: "700px",
  marginLeft: "auto",
  marginRight: "auto",
};

const buttonStyle={
  margin:'40px'
}
export default Todo;
