import FixtureAPI from '../../App/Services/FixtureApi'
import { put, call } from 'redux-saga/effects'
import { getNumber } from '../../App/Sagas/NumberSagas'
import NumberActions from '../../App/Redux/NumberRedux'
import { path } from 'ramda'

const stepper = (fn) => (mock) => fn.next(mock).value

test('first calls API', () => {
    const step = stepper(getNumber(FixtureAPI))
    // first yield is API
    expect(step()).toEqual(call(FixtureAPI.getCommens))
  })

test('success', () => {
    const response = FixtureAPI.getCommens()
    const step = stepper(getNumber(FixtureAPI))
    step()

    const stepResponse = step(response)
    const payload = path(['data'], response)[0]

    expect(stepResponse).toEqual(put(NumberActions.numberSuccess(payload)))
})

test('failed', () => {
    const mock = 'someError'
    const response = {ok: false, error: mock}
    const step = stepper(getNumber(FixtureAPI))
    step()

    expect(step(response)).toEqual(put(NumberActions.numberFailure(mock)))
})

test('faield miss body',  () => {
    const response = {ok: true, data: [
        {
            id: 1,
        }
    ]}

    const step = stepper(getNumber(FixtureAPI))
    step()

    expect(step(response)).toEqual(put(NumberActions.numberFailure('Miss body')))
})