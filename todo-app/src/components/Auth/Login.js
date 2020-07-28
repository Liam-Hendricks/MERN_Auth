import React, { Component } from "react";

import {Redirect, Link } from "react-router-dom";
import classnames from "classnames";
import {authenticate,isAuth} from '../../module/Helper';
import { toast } from 'react-toastify';
import {Row,Col, Container} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.min.css';
import jwt_decode from "jwt-decode";

import axios from 'axios';
//Login Component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      success:false,
      token:''
    };
  }
//handle input change
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
};
//handle submit
onSubmit = e => {
  //get state
  const {email,password}=this.state;
  //create post request
  axios.post('/api/login',{email: email,password: password})
  .then((result)=>{
    //authenticate user and add token
    authenticate(result.data.token,() => {
      const name =jwt_decode(result.data.token).name;
      toast.success(`Hey,${name} Welcome back!`);
      isAuth();
    });
    //update state
    this.setState({success:result.data.success,token:result.data.token});
    
  })
  .catch((error) =>{
    //catch error messages
    if(error.response!==undefined){
      this.setState({ errors:error.response.data });
    }

  });
  
  //prevent form from reloading 
  e.preventDefault();

};

render() {
    //get state
    const { errors,password,email } = this.state;
return (
      
      <Container style={containerStyle}>
       
        {isAuth() ? <Redirect to="/todo" /> :  <Redirect to="/login"/>}
        
        <Row className='justify-content-center' >
          <Col md={'auto'}>
            <div className="col" >
            <Link to="/" className="btn-flat waves-effect"><i className="material-icons left">keyboard_backspace</i> Back to  home </Link>
            </div>
          
            <div className="col " style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1"> Don't have an account? <Link to="/register">Register</Link></p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col ">
                <input
                  onChange={this.onChange}
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col ">
                <input
                  onChange={this.onChange}
                  value={password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col " style={{ paddingLeft: "11.250px" }}>
                <button   style={buttonStyle}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const buttonStyle={
  width: "150px",
  borderRadius: "3px",
  letterSpacing: "1.5px",
  marginTop: "1rem",
}
const containerStyle={
  marginLeft:'auto',
  marginRight:'auto',
}
export default Login;