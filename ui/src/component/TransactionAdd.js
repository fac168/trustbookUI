import React, { Component, } from 'react';

import {Form, FormGroup, Label, Input, Modal, ModalHeader, Button} from 'reactstrap';
import firebase from '../firebase/index';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

class TransactionAdd extends Component {

  constructor() {
    super();
    this.state = {
     description: '',
     transactionDate: '',
     transactionAmt: 0.0,
     direction: '+',
     category: '',
     accountName: '',
     property: '',
     successMsg: '',
    };
  }
  componentDidMount() {
    let currentDate = new Date();
    this.setState({...this.state, transactionDate: currentDate});
    
  }
  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
      successMsg: '',
      exists: false,
    });
  }
  addTransaction = e => {
      e.preventDefault();
      const db = firebase.firestore();
      db.collection('transaction').add(
        {
          description: this.state.description,
          transactionDate: this.state.transactionDate,
          transactionAmt: this.state.transactionAmt,
          direction: this.state.direction,
          category: this.state.category,
          accountName: this.props.accountId,
          property: this.state.property,
        })
        .then((docRef) => {
          this.setState({...this.state, successMsg: 'Transaction: ' + docRef.id + ' successfully added.'});
          this.props.handleExit();
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
  handleTransactionDateChange(date) {
    if (date) {
      this.setState({...this.state, transactionDate: date});
    }
  }
  render() {
    let transactionForm = null;
    let successMsg = this.state.successMsg;
    
    transactionForm = (
      <div className='form'>
        <Modal isOpen={this.props.showModal} className='modal-lg' >
          <ModalHeader >Add New Transaction for account {this.props.accountId}</ModalHeader>
          <Form onSubmit={this.addTransaction} >
            <FormGroup className='row my-3'>
              <Label className = 'col-md-2' for="description">Description:</Label>
              <Input className='form-control col-md-2' 
                type='text' name='description' 
                id='description' 
                onChange={this.updateInput} 
                value={this.state.description} />
            </FormGroup>
            <FormGroup className='row my-3'>
              <Label className = 'col-md-2' for="transactionDate">Transaction Date:</Label>
              <DatePicker   
                name='transactionDate' 
                id='transactionDate' 
                selected={this.state.transactionDate}
                onChange={date => this.handleTransactionDateChange(date)} />
            </FormGroup>
            <FormGroup className='row my-3'>
              <Label className = 'col-md-2' for="accountId">Account Id:</Label>
              <Input className='form-control col-md-2' 
                type='text' 
                name='accountId' 
                id='accountId' 
                disabled
                value={this.props.accountId} />
            </FormGroup>
            <FormGroup className='row my-3'>
              <Label className = 'col-md-2' for="transactionAmt">Amount:</Label>
              <Input className='form-control col-md-2' 
                type='text' 
                name='transactionAmt' 
                id='transactionAmt' 
                value={this.state.transactionAmt}
                step='0.01'
                pattern="^\d*(\.\d{0,2})?$"
                onChange={this.updateInput}/>
            </FormGroup>
            <FormGroup className='row my-3'>
              <Label className = 'col-md-2' for="category">Category:</Label>
              <Input className='form-control col-md-2' 
                type='text' 
                name='category' 
                id='category' 
                value={this.state.category}
                onChange={this.updateInput}/>
            </FormGroup>
            <div className='col-md-4'>
              <input type='submit' 
                value='Add' 
                color='primary' 
                className='btn btn-primary col-md-4' />
              <Button className='btn col-md-8' color='danger' onClick={this.props.handleExit}>Exit without Save</Button>
            </div>

          </Form>
        </Modal>
      </div>
    )
        
    return (
      <div>
        <div className='container-fluid'>
          {transactionForm}
        </div>
        <div className='lead'>
          {successMsg}
        </div>
      </div>
    );
  }
}

export default  (TransactionAdd);