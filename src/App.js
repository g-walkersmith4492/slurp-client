import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import ShowReviews from './review/components/ShowReviews'
import ShowReview from './review/components/ShowReview'
import CreateReview from './review/components/CreateReview'
import EditReview from './review/components/EditReview'
import SearchRamen from './review/components/SearchRamen'
import Home from './review/components/Home'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type, fade: false }] })
    setTimeout(() => {
      this.setState(prevState => ({
        alerts: prevState.alerts.map(alert => ({
          message: alert.message,
          type: alert.type,
          fade: true
        }))
      }))
    }, 1000)
    setTimeout(() => {
      this.setState(prevState => ({ alerts: prevState.alerts.slice(1) }))
    }, 2000)
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert className={alert.fade ? 'fade-out' : ''}key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Home />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/show-reviews' render={() => (
            <ShowReviews alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/reviews/:id' render={({ match }) => (
            <ShowReview alert={this.alert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute user={user} path='/create-review' render={({ match }) => (
            <CreateReview alert={this.alert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute user={user} path='/review:id/edit' render={({ match }) => (
            <EditReview alert={this.alert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute user={user} path='/search-ramen' render={({ match }) => (
            <SearchRamen alert={this.alert} user={user} match={match}/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
