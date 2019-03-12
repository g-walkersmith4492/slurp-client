import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import messages from '../messages'
import { editReview, showReview } from '../api'
import { Redirect } from 'react-router'

class EditReview extends Component {
  constructor () {
    super()

    this.state = {
      review: {
      }
    }
  }
  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState({ review: { ...this.state.review, ...updatedField } })
  }

  componentDidMount () {
    showReview(this.props.match.params.id)
      .then(response => this.setState({ review: response.data.review }))
  }

  onEditReview = event => {
    event.preventDefault()
    const { alert, user } = this.props
    editReview(this.state, user, this.props.match.params.id)
      .then(() => this.setState({ shouldRedirect: true }))
      .then(() => alert(messages.signInSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.signInFailure, 'danger')
      })
  }
  render () {
    const { name, price, rating, location, comments } = this.state.review
    const { shouldRedirect } = this.state
    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/show-reviews'
      }} />
    }
    return (
      <form className='edit-review-form' onSubmit={this.onEditReview}>
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
        <button className="btn" type="submit">Save Changes!</button>
      </form>
    )
  }
}

export default withRouter(EditReview)
