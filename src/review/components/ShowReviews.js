import React, { Component, Fragment } from 'react'
import { showReviews } from '../api.js'
import messages from '../messages'
import { Link } from 'react-router-dom'

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
        <h3 className="review-title">List of Ramen Reviews:</h3>
        <ul>
          {this.state.reviews.map(review => (
            <p className="review-list" key={review.id}>
              <Link className="review-link" to={`/reviews/${review.id}`}>{review.name} <img className="list-image"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07fXt5MEji22iI73CTiy-L-8dwjOhj2qdDXiUHm1OLpHjNb-1gA" alt="ramen-bowl"/></Link>
            </p>
          ))}
        </ul>
      </Fragment>
    )
  }
}

export default ShowReviews
