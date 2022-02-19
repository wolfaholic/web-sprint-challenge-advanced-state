import axios from 'axios'
import * as actions from './action-types'
 

// ❗ You don't need to add extra action creators to achieve MVP

export function moveCounterClockwise() { 
  return {
    type:actions.MOVE_COUNTERCLOCKWISE}
}

export function moveClockwise() { 
  return {
    type:actions.MOVE_CLOCKWISE}
}

export function selectAnswer(answerId = null) {
  return {
    type: actions.SET_SELECTED_ANSWER, 
    payload:answerId}
 }

export function setMessage(message = '') { 
  return {
    type: actions.SET_INFO_MESSAGE, 
    payload:message}
}

export function setQuiz(payload = null) { 
  return {
    type: actions.SET_QUIZ_INTO_STATE, 
    payload}
}

export function inputChange(questionData) { 
  return {
    type: actions.INPUT_CHANGE, 
    payload: questionData}
}

export function resetForm() { 
  return {
    type: actions.RESET_FORM}
}

// ❗ Async action creators

// First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz())
    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((response) => {
        dispatch(setQuiz(response.data))
      })
      .catch((err) => console.log(err));
  }
}
export function postAnswer(data) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
axios
    .post('http://localhost:9000/api/quiz/answer', data)
    .then((response) => {
      if(response.status == 200)
      console.log(response.status, response.data);
      dispatch(selectAnswer())
      dispatch(setMessage(response.data.message))
      dispatch(setQuiz())
      dispatch(fetchQuiz())
    })

  }
}
export function postQuiz(quizData) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form

    axios
      .post('http://localhost:9000/api/quiz/new', quizData)
      .then((response) => {
        if(response.status == 201){
          console.log(response.status, response.data)
          dispatch(setMessage(response.data.message))
          dispatch(resetForm())
        }
      })

  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
