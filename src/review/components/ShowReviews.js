import React, { Component, Fragment } from 'react'
import { showReviews } from '../api.js'
import messages from '../messages'

class ShowReviews extends Component {
  constructor () {
    super()
    this.state = {
      event: null,
      reviews: null
    }
  }

  componentDidMount () {
    const { alert } = this.props
    showReviews()
      .then(response => this.setState({ reviews: response.data.reviews }))
      .then(response => console.log(this.state.reviews))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    if (!this.state.reviews) {
      return <p>loading...</p>
    }
    return (

      <Fragment>
        <h3>Ramen Reviews:</h3>
        <ul>
          {this.state.reviews.map(review => (
            <p key={review.id}>
              {review.ramen_type} {review.price} {review.rating} {review.location} {review.comments}
            </p>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default ShowReviews
