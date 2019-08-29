import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  numberRequest: ['data'],
  numberSuccess: ['payload'],
  numberFailure: ['error'],
  numberIncrease: null,
})

export const NumberTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  error: null,  
  number: 0,
})

/* ------------- Selectors ------------- */

export const NumberSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = (state, {error}) =>
  state.merge({ fetching: false, error, payload: null })

export const increase = state => state.merge({number: state.number+1})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NUMBER_REQUEST]: request,
  [Types.NUMBER_SUCCESS]: success,
  [Types.NUMBER_FAILURE]: failure,
  [Types.NUMBER_INCREASE]: increase
})
