import ConstantsActionTypes from './response.constants';

export const getAllVictims = (token) => (dispatch) => {
  dispatch({
    type: ConstantsActionTypes.GET_VICTIMS_START
  });
  console.log(token)
  const bearer = `Bearer ${token}`;
  fetch('https://emresys.herokuapp.com/api/report/', {
    method: 'get',
    headers: {
      Authorization: bearer,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    dispatch({
      type: ConstantsActionTypes.GET_VICTIMS_SUCCESS,
      payload: response.message
    });
    return response.json();
  })
  .then((data) => {
    dispatch({
      type: ConstantsActionTypes.LOAD_VICTIMS,
      payload: data
    });
  })
  .catch((error) => {
    dispatch({
      type: ConstantsActionTypes.GET_VICTIMS_FAILED,
      payload: error.message
    });
  })
};

export const logoutResponseUnit = () => ({ type: ConstantsActionTypes.LOGOUT_RESPONSE_UNIT });

export const loginResponseUnitAsync = (email, password, api) => (dispatch) => {
  dispatch({
    type: ConstantsActionTypes.LOGIN_RESPONSE_UNIT_START,
    payload: true
  });
  fetch(`https://emresys.herokuapp.com/${api}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  })
    .then((response) => {
      dispatch({
        type: ConstantsActionTypes.LOGIN_RESPONSE_UNIT_SUCCESS,
        payload: response.status
      });
      return response.json();
    }).then((data) => {
      dispatch({
        type: ConstantsActionTypes.LOAD_RESPONSE_UNIT,
        payload: data
      });
      return data;
    })
    .catch((error) => {
      dispatch({
        type: ConstantsActionTypes.LOGIN_RESPONSE_UNIT_FAILED,
        payload: error.message
      });
    });
};