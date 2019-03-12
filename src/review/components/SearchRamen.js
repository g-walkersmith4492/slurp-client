import React, { Component } from 'react'
import { searchRamen } from '../api'
import messages from '../messages'
import Card from 'react-bootstrap/Card'

class SearchRamen extends Component {
  constructor () {
    super()

    this.state = {
      search: '',
      ramens: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSearchRamen = event => {
    event.preventDefault()

    const { alert, user } = this.props

    searchRamen(this.state.search, user)
      .then(response => this.setState({ ramens: response.data.businesses }))
      .then(response => console.log(this.state.ramens))
      .then(() => alert(messages.signInSuccess, 'success'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', ramen_type: '', price: '', rating: '', location: '', comments: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    if (!this.state.ramens) {
      return (<form className='search-ramen-form' onSubmit={this.onSearchRamen}>
        <h3>Find New Ramen Spots!</h3>
        <input
          required
          type="text"
          name="search"
          value={this.state.search}
          placeholder="location"
          onChange={this.handleChange}
        />
        <button className="btn nav-button" type="submit">Search!</button>
      </form>
      )
    }

    return (
      <form className='search-ramen-form' onSubmit={this.onSearchRamen}>
        <input
          required
          type="text"
          name="search"
          value={this.state.search}
          placeholder="location"
          onChange={this.handleChange}
        />
        <button className="btn nav-button" type="submit">Search!</button>
        <h3>Find New Ramen Spots!</h3>
        <h4 className="yelp-header">Restaurants:</h4>
        {this.state.ramens.map(ramen => (
          <Card key={ ramen.alias }>
            <Card.Img className="yelp-image"variant="top" src={ramen.image_url} />
            <Card.Body>
              <Card.Title>{ramen.name}</Card.Title>
              <Card.Text>
                {ramen.location.address1}, {ramen.location.city}, {ramen.location.zip_code}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </form>
    )
  }
}

export default SearchRamen
