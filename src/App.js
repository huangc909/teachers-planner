import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

import LandingPage from './components/routes/LandingPage'
import HomePage from './components/routes/HomePage'

import SchoolYearCreate from './components/routes/SchoolYearCreate'
import MonthsCreate from './components/routes/MonthsCreate'

import SchoolYear from './components/routes/SchoolYear'
import Months from './components/routes/Months'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <Route path='/' exact render={() => (
            <LandingPage />
          )} />
          <AuthenticatedRoute user={user} exact path='/home-page' render={() => (
            <HomePage msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/schoolyear-create' render={(props) => (
            <SchoolYearCreate msgAlert={this.msgAlert} user={user} {...props}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/months-create' render={(props) => (
            <MonthsCreate msgAlert={this.msgAlert} user={user} {...props}/>
          )} />

          <AuthenticatedRoute user={user} exact path='/schoolyears/:schoolYearId' render={(props) => (
            <SchoolYear msgAlert={this.msgAlert} user={user} {...props}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/months' render={(props) => (
            <Months msgAlert={this.msgAlert} user={user} {...props}/>
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
