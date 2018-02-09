import { SET_ZOOM } from '../actionTypes'
import jsonp from 'jsonp'

export const setZoom = zoom => ({
  type: SET_ZOOM,
  payload: zoom
})
