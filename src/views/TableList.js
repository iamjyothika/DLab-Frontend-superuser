import React, { useEffect, useState } from 'react';
import { Button, Modal, Card, CardBody, CardHeader, CardTitle, Table, Row, Col, Container,Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import img from './lbmin6.png'
import axios from 'axios';
import { BASE_URL } from 'baseUrl';


// /lab/all-labfeedback/
function TableLists() {
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [labs, setLabs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/lab/labadd/`)
    
    .then((response) => {
      console.log('Fetched labs:', response.data); 
        setLabs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching labs:', error);
      });
  }, [navigate]);

  const handleButtonClick = () => {
    navigate('/icons', { state: { refresh: true } });
  };
  const handleDelete = (labId) => {
    
    if (window.confirm('Are you sure you want to delete this lab?')) {
      axios.delete(`${BASE_URL}/lab/labdelete/${labId}`)
        .then((response) => {
          console.log('Lab deleted:', response.data);
          
          setLabs(labs.filter(lab => lab.id !== labId));
        })
        .catch((error) => {
          console.error('Error deleting lab:', error);
        });
    }
  };
 

 
 

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
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '10px', padding: '20px', marginTop: "60px" }}>
            <CardHeader className="text-center" style={{ backgroundColor: 'transparent', borderBottom: 'none' }}>
              <Card.Title style={{ fontSize: "40px" }}><b>OUR LABS</b></Card.Title>
              <Button
                variant="info"
                onClick={handleButtonClick}
                style={{ position: "absolute", right: "45px", top: "75px", padding: "12px 12px" }}
              >
                + Add Lab
              </Button>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th style={{ backgroundColor: "transparent" }}>Lab Name</th>
                    <th style={{ backgroundColor: "transparent" }} className="text-left">Contact</th>
                    <th style={{ backgroundColor: "transparent" }} className="text-center">Email</th>
                    <th style={{ backgroundColor: "transparent" }} className="text-center">City</th>
                    <th style={{ backgroundColor: "transparent" }} className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {labs.length > 0 && labs.map((lab, index) => (
                    <tr key={index}>
                      <td style={{ backgroundColor: "transparent", fontWeight: "bold" }}>{lab.labname}</td>
                      <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} className="text-left">{lab.contact}</td>
                      <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} className="text-center">{lab.email}</td>
                      <td style={{ backgroundColor: "transparent", fontWeight: "bold" }} className="text-center">{lab.city}</td>
                      <td style={{ backgroundColor: "transparent", textAlign: 'center', padding: '0', position: 'relative' }}>
                        <div style={{ position: 'absolute', right: '25px', top: '30%' }}>
                          <Button
                            variant="primary"
                            onClick={() => handleDelete(lab.id)}
                            style={{ marginRight: '-12px', width: '95px', marginTop: '-10px', backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}
                          >
                            Delete
                          </Button>
                        </div>
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
  );
}

export default TableLists;