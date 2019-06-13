// Constants
export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';
export const SHIFT_SNACKBAR = 'SHIFT_SNACKBAR';
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
            key: action.key,
            ...action.notification
          }
        ]
      };
    case SHIFT_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.slice(1, state.notifications.length)
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        )
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

actionCreators.enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key;

  return {
    type: ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  };
};

actionCreators.removeSnackbar = key => ({
  type: REMOVE_SNACKBAR,
  key
});

actionCreators.closeSnackbar = key => ({
  type: CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
});

actionCreators.shiftSnackbar = () => ({
  type: SHIFT_SNACKBAR
});

// Discpatchers
const dispatchers = {};

dispatchers.enqueueSnackbar = notification => {
  return actionCreators.enqueueSnackbar(notification);
};

dispatchers.removeSnackbar = key => {
  return actionCreators.removeSnackbar(key);
};

dispatchers.closeSnackbar = key => {
  return actionCreators.closeSnackbar(key);
};

dispatchers.shiftSnackbar = () => {
  return actionCreators.shiftSnackbar();
};

export { actionCreators, reducer, dispatchers };
