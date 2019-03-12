import React, { Component } from 'react'
import { searchRamen } from '../api'
import messages from '../messages'

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
      .then(response => console.log(this.state.wines))
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
        <h3>Search Ramen Stores</h3>
        <label>Location</label>
        <input
          required
          type="text"
          name="search"
          value={this.state.search}
          placeholder="location"
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">Search!</button>
      </form>
      )
    }

    return (
      <form className='search-ramen-form' onSubmit={this.onSearchRamen}>
        <h3>Search Ramen Stores</h3>
        <label>Location</label>
        <input
          required
          type="text"
          name="search"
          value={this.state.search}
          placeholder="location"
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">Search!</button>

        <h3>Ramen Spots:</h3>
        <ul>
          {this.state.ramens.map(ramen => (
            <p key={ramen.alias}>
              {ramen.name} located at {ramen.location.address1}, {ramen.location.city}, {ramen.location.zip_code}
            </p>
          ))}
        </ul>
      </form>
    )
  }
}

export default SearchRamen
