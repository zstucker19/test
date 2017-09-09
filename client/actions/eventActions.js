import axios from 'axios';


export function createEvent(event, id) {
  return dispatch => {
    return axios.post(`/api/events/${id}`, event);
  };
}

