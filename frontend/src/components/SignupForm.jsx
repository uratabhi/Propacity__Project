// src/components/Register.js
import React, { useState } from "react";
import { Button, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please fill all the fields!");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3000/register",
        {
          name,
          email,
          password,
        },
        config
      );
      toast.success("Registration Successful");
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col md="12">
          <h1 className="display-4 my-5 text-center">Register</h1>
        </Col>
        <Col md="6" className="mx-auto">
          <Form>
            <Form.Group controlId="formBasicName" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
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
            <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
              <InputGroup>
                <Form.Control
                  type={show ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={submitFormHandler}
              >
                Register
              </Button>
            </Form.Group>
            <p className="text-right d-flex align-items-center justify-content-end gap-2 ml-auto my-4">
              Already a Member?
              <Link to="/login" className="ml-2 text-decoration-none">
                Login
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
