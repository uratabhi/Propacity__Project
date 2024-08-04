// src/components/LoginForm.js
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const submitLoginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill all the fields!");
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/login",
        { email, password },
        config
      );
      toast.success('Login Successful.');
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col md="12">
          <h1 className="display-4 my-5 text-center">Login</h1>
        </Col>
        <Col md="6" className="mx-auto">
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword" className="mb-3">
              <InputGroup>
                <Form.Control
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroup.Text>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={handleClick}
                  >
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formBasicBtn" className="mt-3">
              <Button
                variant="primary"
                type="submit"
                className="form-control"
                onClick={submitLoginHandler}
              >
                Login
              </Button>
            </Form.Group>
            <p className="text-right d-flex align-items-center justify-content-end gap-2 mt-4">
              Not a Member?
              <Link to="/register" className="ms-2 text-decoration-none">
                Register
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
