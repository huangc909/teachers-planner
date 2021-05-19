import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar expand="md">
    <Navbar.Brand href="#homepage">
      { user ? <h2> Teacher&apos;s Planner </h2> : <div></div> }
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.firstName}</span>}
        { user ? authenticatedOptions : <div></div> }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
