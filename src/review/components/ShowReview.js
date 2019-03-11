import React, { Component } from 'react'
import { Redirect } from 'react-router'
import messages from '../messages'
import { showReview, deleteReview } from '../api.js'
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
    console.log(this.props)
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
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    console.log(this.state)
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
      <article>
        <h4>{review.name}</h4>
        <p>Location: {review.location}</p>
        <p>Price: {review.price}</p>
        <p>ABV: {review.comments}</p>
        <button className="btn" onClick={() => this.deleteRev(review.id)}>X</button>
      </article>
    )
  }
}

export default ShowReview
