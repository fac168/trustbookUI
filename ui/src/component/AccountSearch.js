import React, { Component, } from 'react';

import {Form, FormGroup, Label, Input, } from 'reactstrap';
import firebase from '../firebase/index';

class AccountSearch extends Component {

  constructor() {
    super();
    this.state = {
     accountNo: '',
     ownerLastName: '',
     ownerFirstName: ''
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
    const userRef = db.collection('account').add({
      accountNo: this.state.accountNo,
      ownerFirstName: this.state.ownerFirstName,
      ownerLastname: this.state.ownerLastName,
    });  
  
    this.setState({
      accountNo: '',
      ownerLastName: '',
      ownerFirstName: ''
    });
  };
    render() {
        let searchForm = null;
        let results = null;
        searchForm = (
            <div>
                <Form onSubmit={this.addAccount} >
                    <FormGroup className='row my-3'>
                        <Label className = 'col-md-2' for="searchAccountNo">Account No:</Label>
                        <Input className='form-control col-md-2' type='text' name='accountNo' id='searchAccountNo' onChange={this.updateInput} 
                              value={this.state.accountNo} />
                    </FormGroup>
                    <FormGroup className='row my-3'>
                        <Label className = 'col-md-2' for="searchOwnerLastName">Last Name:</Label>
                        <Input className='form-control col-md-2' type='text' name='ownerLastName' id='searchOwnerLastName' onChange={this.updateInput}
                              value={this.state.ownerLastName} />
                    </FormGroup>
                    <FormGroup className='row my-3'>
                        <Label className = 'col-md-2' for="searchOwnerFirstName">Last Name:</Label>
                        <Input className='form-control col-md-2' type='text' name='ownerFirstName' id='searchOwnerFirstName' onChange={this.updateInput} 
                              value={this.state.ownerFirstName} />
                    </FormGroup>
                    <div className='col-md-4'>
                      <input type='submit' value='Search' color='primary' 
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
                {results}
              </div>
            </div>
         </div>
        );
    }
    

}

export default  (AccountSearch);