import {
  NEW_POST,
  USERS_ERROR,
  DELETE_POST,
  MODIFY_POST,
  GET_USER,
} from './types';

const inState = {
  count: 0,
  items: {},
  loading: true,
};

export default function myReducer(state = inState, action) {
  switch (action.type) {
    case NEW_POST:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case MODIFY_POST:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case GET_USER:
      return {
        loading: false,
        error: action.payload,
      };
    case USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
