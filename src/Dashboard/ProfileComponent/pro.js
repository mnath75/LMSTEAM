import React, { Component,useState } from "react";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Select, MenuItem, FormControl, InputLabel,Avatar,Paper } from "@mui/material";
import ResponsiveDatePickers from '../ProfileComponent/datePicker.js';
import FormLabel from "@mui/material/FormLabel";
import "../ProfileComponent/Profile.css";
import ImageUpload from '../ProfileComponent/uploadImage.js';
import {crud} from "../../services/crud";
import { useParams } from "react-router-dom";

class Profile extends Component {
   
  constructor(props){
      super(props)
      this.state = {
        Pincode:'',
        PostOffice: [],
        city: '',
        district: '',
        stata: '',
        ProfileData:[],
        name:'',
        phone:'',
        nData:''
      };
      }
    
      componentDidMountData(data) {
       
        const url=crud.retrieve('/userprofile/')
        fetch(url).then(resp => resp.json())
        .then(resp => 
            {
            console.warn(resp);
            })
          


         if(this.state.Pincode.length==6){
          const url = `https://api.postalpincode.in/pincode/${this.state.Pincode}`
          fetch(url).then(resp => resp.json())
          .then(resp => 
            {
            this.setState({PostOffice: resp[0]})
            console.log("Hello",resp[0])
            this.setState({
              city: resp[0].PostOffice[0].District,
              district: resp[0].PostOffice[0].District,
              stata: resp[0].PostOffice[0].State
            })
          })
          
      }
          }
    
    
          
      getPin= (event) => {
        this.setState({Pincode: event.target.value}, 
          () => {
            console.log("Pincode:", this.state.Pincode)
            this.componentDidMountData(this.state.Pincode)
                 }
        
        )}
  
      
  
         
  
  
    
    render() {
      console.log("ggg", this.state.name)
     
      return (
        <>
        <Form>
          <Container className="font-weight-bold p-5 paper">
           
            <Row className='py-5'>
             <Col></Col> <Col><br/><div className="px-5 py-2 center">
                
                <ImageUpload required /></div></Col><Col></Col><br />
            </Row>
  
            <Row className="mb-4">
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="email">
                  <Form.Label>Email:<span className="requiredField"></span></Form.Label>
                  <Form.Control type="email" required/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="phone">
                  <Form.Label>Phone Number:<span className="requiredField"></span></Form.Label>
                  <Form.Control type="number" required/>
                </Form.Group>
              </Col>
            </Row>
  
            <Row className="mb-2">
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="fullName">
                  <Form.Label>Full Name:<span className="requiredField"></span></Form.Label>
                  <Form.Control type="text" name="name" id="name"  required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="address">
                  <Form.Label>Address:<span className="requiredField"></span></Form.Label>
                  <Form.Control type="text" name="address" required/>
                </Form.Group>
              </Col>
            </Row>
  
           
  
           
  
            <Row className="mb-2">
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="pincode">
                  <Form.Label>Pin Code:<span className="requiredField"></span></Form.Label>
               <Form.Control  maxLength="6" type="number" name="Pincode" id='Pincode'  onChange={this.getPin} required  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="city">
                  <Form.Label>City:<span className="requiredField"></span></Form.Label>
                  <Form.Control    type="text" value={this.state.city} id='city' required/>
                </Form.Group>
              </Col>
             
            </Row>
  
            <Row className="mb-2">
  
            <Col>
                <Form.Group className="mb-3 mx-3" controlId="district">
                  <Form.Label>District:<span className="requiredField"></span></Form.Label>
                  <Form.Control type="text" value={this.state.district}  id='dist' required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="state">
                  <Form.Label>State:<span className="requiredField"></span></Form.Label>
                  <Form.Control type="text" value={this.state.stata}  id="state" required />
                </Form.Group>
              </Col>
             
            </Row>
  
            <Row className="mb-2">
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="DOB">
                  <Form.Label>Date of Birth:<span className="requiredField"></span></Form.Label>
                  <ResponsiveDatePickers  required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="Gender">
                  <FormControl>
                    <FormLabel>Gender<span className="requiredField"></span></FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                    </RadioGroup>
                  </FormControl>
                </Form.Group>
              </Col>
            </Row>
  
  
            <Row className="mb-2">
              <Col>
                <Form.Group className="mb-3 mx-3" controlId="qualification">
                  <Form.Label>Qualification:<span className="requiredField"></span></Form.Label>
                  <Form.Control type="text" name="qualification" required/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3 mx-5 my-4 pt-2" controlId="submit">
                  <Button variant="primary" size="md" active>
      Submit
    </Button>{' '}
                </Form.Group>
              </Col>
            </Row>
           
          </Container>
          </Form>
        </>
      );
    }
  }
  
export default Profile;
