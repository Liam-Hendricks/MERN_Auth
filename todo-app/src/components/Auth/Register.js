import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container ,Row,Col} from "react-bootstrap";
import classnames from "classnames";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//component for registration
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      registered:false
    };
  }
  //handle input change
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  //handle submit
  onSubmit = (e) => {
    //get state
    const {email,password,name,password2}=this.state;
    //create post method
    axios.post('/api/register',{
            
      name:name,
      email: email,
      password: password,
      password2: password2,
      })
    .then((result)=>{
      //display success
      toast.success(`Account Created`);
      
    })
    .catch((error) => this.setState({ errors:error.response.data}));

    e.preventDefault();
    
  };

  render() {
    //get state
    const { errors,name,email,password,password2 } = this.state;
    return (
      <Container style={containerStyle}>
        <ToastContainer />
        <Row className="justify-content-center">
          <Col md={'auto'}>
            <Col md={'auto'}>
            <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
            </Col>
           
            <div className="col " style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="grey-text text-darken-1"> Already have an account? <Link to="/login">Log in</Link> </p>
            </div>
            
            <form noValidate onSubmit={this.onSubmit} >
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={buttonStyle}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
            </Col>
          </Row>
      </Container>
    );
  }
}
const containerStyle = {
  marginLeft: "auto",
  marginRight: "auto",
  
};
const buttonStyle={
  width: "150px",
  borderRadius: "3px",
  letterSpacing: "1.5px",
  marginTop: "1rem",
}
export default Register;
