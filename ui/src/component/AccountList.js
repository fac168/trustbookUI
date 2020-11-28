import React, { Component, } from 'react';

import {Form, FormGroup, Label, Input, } from 'reactstrap';
import firebase from '../firebase/index';

class AccountList extends Component {

  constructor() {
    super();
    this.state = {
     accountName: '',
     ownerLastName: '',
     ownerFirstName: '',
     successMsg: '',
     exists: false,
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      successMsg: '',
      exists: false,
    });
  }

  addAccount = db => {
   
      db.collection('accounts').doc(this.state.accountName)
        .set({
          ownerFirstName: this.state.ownerFirstName,
          ownerLastname: this.state.ownerLastName,
        })
        .then(() => {
          this.setState({
            ...this.state,
            successMsg: 'Account: ' + this.state.accountName + ' successfully added.'
          });
        });   


  };

  accountExist = e => {
    e.preventDefault();
    const db = firebase.firestore();
    var docRef = db.collection('accounts').doc(this.state.accountName);

    docRef.get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            ...this.state,
            successMsg: 'Account Name : ' + this.state.accountName + ' already exists, choose a different name',
            exists: true
          });
        } else {
          this.addAccount(db);
        } 
      })
      .catch(error => {
        console.log("Error getting document:", error);
      }); 
  }

  render() {
    let searchForm = null;
    let successMsg = this.state.successMsg;
    searchForm = (
      <div>
        <Form onSubmit={this.accountExist} >
          <FormGroup className='row my-3'>
            <Label className = 'col-md-2' for="accountName">Account Name:</Label>
            <Input className='form-control col-md-2' 
              type='text' name='accountName' 
              id='accountName' 
              onChange={this.updateInput} 
              value={this.state.accountName} />
          </FormGroup>
          <FormGroup className='row my-3'>
            <Label className = 'col-md-2' for="ownerLastName">Last Name:</Label>
            <Input className='form-control col-md-2' 
              type='text' 
              name='ownerLastName' 
              id='ownerLastName' 
              onChange={this.updateInput}
              value={this.state.ownerLastName} />
          </FormGroup>
          <FormGroup className='row my-3'>
            <Label className = 'col-md-2' for="ownerFirstName">First Name:</Label>
            <Input className='form-control col-md-2' 
              type='text' 
              name='ownerFirstName' 
              id='ownerFirstName' 
              onChange={this.updateInput} 
              value={this.state.ownerFirstName} />
          </FormGroup>
          <div className='col-md-4'>
            <input type='submit' 
              value='Add' 
              color='primary' 
              className='btn btn-primary col-md-2' />
          </div>

        </Form>
      </div>
    )
        
    return (
      <div>
        <div className='container-fluid'>
          {searchForm}
        </div>
        <div className='lead'>
          {successMsg}
        </div>
      </div>
    );
  }
}

export default  (AccountList);