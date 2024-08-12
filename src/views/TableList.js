import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, CardBody, CardHeader, CardTitle, Table, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import img from './lbmin6.png'
import axios from 'axios';
import { BASE_URL } from 'baseUrl';


function TableLists() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labs, setLabs] = useState([])

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/icons',{ state: { refresh: true } });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };




  const handleClose = () => setShow(false);
  const handleShow = (lab) => {
    setSelectedLab(lab);
    setShow(true);
  };

  // const [labs, setLabs] = useState([
  //   { name: "EvolveGen Labs", location: "Kannur", status: "Active", contact: "1234567890", email: "evolvegen@example.com", latitude: "11.8745", longitude: "75.3704", address: "123 Street, Kannur", username: "evolveuser", password: "evolvepass" },
  //   { name: "Hyatt Labs", location: "Kannur", status: "Active", contact: "1234567891", email: "hyatt@example.com", latitude: "11.8746", longitude: "75.3705", address: "124 Street, Kannur", username: "hyattuser", password: "hyattpass" },
  //   { name: "Neethi Diagnostics", location: "Kannur", status: "Active", contact: "1234567892", email: "neethi@example.com", latitude: "11.8747", longitude: "75.3706", address: "125 Street, Kannur", username: "neethiuser", password: "neethipass" },
  //   { name: "Med Labs", location: "Kannur", status: "Active", contact: "1234567893", email: "med@example.com", latitude: "11.8748", longitude: "75.3707", address: "126 Street, Kannur", username: "meduser", password: "medpass" },
  // ]);

  const toggleLabStatus = (index) => {
    setLabs(labs.length > 0 && labs.map((lab, i) =>
      i === index ? { ...lab, status: lab.status === "enable" ? "disable" : "enable" } : lab
    ));
  };
  
  useEffect(() => {
    
    axios.get(`${BASE_URL}/lab/labadd/`).then((response) => {
      console.log(response);
      setLabs(response.data)
    });
  }, [navigate]);
  

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Row className="justify-content-center" style={{ width: "1300px", marginLeft: "-170px" }}>
        <Col xs={12} md={10} lg={8}>
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '10px', padding: '20px', marginTop: "60px", }}>
            <CardHeader className="text-center" style={{ backgroundColor: 'transparent', borderBottom: 'none' }}>
              <CardTitle style={{ fontSize: "40px" }}><b>OUR LABS</b></CardTitle>
              <Button
                variant="info"
                onClick={handleButtonClick}
                style={{ position: "absolute", right: "45px", top: "75px", padding: "12px 12px" }}
              >
                + Add Lab
              </Button>
            </CardHeader>
            <CardBody>
              <Table responsive >
                <thead className="text-primary" >
                  <tr >
                    <th style={{ backgroundColor: "transparent" }}>Lab Name</th>
                    <th style={{ backgroundColor: "transparent" }} className="text-left">Contact</th>
                    <th style={{ backgroundColor: "transparent" }} className="text-center">Email</th>
                    <th style={{ backgroundColor: "transparent" }} className="text-center">City</th>
                  </tr>
                </thead>
                <tbody>
                  {labs.length > 0 && labs.map((lab, index) => (
                    <tr key={index}>
                      <td style={{ backgroundColor: "transparent", fontWeight: "bold" }}>{lab.labname}</td>
                      <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} className="text-left">{lab.contact}</td>
                      <td style={{ backgroundColor: "transparent",fontWeight:"bold" }} className="text-center">{lab.email}</td>
                      <td style={{ backgroundColor: "transparent",fontWeight:"bold" }} className="text-center">{lab.city}</td>

                       
                      
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "35px", marginLeft: "130px", fontWeight: "bold" }}>LAB DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLab && (
            <Container>
              <Card>
                <CardBody>
                  <Row className="mb-3">
                    <Col md={4}><strong>Lab Name:</strong></Col>
                    <Col md={8}>{selectedLab.labname}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}><strong>Contact:</strong></Col>
                    <Col md={8}>{selectedLab.contact}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}><strong>Email:</strong></Col>
                    <Col md={8}>{selectedLab.email}</Col>
                  </Row>
                  <Row className="mb-3">
                    <Col md={4}><strong>City:</strong></Col>
                    <Col md={8}>{selectedLab.cityt}</Col>
                  </Row>
                </CardBody>
              </Card>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="warning" onClick={() => navigate('/icons')} style={{ marginLeft: '12px' }}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TableLists;
