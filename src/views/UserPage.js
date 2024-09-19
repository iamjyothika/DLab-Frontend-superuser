import React, { useEffect, useState } from 'react';
import { Card, Button } from "react-bootstrap";
import img from './lbmin6.png'; 
import i1 from './doctor6.webp';
import i2 from './doctor5.webp';
import i3 from './doctor4.webp';
import axios from 'axios';
import { BASE_URL } from "baseUrl";


// /lab/allusers/

// /lab/alldoctors/

function UserPage() {
  const [doctors,setDoctors]=useState([]);
  const [labs, setLabs] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
 


  useEffect(() => {
      const fetchDoctors = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/lab/alldoctors/`);
            setDoctors(response.data);
          } catch (error) {
            console.error('Error fetching doctors:', error);
          }
        };
        const fetchLabs = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/user/all-labs/`);
            setLabs(response.data);
          } catch (error) {
            console.error('Error fetching labs:', error);
          }
        };
    
        fetchDoctors();
        fetchLabs();
      }, []);
    
      useEffect(() => {
        // Combine doctors with lab names
        const combined = doctors.map(doc => {
          // Find the lab corresponding to the doctor
          const lab = labs.find(lab => lab.id === doc.lab);
    
          return {
            ...doc,
            labname: lab ? lab.labname : 'Unknown Lab', // Add labname to the doctor
          };
        });
    
        setCombinedData(combined);
      }, [doctors, labs]);  


  




      return (
        <div style={styles.pageContainer}>
        <div style={styles.header}>
          <h1 style={styles.heading}>Discover Skilled Medical Professionals</h1>
          <p style={{ lineHeight: "42px", fontWeight: "bold" }}>
            Browse through our roster of experienced doctors and specialists.
          </p>
          <p style={{ fontSize: "45px" }}>Doctors List</p>
        </div>
        <div
          className="container"
          style={{
            marginTop: "60px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive grid
            gridGap: "20px", // Space between cards
            justifyContent: "center", // Center the cards
          }}
        >
          {combinedData.map((doctor, index) => (
            <Card key={index} style={styles.card}>
              <Card.Body>
                <div className="team-img" style={styles.imgContainer}>
                  <img
                    src={`${BASE_URL}/${doctor.doctorimage}`}
                    style={styles.doctorImage}
                    alt={doctor.doctorname}
                  />
                  <hr style={{ border: "1px solid black" }} />
                </div>
                <div className="team-info">
                  <h4 style={{ color: "green", marginTop: "5px" }}>
                    {doctor.doctorname}
                  </h4>
                  <h6 style={{ fontSize: "12px" }}>{doctor.qualification}</h6>
                  <h6>
                    {doctor.specialiazation}, {doctor.labname}
                  </h6>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  const styles = {
    pageContainer: {
      backgroundImage: `url(${img})`, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      padding: "20px",
    },
    header: {
      textAlign: "center",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: "20px",
      borderRadius: "10px",
      marginBottom: "20px",
    },
    heading: {
      margin: 0,
      fontSize: "2rem",
    },
    card: {
      width: "100%", // Make card responsive
      maxWidth: "300px", // Card's maximum size
      margin: "auto", // Center the card horizontally
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
    },
    imgContainer: {
      width: "100%",
      height: "200px", // Consistent height for all images
      overflow: "hidden",
      borderRadius: "10px 10px 0 0", // Rounded top corners
    },
    doctorImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover", // Ensure the image covers the container
    },
  };
export default UserPage;  