// Constants
export const SET_STATUS_NLP = 'PROJECT_SETTING/SET_STATUS_NLP';

// Initial State
const initialState = {
  NLPStatus: null
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS_NLP:
      return { ...state, NLPStatus: action.NLPStatus };
    default:
      return state;
  }
};

// Action creators
const actionCreators = {};

actionCreators.setNLPStatus = NLPStatus => ({
  type: SET_STATUS_NLP,
  NLPStatus
});

// Discpatchers
const dispatchers = {};

dispatchers.setNLPStatus = NLPStatus => {
  return actionCreators.setNLPStatus(NLPStatus);
};

export { actionCreators, reducer, dispatchers };
