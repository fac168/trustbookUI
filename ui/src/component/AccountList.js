import React, { Component, } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import firebase from '../firebase/index';
import TransactionAdd from './TransactionAdd';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class AccountList extends Component {

  constructor() {
    super();
    this.state = {
     list: [],
     showModal: false,
     accountId: '',
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
  openModal(acctId) {
    this.setState({...this.state, showModal: true, accountId: acctId});

  }
  closeModal = () => {
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
        dataField: 'fullName',
        order: 'asc',
      },
      {
        dataField: 'majorDescShort',
        order: 'asc',
      },
    ];

    list = (
      <div>
        <BootstrapTable
          striped
          bootstrap4
          hover
          keyField='id'
          data={this.state.list}
          columns={columns}
//          defaultSorted={defaultSorted}
//          pagination={paginationFactory(pageOptions)}
//          noDataIndication={() => EMPTY_RESULTS_MSG}
//          rowEvents={rowEvents}
        />
      </div>
    )
    const renderModal = (
      <TransactionAdd showModal={this.state.showModal} handleExit={this.closeModal} accountId={this.state.accountId} transactionId={this.state.transactionId} />    
    )
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
      </div>
    );
  }
}

export default  (AccountList);