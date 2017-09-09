import axios from 'axios';

export function updateProfile(profile, id) {
  return dispatch => {
    return axios.post(`/api/profile/${id}`, profile);
  }
}

export function viewProfile(vProfile, id) {
    return axios.get(`/api/profile/${id}`);
}
