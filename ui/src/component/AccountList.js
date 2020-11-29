import React, { Component, } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import firebase from '../firebase/index';

class AccountList extends Component {

  constructor() {
    super();
    this.state = {
     list: [],
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
          keyField='studentId'
          data={this.state.list}
          columns={columns}
//          defaultSorted={defaultSorted}
//          pagination={paginationFactory(pageOptions)}
//          noDataIndication={() => EMPTY_RESULTS_MSG}
//          rowEvents={rowEvents}
        />
      </div>
    )
        
    return (
      <div>
        <div className='container-fluid'>
          {list}
        </div>
        <div className='lead'>
          {successMsg}
        </div>
      </div>
    );
  }
}

export default  (AccountList);