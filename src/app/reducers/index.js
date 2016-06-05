import { combineReducers } from 'redux';
import * as util from '../util';

const initialSortType = "";
const initialRandomArray = util.randomArray();
const initialIsAsc = true;

const sortType = (state=initialSortType, action) => {
  switch (action.type) {
    case "CHANGE":
      return action.sortType;
    default:
      return state;
  }
}

const randomArray = (state=initialRandomArray, action) => {
  switch (action.type) {
    case "CHANGE_ARRAY":
      return action.array;
    default:
      return state;
  }
}

const isAsc = (state=initialIsAsc, action) => {
  switch (action.type) {
    case "CHANGE_ASC":
      return !state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  sortType,
  randomArray,
  isAsc
});

export default rootReducer;
