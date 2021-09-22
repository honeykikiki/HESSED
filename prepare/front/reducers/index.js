import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux'; //리듀서 합치는거

import user from './user';
import post from './post';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: // SSR용
      console.log('HYDRATE', action);
      return action.payload;
    default:
      const combineReducer = combineReducers({
        user,
        post,
      });
      return combineReducer(state, action);
  }
};

export default rootReducer;
