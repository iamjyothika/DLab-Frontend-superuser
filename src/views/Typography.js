import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Card, CardBody, CardHeader, CardTitle, Row, Col } from "reactstrap";
import backgroundImage from './lbmin6.png'; 
import { BASE_URL } from 'baseUrl';
import axios from 'axios';

function Typography() {
  const [feedback, setFeedback] = useState([]);
  const [reviews, setReviews] = useState([]);


  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/lab/all-labfeedback/`);
      const fetchedFeedback = response.data;
      console.log('Api response',response.data);
   
      
      const feedbackWithLabAndUserEmails = await Promise.all(
        fetchedFeedback.map(async (feedbackItem) => {
          try {
            // Fetch lab name
            const labResponse = await axios.get(`${BASE_URL}/user/lab-detail/${feedbackItem.lab}/`);
            const labName = labResponse.data.labname;
  
            // Fetch user email
            const userResponse = await axios.get(`${BASE_URL}/user/userdata/${feedbackItem.user}/`);
            const userEmail = userResponse.data.email;
            console.log('User Response',userResponse.data)
  
            return {
              ...feedbackItem,
              labname: labName || 'Unknown Lab',
              email: userEmail || 'Unknown Email', // Add the email here
            };
          } catch (error) {
            console.error('Error fetching lab/user details:', error);
            return {
              ...feedbackItem,
              labname: 'Unknown Lab',
              email: 'Unknown Email', // Fallback if email not found
            };
          }
        })
      );
  
      setFeedback(feedbackWithLabAndUserEmails);
      console.log('Updated Feedback Array:', feedbackWithLabAndUserEmails); // Log the updated feedback
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  // Trigger fetching data on component mount
  useEffect(() => {
    fetchFeedback();
  }, []);

  // Log feedback when it updates
  useEffect(() => {
    console.log('Feedback Array:', feedback);
  }, [feedback]);


  

      

  
  return (
    <>
      <div
        className="content"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          padding: '40px',
        }}
      >
        <Row>
          <Col xs={12}>
            <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '10px',margin:"30px",marginLeft:"3px" }}>
              <CardHeader>
                <CardTitle tag="h2" className="text-center" style={{ fontSize: "40px", fontWeight: "bold" }}>
                  FEEDBACKS
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th style={{ width: '25%',backgroundColor:"transparent" }}>
                        <div style={{ border: '1px', padding: '5px' }}><b>PATIENT NAME</b></div>
                      </th>
                      <th style={{ width: '25%',backgroundColor:"transparent"  }}><b>LAB NAME</b></th>
                      <th style={{ width: '25%',backgroundColor:"transparent"  }}><b>DATE</b></th>
                      <th style={{ width: '25%',backgroundColor:"transparent"  }}><b>FEEDBACK</b></th>
                    </tr>
                  </thead>
                  <tbody>
                  {feedback.map((item) => (
                      <tr key={item.id}>
                      <td style={{backgroundColor:"transparent",fontWeight:"bold" }}>{item.email}</td>
                      <td style={{backgroundColor:"transparent",fontWeight:"bold" }}>{item.labname}</td>
                      <td style={{backgroundColor:"transparent",fontWeight:"bold" }}>{item.created_at.split('T')[0]}</td>
                      <td style={{backgroundColor:"transparent",fontWeight:"bold" }}>{item.description}</td>
                    </tr>
                     ))}
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Typography;
