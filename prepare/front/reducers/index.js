import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux'; //리듀서 합치는거

import userInfo from './userInfo';
import userSign from './userSign';

import postAdd from './postAdd';
import postMainAction from './postMainAction';
import getIdPost from './getIdPost';
import userPost from './userPost';

import menu from './menu';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE: // SSR용
      console.log('HYDRATE', action);
      return action.payload;
    default:
      const combineReducer = combineReducers({
        userInfo,
        userSign,
        postAdd,
        postMainAction,
        getIdPost,
        userPost,
        menu,
      });
      return combineReducer(state, action);
  }
};

export default rootReducer;
