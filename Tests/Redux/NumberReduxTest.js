import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/NumberRedux'


test('init number', () => {
    expect(INITIAL_STATE.number).toEqual(0)
})

test('increase', () => {
    const state = reducer(INITIAL_STATE, Actions.numberIncrease())
    expect(state.number).toEqual(1)
})


test('request', () => {
    const data = 'seom dat'
    const state = reducer(INITIAL_STATE, Actions.numberRequest(data))
  
    expect(state.fetching).toBe(true)
    expect(state.data).toBe(data)
})

test('success', () => {
    const payload = 'Soem respone fomr saga or nothgin'
    const state = reducer(INITIAL_STATE, Actions.numberSuccess(payload))

    expect(state.fetching).toBe(false)
    expect(state.payload).toBe(payload)
    expect(state.error).toBeNull()
})

test('failure', () => {
    const error = 'some error'
    const state = reducer(INITIAL_STATE, Actions.numberFailure(error))

    expect(state.fetching).toBe(false)
    expect(state.error).toEqual(error)
})