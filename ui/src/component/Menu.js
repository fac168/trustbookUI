
import React, { Component, } from 'react';
import { NavLink, } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem, } from 'reactstrap';


class Menu extends Component {
  constructor () {
    super();
    this.changeTab = this.changeTab.bind(this);
    this.state = {
      activeTab: '1',
    }
  }

  changeTab (tab) {
    this.setState({activeTab: tab});
  }

  render () {
    return (
      <div>
        <Navbar expand='md' className='main-nav'>
          <Nav className='mr-auto'>
            <NavItem>
              <NavLink to='/' activeClassName='main-nav-active'
                className="col-md-2 main-nav-item {this.state.activeTab === '1' ? 'active' : ''}"
                onClick={() => this.changeTab('1')}>Account List</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/add' activeClassName='main-nav-active'
                className="col-md-2 main-nav-item {this.state.activeTab === '2' ? 'active' : ''}"
                onClick={() => this.changeTab('2')}>Add</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}


export default (Menu);
