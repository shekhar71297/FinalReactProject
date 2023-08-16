// redux/actions.js
export const SET_SELECTED_OPTION = 'SET_SELECTED_OPTION';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';

export const setSelectedOption = (questionId, option) => ({
  type: SET_SELECTED_OPTION,
  payload: { questionId, option },
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});
