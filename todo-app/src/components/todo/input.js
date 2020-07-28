import React from "react";
import { Form, Button,Row,Col} from "react-bootstrap";


//input component for todo 
function Input (props) {
  
    const {handleTextChange,addItem}=props;
    return (
    <Form onSubmit={addItem}>
        <Form.Group controlId="formItem" >

            <Form.Label>Item</Form.Label>
            <Row className='justify-content-center'>
                <Col md={'auto'}>
                <Form.Control type="item" placeholder="Enter Task"  onChange={handleTextChange} style={input} />
                </Col>
                <Col md={'auto'}>
                <Button variant="primary" type="submit">
                    Add Task
                </Button>
                </Col>
            </Row>
            
        </Form.Group>
    
    </Form>
    );
  
}
const input ={
    width:'300px'
    
}


export default Input;







