import React from "react";
import axios from "axios";

import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const url = "http://localhost:8282/services/stores"

class App extends React.Component {

  state={
    data:[],
    modalInsertar: false,
    form:{
      id: '', 
      name: '',
      address: ''
    }
  }

  peticionGetStores=()=>{
    axios.get(url).then(response=>{
      console.log(response.data.PLURAL_MODEL_NAME);
      this.setState({data: response.data.PLURAL_MODEL_NAME});
    }).catch(error=>{
      console.log(error.message);
    })
  }

  peticionPost=async()=>{
    // For autoincremental id on the database remove id from the form.
    //delete this.state.form.id;

    //await axios.post(url,this.state.form, {headers})
    await axios({
      // Endpoint to send files
      url: url,
      method: "POST",
      headers: {
          // Add any auth token here
          'Content-Type': 'application/json',
          'api_key': 'SecretKey'
      },
      // Attaching the form data
      data: this.state.form,
    }).then(response=>{
        this.modalInsertar();
        this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
    }

  componentDidMount() {
    this.peticionGetStores();
  }

  render() {
    const {form}=this.state;

    return (      
      <>
      <div><h1>Súper Zapatos</h1></div>

      <Container>
        <br />
        <h2>Stores</h2>
        <Button className="success" onClick={()=>{this.modalInsertar()}}>Add Store</Button>
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
                <td>
                  <Button color="primary">Editar</Button>{" "}
                  <Button color="danger">Eliminar</Button>{" "}
                  <Button color="success">Go to Store</Button>
                </td>                  
                </tr>
              )
            })}            
          </tbody>
        </Table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="id">Id</label>
              <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={this.state.data.length+1}/>
              <br />
              <label htmlFor="nombre">Name</label>
              <input className="form-control" type="text" name="name" id="name" onChange={this.handleChange} value={form.name}/>
              <br />
              <label htmlFor="nombre">Address</label>
              <input className="form-control" type="text" name="address" id="address" onChange={this.handleChange} value={form.address}/>
            </div>
          </ModalBody>

          <ModalFooter>
            <button className="btn btn-success" onClick={()=>this.peticionPost()}>Insertar</button>
            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        
      </Container>
      </>
    );
  }
}

export default App;