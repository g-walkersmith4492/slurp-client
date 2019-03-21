import React, { Component } from 'react'
import { Redirect } from 'react-router'
import messages from '../messages'
import { showReview, deleteReview } from '../api.js'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'

class ShowReview extends Component {
  constructor () {
    super()

    this.state = {
      review: null,
      shouldRedirect: false
    }
  }

  componentDidMount () {
    const { alert } = this.props
    showReview(this.props.match.params.id)
      .then(response => this.setState({ review: response.data.review }))
      .then(() => console.log(this.state.review))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  deleteRev (id) {
    const { alert, user } = this.props
    deleteReview(user, id)
      .then(() => this.setState({ shouldRedirect: true }))
      .then(() => alert(messages.deleteReviewSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.deleteReviewFailure, 'danger')
      })
  }

  render () {
    const { review, shouldRedirect } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/show-reviews'
      }} />
    }
    if (!review) {
      return <p>loading.... </p>
    }
    if (review.user_id === this.props.user.id) {
      console.log(this.props.user.id)
      return (
        <div className="review-display">
          <div className="review-container">
            <h2 className="review-title">{review.name}</h2>
            <h4><label>Type:</label>           {review.ramen_type}</h4>
            <h4><label>Price:</label>          {review.price}</h4>
            <h4><label>Rating:</label>         {review.rating}</h4>
            <h4><label>Location:</label>       {review.location}</h4>
            <p className="comments-paragraph"><label>Comments:</label>       {review.comments}</p>
            <Link to={`/review${review.id}/edit`}>
              <button className="btn review-button">Edit Review</button>
            </Link>
            <button className="btn review-button" onClick={() => this.deleteRev(review.id)}>Delete Review</button>
          </div>
          <img className="spicy-ramen" src="https://i.imgur.com/XtB0WP2.png" alt="spicy-ramen" />
        </div>
      )
    } else {
      return (
        <div className="review-display">
          <div className="review-container">
            <h2 className="review-title">{review.name}</h2>
            <h4><label>Type:</label>           {review.ramen_type}</h4>
            <h4><label>Price:</label>          {review.price}</h4>
            <h4><label>Rating:</label>         {review.rating}</h4>
            <h4><label>Location:</label>       {review.location}</h4>
            <p className="comments-paragraph"><label>Comments:</label>{review.comments}</p>
          </div>
          <img className="spicy-ramen" src="https://i.imgur.com/XtB0WP2.png" alt="spicy-ramen" />
        </div>
      )
    }
  }
}
export default ShowReview
