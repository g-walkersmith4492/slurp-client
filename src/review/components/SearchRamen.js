import React, { Component, Fragment } from 'react'
import { searchRamen, searchByRating, searchByPrice } from '../api'
import messages from '../messages'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

class SearchRamen extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      ramens: '',
      priceNumber: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSetValue = (num) => {
    this.setState({ priceNumber: num })
  }
  onSearchRamen = event => {
    event.preventDefault()

    const { alert, user } = this.props

    searchRamen(this.state.search, user)
      .then(response => this.setState({ ramens: response.data.businesses, search: '' }))
      .then(() => {
        if (!this.state.ramens || this.state.ramens.length === 0) {
          alert(messages.searchRamenFailure, 'danger')
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.searchRamenFailure, 'danger')
      })
  }

  onSearchByRating = event => {
    event.preventDefault()
    const { alert, user } = this.props
    const specs = 'rating'
    searchByRating(this.state.search, user, specs)
      .then(response => this.setState({ ramens: response.data.businesses, search: '' }))
      .then(() => {
        if (!this.state.ramens || this.state.ramens.length === 0) {
          alert(messages.searchRamenFailure, 'danger')
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.searchRamenFailure, 'danger')
      })
  }

  onSearchByPrice1 = event => {
    event.preventDefault()
    const priceNum = '1'
    const { alert, user } = this.props
    searchByPrice(this.state.search, user, priceNum)
      .then(response => this.setState({ ramens: response.data.businesses, search: '' }))
      .then(() => {
        if (!this.state.ramens || this.state.ramens.length === 0) {
          alert(messages.searchRamenFailure, 'danger')
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.searchRamenFailure, 'danger')
      })
  }

  onSearchByPrice2 = event => {
    event.preventDefault()
    const priceNum = '2'
    const { alert, user } = this.props
    searchByPrice(this.state.search, user, priceNum)
      .then(response => this.setState({ ramens: response.data.businesses, search: '' }))
      .then(() => {
        if (!this.state.ramens || this.state.ramens.length === 0) {
          alert(messages.searchRamenFailure, 'danger')
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.searchRamenFailure, 'danger')
      })
  }

  onSearchByPrice3 = event => {
    const priceNum = '3'
    event.preventDefault()
    const { alert, user } = this.props
    searchByPrice(this.state.search, user, priceNum)
      .then(response => this.setState({ ramens: response.data.businesses, search: '' }))
      .then(() => {
        if (!this.state.ramens || this.state.ramens.length === 0) {
          alert(messages.searchRamenFailure, 'danger')
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.searchRamenFailure, 'danger')
      })
  }

  onSearchByPrice4 = event => {
    const priceNum = '4'
    event.preventDefault()
    const { alert, user } = this.props
    searchByPrice(this.state.search, user, priceNum)
      .then(response => this.setState({ ramens: response.data.businesses, search: '' }))
      .then(() => {
        if (!this.state.ramens || this.state.ramens.length === 0) {
          alert(messages.searchRamenFailure, 'danger')
        }
      })
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.searchRamenFailure, 'danger')
      })
  }

  render () {
    if (!this.state.ramens || this.state.ramens.length < 1) {
      return (
        <div>
          <form className='search-ramen-form' onSubmit={this.onSearchRamen}>
            <h3 className="yelp-header-main">Find New Ramen Spots!</h3>
            <input
              className="search-input"
              required
              type="text"
              name="search"
              value={this.state.search}
              placeholder="location"
              onChange={this.handleChange}
            />
            <section className="search-buttons">
              <button className="btn search-button" type="submit">Best Match</button>
              <button className="btn search-button search-by-rating-button" onClick={this.onSearchByRating}type="button">Search By Rating</button>
              <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice1} type="button">$</button>
              <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice2} type="button">$$</button>
              <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice3} type="button">$$$</button>
              <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice4} type="button">$$$$</button>
            </section>
          </form>
          <Fragment>
          </Fragment>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://grapee.jp/en/wp-content/uploads/14531_01.jpg"
                alt="First slide"
              />
              <Carousel.Caption className="carousel-text">
                <h3>Nakiryu</h3>
                <p>Tokyo, Japan</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://www.hiddenboston.com/images/Ganko.jpg"
                alt="Third slide"
              />

              <Carousel.Caption className="carousel-text">
                <h3>Ganko Ittetsu</h3>
                <p>Brookline, MA</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="https://static1.squarespace.com/static/574a312720c6471e63ec3849/58c368fb9f7456bf7d73309f/58c368fbcd0f68690ff095a0/1489201409149/OKONOMI+exterior.jpg?format=500w"
                alt="Third slide"
              />

              <Carousel.Caption className="carousel-text">
                <h3>Yuji Ramen</h3>
                <p>Brooklyn, New York</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carousel-image"
                src="http://www.tsuta.com/images/welcome/welcome_image03.jpg"
                alt="Third slide"
              />

              <Carousel.Caption className="carousel-text">
                <h4>Tsuta Ramen</h4>
                <p>Tokyo, Japan</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      )
    }

    return (
      <div className="search-page">
        <form className='search-ramen-form' onSubmit={this.onSearchRamen}>
          <h3 className="yelp-header-main">Find New Ramen Spots!</h3>
          <input
            required
            className="search-input"
            type="text"
            name="search"
            value={this.state.search}
            placeholder="location"
            onChange={this.handleChange}
          />
          <section className="search-buttons">
            <button className="btn search-button" type="submit">Best Match</button>
            <button className="btn search-button search-by-rating-button" onClick={this.onSearchByRating} type="button">Search by Rating</button>
            <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice1} type="button">$</button>
            <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice2} type="button">$$</button>
            <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice3} type="button">$$$</button>
            <button className="btn search-button search-by-price-button" onClick={this.onSearchByPrice4} type="button">$$$$</button>
          </section>
          {this.state.ramens.map(ramen => (
            <Card key={ ramen.alias }>
              <Card.Img className="yelp-image"variant="top" src={ramen.image_url} />
              <Card.Body>
                <Card.Title>{ramen.name}</Card.Title>
                <Card.Text>
                  {ramen.location.address1}, {ramen.location.city}, {ramen.location.zip_code}<br/> rating: <strong>{ramen.rating}/5</strong><br/> <span className="ramen-price">{ramen.price}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </form>
      </div>
    )
  }
}

export default SearchRamen
