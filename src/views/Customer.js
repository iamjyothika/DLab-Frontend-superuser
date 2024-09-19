import React from "react";
import Button from 'react-bootstrap/Button';
import { useState,useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Card, CardBody, CardHeader, CardTitle, Table, Row, Col, Container, InputGroup, Form } from 'react-bootstrap';
import backgroundImage from './lbmin6.png'; 
import axios from "axios";
import { BASE_URL } from "baseUrl";
import { useNavigate } from 'react-router-dom';


function Customer() {
 const [users,setUsers]=useState([]);
 const navigate=useNavigate();
 useEffect(() => {
    
  axios.get(`${BASE_URL}/lab/allusers/`)
  .then((response) => {
    console.log(response);
    setUsers(response.data)
  });
}, [navigate]);
 


    
     
    
  
  

  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="content"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          padding: '65px 40px',
        }}
      >
        <Row>
          <Col xs={12}>
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '10px',margin:"15px" }}>
              <CardHeader className="text-center">
                <CardTitle tag="h2" style={{ fontSize: "40px", fontWeight: "bold" }}>OUR CUSTOMERS</CardTitle>
              </CardHeader>
              <CardBody style={{ margin: "40px" }}>
                <Table responsive style={{ backgroundColor: "transparent" }}>
                  <thead className="text-primary">
                    <tr>
                      <th style={{ backgroundColor: "transparent" }}><b>Customer Name</b></th>
                      <th style={{ backgroundColor: "transparent" }} className="text-left"><b>Phone</b></th>
                      <th style={{ backgroundColor: "transparent" }} className="text-center"><b>Address</b></th>
                      <th style={{ backgroundColor: "transparent" }} className="text-center"><b>District</b></th>
                      <th style={{ backgroundColor: "transparent" }} className="text-center"><b>Pin</b></th>
                    </tr>
                  </thead>
                  <tbody>
                  {users.map((user) => (
                      <tr key={user.id}>
                      <td style={{ backgroundColor: "transparent" }}><b>{user.name}</b></td>
                      <td style={{ backgroundColor: "transparent" }} className="text-left"><b>{user.contact}</b></td>
                      <td style={{ backgroundColor: "transparent", fontWeight: "bold"  }} className="text-center">
                       <div>{user.address}</div>
                      </td>
                      <td style={{ backgroundColor: "transparent" }} className="text-center">
                        <b>{user.city}</b>
                      </td>
                      <td style={{ backgroundColor: "transparent" }} className="text-center">
                        <b>{user.pincode}</b>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* <Modal show={show} onHide={handleClose}> */}
        <Modal.Header closeButton>
          <Modal.Title style={{ marginLeft: "140px", fontSize: "40px" }}>LAB DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content" style={{ marginTop: "40px" }}>
            <Container className="text-left">
              <Row>
                <Col md={{ span: 12, offset: 0 }}>
                  <Card>
                    <Card.Body className="labs">
                      {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
                        <Row className="mb-3">
                          <Form.Group style={{ marginTop: '10px' }} as={Col} controlId="validationCustom01">
                            <Form.Label style={{ color: "black", fontSize: "15px", fontWeight: 'bold' }}>LABNAME</Form.Label>
                          </Form.Group>
                          <Col md="8">
                            <Form.Control
                              style={{ height: "38px" }}
                              required
                              type="text"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group style={{ marginTop: '10px' }} as={Col} controlId="validationCustomPhone">
                            <Form.Label style={{ color: "black", fontSize: "15px", fontWeight: 'bold' }}> CONTACT</Form.Label>
                          </Form.Group>
                          <Col md="8">
                            <InputGroup hasValidation>
                              <Form.Control
                                style={{ height: "38px" }}
                                type="tel"
                                pattern="[0-9]{10}"
                                aria-describedby="inputGroupPrepend"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please enter a valid phone number.
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group style={{ marginTop: '10px' }} as={Col} controlId="validationCustomEmail">
                            <Form.Label style={{ color: "black", fontSize: "15px", fontWeight: 'bold' }}>EMAIL</Form.Label>
                          </Form.Group>
                          <Col md="8">
                            <InputGroup hasValidation>
                              <Form.Control
                                style={{ height: "38px" }}
                                type="email"
                                aria-describedby="inputGroupPrepend"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please enter a valid email address.
                              </Form.Control.Feedback>
                            </InputGroup>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group style={{ marginTop: '10px' }} as={Col} controlId="validationCustomLatitude">
                            <Form.Label style={{ color: "black", fontSize: "15px", fontWeight: 'bold' }}>LATITUDE</Form.Label>
                          </Form.Group>
                          <Col md="8">
                            <Form.Control
                              style={{ height: "38px" }}
                              type="text"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid latitude.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group style={{ marginTop: '10px' }} as={Col} controlId="validationCustomLongitude">
                            <Form.Label style={{ color: "black", fontSize: "15px", fontWeight: 'bold' }}>LONGITUDE</Form.Label>
                          </Form.Group>
                          <Col md="8">
                            <Form.Control
                              style={{ height: "38px" }}
                              type="text"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid longitude.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group style={{ marginTop: '10px' }} as={Col} controlId="validationCustom03">
                            <Form.Label style={{ color: "black", fontSize: "15px", fontWeight: 'bold' }}>ADDRESS</Form.Label>
                          </Form.Group>
                          <Col md="8">
                            <Form.Control
                              style={{ height: "38px" }}
                              type="text"
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid address.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                        <div style={{ marginTop: "10px", marginLeft: "250px" }}>
                          <Button style={{ height: "45px", width: "120px", fontSize: "20px", backgroundColor: "#1b8add", color: "#fff" }} type="submit">Save</Button>
                        </div>
                      {/* </Form> */}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </Modal.Body>
      {/* </Modal> */}
    </>
  );
}

export default Customer;
