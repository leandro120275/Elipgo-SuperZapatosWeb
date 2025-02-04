import React, { Component, useState } from 'react';
//import "./App.css";
import axios from "axios";
//import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Row,
  Col
} from "reactstrap";

const url = "http://localhost:8282/services/stores"

export default class StoresManagement extends Component {

  //StoresManagement(){}

  state={
    data:[]
  }

  peticionGetStores=()=>{
    axios.get(url).then(response=>{
      console.log(response.data.PLURAL_MODEL_NAME);
      //const obj = JSON.parse(response.data);
      //console.log(obj.PLURAL_MODEL_NAME)
      this.setState({data: response.data.PLURAL_MODEL_NAME});
    })
  }

  componentDidMount() {
    this.peticionGetStores();
  }

  render() {
    
    return (
      <>
      <div><h1>Súper Zapatos Stores</h1></div>

      <Container>
        <br />
        <h2>Stores</h2>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
            </tr>
          </thead>

          <tbody>
            {this.state.data.map(store=>{
              return(
                <tr>
                <td>{store.id}</td>
                <td>{store.name}</td>
                <td>{store.address}</td>
                </tr>
              )
            })}            
          </tbody>
        </Table>
        
      </Container>
      </>
    );
  }
}

//export default StoresManagement;