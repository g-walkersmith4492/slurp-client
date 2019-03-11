import apiUrl from '../apiConfig'
import axios from 'axios'

export const showReviews = () => {
  return axios({
    url: apiUrl + '/reviews/',
    method: 'get'
  })
}
