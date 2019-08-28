import Actions, { reducer, INITIAL_STATE } from '../../App/Redux/NumberRedux'

test('init number', () => {
    expect(INITIAL_STATE.number).toEqual(0)
})

test('increase', () => {
    const state = reducer(INITIAL_STATE, Actions.numberIncrease())
    expect(state.number).toEqual(1)
})