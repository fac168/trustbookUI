import React, { Component, } from 'react';

import {Form, FormGroup, Label, Input, } from 'reactstrap';
import firebase from '../firebase/index';

class AccountAdd extends Component {

  constructor() {
    super();
    this.state = {
     accountName: '',
     ownerLastName: '',
     ownerFirstName: '',
     successMsg: '',
    };
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addAccount = e => {
    e.preventDefault();
    const db = firebase.firestore();
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
    render() {
        let searchForm = null;
        let successMsg = this.state.successMsg;
        searchForm = (
            <div>
                <Form onSubmit={this.addAccount} >
                    <FormGroup className='row my-3'>
                        <Label className = 'col-md-2' for="accountName">Account No:</Label>
                        <Input className='form-control col-md-2' type='text' name='accountName' id='accountName' onChange={this.updateInput} 
                              value={this.state.accountName} />
                    </FormGroup>
                    <FormGroup className='row my-3'>
                        <Label className = 'col-md-2' for="ownerLastName">Last Name:</Label>
                        <Input className='form-control col-md-2' type='text' name='ownerLastName' id='ownerLastName' onChange={this.updateInput}
                              value={this.state.ownerLastName} />
                    </FormGroup>
                    <FormGroup className='row my-3'>
                        <Label className = 'col-md-2' for="ownerFirstName">First Name:</Label>
                        <Input className='form-control col-md-2' type='text' name='ownerFirstName' id='ownerFirstName' onChange={this.updateInput} 
                              value={this.state.ownerFirstName} />
                    </FormGroup>
                    <div className='col-md-4'>
                      <input type='submit' value='Add' color='primary' 
                          className='btn btn-primary col-md-2'
                      />
                    </div>

                </Form>
            </div>

        )
        
        return (
          <div>
            <div>
              <div className='container-fluid'>
                <div>
                  {searchForm}
                </div>
                <div className='lead'>
                  {successMsg}
                </div>
              </div>
            </div>
         </div>
        );
    }
    

}

export default  (AccountAdd);