import React from "react";
import { Card } from "react-bootstrap";

//item component for items on todo
function Items(props) {
  const { keyvalue, deleteItem, item } = props;
  return (
    <Card style={cardS}  onClick={() => deleteItem(keyvalue)}>
      <Card.Body>
        <h3>{item}</h3>
      </Card.Body>
    </Card>
  );
}
const cardS = {
  margin: "10px",
};

export default Items;
