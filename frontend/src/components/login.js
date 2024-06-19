import React, { useState } from "react";
import {Button, Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// 22540008
const Login = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangeId = (e) => {
    const id = e.target.value;
    setId(id);
  };
  const login = () => {
    props.login({ name: name, id: id });
    console.log(`Logging in with name: ${name} and id: ${id}`);
    // props.history.push("/"); // unavailable since React Router v6
    navigate("/"); // thay thế cho props.history.push
  };
  // 22540008
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter id"
            value={id}
            onChange={onChangeId}
          />
        </Form.Group>
        <Button variant="primary" onClick={login}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default Login;
