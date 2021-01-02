import React, { Component, } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';

class TransactionList extends Component {

  constructor() {
    super();
    this.state = {
     list: [],
     showModal: false,
    };
  }

  render() {
    let list = null;
    const columns = [
      {
        dataField: 'id',
        hidden: true,
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'transactionDate',
        text: 'Date',
        sort: true,
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'category',
        text: 'Category',
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'description',
        text: 'Description',
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'transactionAmt',
        text: 'Amount',
        /*headerStyle: { width: 125, },*/
      },
      {
        dataField: 'property',
        text: 'Property',
        /*headerStyle: { width: 125, },*/
      },

    ];

    const defaultSorted = [
      {
        dataField: 'transactionDate',
        order: 'desc',
      },
    ];

    list = (
      <div>
        <BootstrapTable
          striped
          bootstrap4
          hover
          keyField='id'
          data={this.props.transactionList}
          columns={columns}
          defaultSorted={defaultSorted}
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
      </div>
    );
  }
}

export default  (TransactionList);