import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

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
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { name, price, rating, location, comments } = this.state

    return (
      <form className='create-review-form' onSubmit={this.onCreateReview}>
        <h3>Review Some Ramen!</h3>
        <label>Restaurant Name</label>
        <input
          required
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={this.handleChange}
        />
        <label>Type of Ramen</label>
        <input
          type="text"
          name="ramen_type"
          value={this.state.ramen_type}
          placeholder="Type of Ramen"
          onChange={this.handleChange}
        />
        <label>Price</label>
        <input
          type="text"
          name="price"
          value={price}
          placeholder="Price of your Bowl"
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="rating"
          value={rating}
          placeholder="Rating (1-10)"
          onChange={this.handleChange}
        />
        <label>Restaurant Location</label>
        <input
          type="text"
          name="location"
          value={location}
          placeholder="Address"
          onChange={this.handleChange}
        />
        <label>Review</label>
        <input
          type="text"
          name="comments"
          value={comments}
          placeholder="Talk about your bowl!"
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">Submit your review!!</button>
      </form>
    )
  }
}

export default withRouter(CreateReview)
