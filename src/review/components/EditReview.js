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
      .then(() => alert(messages.editReviewSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.editReviewFailure, 'danger')
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
      <div className="edit-page">
        <form className='edit-review-form' onSubmit={this.onEditReview}>
          <img className="ramen-cat" src="https://media.tenor.com/images/e9885839feb47ef98342a16b6924989e/tenor.gif" alt="cat ramen"/>
          <h3 className="create-title">Review Some Ramen!</h3>
          <div className="form-group">
            <label className="first-label">Restaurant Name</label>
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
          <label>Type of Ramen</label>
          <div className="form-group">
            <input
              type="text"
              name="ramen_type"
              value={this.state.ramen_type}
              placeholder="Type of Ramen"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <label>Price</label>
          <div className="form-group">
            <input
              type="text"
              name="price"
              value={price}
              placeholder="Price of your Bowl"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <label>Rating</label>
          <div className="form-group">
            <input
              type="text"
              name="rating"
              value={rating}
              placeholder="Rating (1-10)"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <label>Restaurant Location</label>
          <div className="form-group">
            <input
              type="text"
              name="location"
              value={location}
              placeholder="Address"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <label>Review</label>
          <div className="form-group">
            <textarea
              rows="7"
              type="text"
              name="comments"
              value={comments}
              onChange={this.handleChange}
              className="form-control review-input"
            />
          </div>
          <button className="btn create-button" type="submit">Save Changes!</button>
        </form>
      </div>
    )
  }
}

export default withRouter(EditReview)
