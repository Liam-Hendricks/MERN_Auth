import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Container ,Row,Col} from 'react-bootstrap';
//component for landing 
class Landing extends Component {
  render() {
    return (
      <Container style={containerStyle}>
        <Row className='justify-content-center'>
           
            <Col md={'auto'}>
              <Link to="/register" style={style} className="btn btn-large waves-effect waves-light hoverable blue accent-3" >
                Register
              </Link>
            </Col>
            <Col md={'auto'}>
              <Link to="/login" style={style} className="btn btn-large btn-flat waves-effect white black-text">
                Log In
              </Link>
              </Col>
        </Row>
      </Container>
    );
  }
}

const style={

  width: "140px",
  borderRadius: "3px",
  letterSpacing: "1.5px"
}
const containerStyle={
  verticalHeight: "75vh",
  marginLeft:'auto',
  marginRight:'auto'
}
export default Landing;