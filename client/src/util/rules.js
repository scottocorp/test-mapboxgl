import validator from 'validator'
import * as ErrorMessages from './errorMessages.js'

export const required = text => {
  if (text) {
    return null
  } else {
    return ErrorMessages.isRequired
  }
}

export const arrayRequired = array => {
  if (array.length) {
    return null
  } else {
    return ErrorMessages.isArrayRequired
  }
}

export const mustMatch = (field, fieldName) => {
  return (text, state) => {
    return state[field] === text ? null : ErrorMessages.mustMatch(fieldName)
  }
}

export const minLength = length => {
  return text => {
    return text.length >= length ? null : ErrorMessages.minLength(length)
  }
}

export const validEmail = text => {
  if (validator.isEmail(text)) {
    return null
  } else {
    return ErrorMessages.validEmail
  }
}

export const isNumeric = text => {
  if (validator.isNumeric(text)) {
    return null
  } else {
    return ErrorMessages.isNumeric
  }
}
