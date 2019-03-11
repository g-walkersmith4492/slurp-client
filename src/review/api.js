import apiUrl from '../apiConfig'
import axios from 'axios'

export const showReviews = () => {
  return axios({
    url: apiUrl + '/reviews/',
    method: 'get'
  })
}

export const showReview = (id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    method: 'get'
  })
}

export const deleteReview = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    method: 'delete',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createReview = (reviewData, user) => {
  console.log(user)
  console.log(reviewData)
  return axios({
    url: apiUrl + '/reviews',
    method: 'post',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      review: reviewData
    }
  })
}

export const editReview = (reviewData, user, id) => {
  console.log(reviewData)
  return axios({
    url: apiUrl + '/reviews/' + id,
    method: 'patch',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: reviewData
  })
}
