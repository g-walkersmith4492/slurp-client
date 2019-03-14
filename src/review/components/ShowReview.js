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

    return (
      <div className="review-display">
        <h2 className="review-title">{review.name}</h2>
        <h4><label>Type:</label>           {review.ramen_type}</h4>
        <h4><label>Price:</label>          {review.price}</h4>
        <h4><label>Rating:</label>         {review.rating}</h4>
        <h4><label>Location:</label>       {review.location}</h4>
        <h4><label>Comments:</label>       {review.comments}</h4>
        <Link to={`/review${review.id}/edit`}>
          <button>Edit Your Review</button>
        </Link>
        <button className="btn" onClick={() => this.deleteRev(review.id)}>X</button>
      </div>
    )
  }
}

export default ShowReview
