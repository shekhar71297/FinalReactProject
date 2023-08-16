// redux/reducer.js
import { SET_SELECTED_OPTION, FETCH_DATA_SUCCESS } from './Action';

const initialState = {
  selectedOptions: {},
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_OPTION:
      return {
        ...state,
        selectedOptions: {
          ...state.selectedOptions,
          [action.payload.questionId]: action.payload.option,
        },
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
