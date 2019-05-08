// Constants
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';
// Initial State
const initialState = {
  notifications: []
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.notification
          }
        ]
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.key
        )
      };

    default:
      return state;
  }
};

// Action creators
const actionCreators = {};

actionCreators.enqueueSnackbar = notification => ({
  type: ENQUEUE_SNACKBAR,
  notification: {
    key: new Date().getTime() + Math.random(),
    ...notification
  }
});

actionCreators.removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key
});

// Discpatchers
const dispatchers = {};

dispatchers.enqueueSnackbar = notification => {
  return actionCreators.enqueueSnackbar(notification);
};

dispatchers.removeSnackbar = key => {
  return actionCreators.removeSnackbar(key);
};

export { actionCreators, reducer, dispatchers };
