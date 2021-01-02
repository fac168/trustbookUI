import React, { Component, } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import firebase from '../firebase/index';
import TransactionAdd from './TransactionAdd';
import TransactionList from './TransactionList';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class AccountList extends Component {

  constructor() {
    super();
    this.state = {
     list: [],
     showModal: false,
     showTransaction: false,
     accountId: '',
     categoryList: [],
     propertyList: [],
     transactionList: [],
    };
  }

  componentDidMount() {
    const db = firebase.firestore();
    db.collection('accounts').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            const ownerLastName = data.ownerLastName;
            const ownerFirstName = data.ownerFirstName;
            this.setState({list: [...this.state.list, {id, ownerLastName, ownerFirstName}] });
        });
        this.setState({...this.state, accountId: this.state.list[0].id, showTransaction: true});
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    db.collection('category').get()
      .then((querySnapshot) => {
        let categoryListVar = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          categoryListVar.push(id);
        })
        this.setState({...this.state, categoryList: categoryListVar})
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

      db.collection('property').get()
      .then((querySnapshot) => {
        let propertyListVar = [];
        querySnapshot.forEach((doc) => {
          const id = doc.id;
          propertyListVar.push(id);
        })
        this.setState({...this.state, propertyList: propertyListVar})
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });

  }
  setActionButton (cell, row) {
    let icon = '';
    let title = '';
    var acctId = row.id;

      icon = faPencilAlt;
      title = 'View or Modify Fellowship';

    return (
      <button className='btn p-0' onClick={() => this.openModal(acctId)} >

        <dd title={title} > <FontAwesomeIcon icon={icon} /></dd>
      </button>
    );
  }
  fetchTransaction(accountId) {
    const db = firebase.firestore();
    let transactionList = [];
    db.collection('transaction')
      .where('accountName', '==', accountId)
      .orderBy('transactionDate', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            const transactionDate = data.transactionDate.toDate().toISOString().split('T')[0]
            const category = data.category;
            const description = data.description;
            const transactionAmount = data.transactionAmount;
            const property = data.property;
            transactionList.push({id, transactionDate, category, description, transactionAmount, property});
//            this.setState({transactionList: [...this.state.transactionList, {id, transactionDate, category, description, transactionAmount, property}] });
        });
      })
      .then(() => {
          this.setState({...this.state, accountId: accountId, showTransaction: true, transactionList: transactionList});
        })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  
  }
  handleAccountSelect(cell, row, rowIndex) {
    this.fetchTransaction(row.id);     
    this.setState({...this.state, accountId: row.id, showTransaction: true});
  }
  openModal(acctId) {
    this.setState({...this.state, showModal: true, accountId: acctId});

  }
  closeModal = () => {
    this.fetchTransaction(this.state.accountId);
    this.setState({...this.state, showModal: false });
  }
  render() {
    let list = null;
    let successMsg = this.state.successMsg;
    const columns = [
      {
        dataField: 'id',
        text: 'Account Name',
        sort: true,
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'ownerLastName',
        text: 'Owner Last Name',
        sort: true,
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'ownerFirstName',
        text: 'Owner First Name',
        sort: true,
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'action',
        text: 'Action',
        isDummyField: true,
        formatter: (cell, row) => this.setActionButton(cell, row),
        headerStyle: { width: 125, },
        align: 'center',
      },

    ];

    const defaultSorted = [
      {
        dataField: 'ownerLastName',
        order: 'asc',
      },
    ];

    const rowEvents = {
      onDoubleClick: (e, row, rowIndex) => {
        this.handleAccountSelect(e, row, rowIndex);
      },
    };

    list = (
      <div>
        <BootstrapTable
          striped
          bootstrap4
          hover
          keyField='id'
          data={this.state.list}
          columns={columns}
          defaultSorted={defaultSorted}
//          pagination={paginationFactory(pageOptions)}
//          noDataIndication={() => EMPTY_RESULTS_MSG}
          rowEvents={rowEvents}
        />
      </div>
    )
    const renderModal = (
      <TransactionAdd 
        showModal={this.state.showModal} 
        handleExit={this.closeModal} 
        accountId={this.state.accountId} 
        categoryList={this.state.categoryList} 
        propertyList={this.state.propertyList}
      />    
    )
    let renderTransaction = '';
    if (this.state.showTransaction) {
      renderTransaction = (
        <TransactionList transactionList={this.state.transactionList} />
      )
    } 
    return (
      <div>
        <div className='container-fluid'>
          {list}
        </div>
        <div className='lead'>
          {successMsg}
        </div>
        <div>
          {renderModal}
        </div>
        <div>
          {renderTransaction}
        </div>
      </div>
    );
  }
}

export default  (AccountList);