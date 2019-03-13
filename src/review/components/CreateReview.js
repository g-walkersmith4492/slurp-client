import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import { createReview } from '../api'
import messages from '../messages'

class CreateReview extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      ramen_type: '',
      price: '',
      rating: '',
      location: '',
      comments: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onCreateReview = event => {
    event.preventDefault()
    const { alert, user } = this.props

    createReview(this.state, user)
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => this.setState({ shouldRedirect: true }))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { name, price, rating, location, comments, shouldRedirect } = this.state
    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/show-reviews'
      }} />
    }

    return (
      <div className="create-page">
        <form className='create-review-form' onSubmit={this.onCreateReview}>
          <h3>Review Some Ramen!</h3>
          <div className="form-group">
            <label>Restaurant Name</label>
            <input
              required
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Type of Ramen</label>
            <input
              type="text"
              name="ramen_type"
              value={this.state.ramen_type}
              placeholder="Type of Ramen"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Price of your Bowl"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <input
              type="text"
              name="rating"
              value={rating}
              placeholder="Rating (1-10)"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Restaurant Location</label>
            <input
              type="text"
              name="location"
              value={location}
              placeholder="Address"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Review</label>
            <input
              type="text"
              name="comments"
              value={comments}
              placeholder="Talk about your bowl!"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button className="btn" type="submit">Submit your review!!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(CreateReview)
