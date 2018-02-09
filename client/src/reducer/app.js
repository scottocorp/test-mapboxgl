import { anefRating } from '../actions'
import { SET_ZOOM } from '../actionTypes'

const initialState = {
  zoom: 14
}

export default function(state = initialState, { type, payload, value }) {
  switch (type) {
    case SET_ZOOM:
      return {
        ...state,
        zoom: payload
      }
    default:
      return state
  }
}
