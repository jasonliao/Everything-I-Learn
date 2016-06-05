import { randomArray } from '../util';

export const changeSortType = (sortType) => {
  return {
    type: "CHANGE",
    sortType
  }
};

export const changeSrotArray = (array) => {
  return {
    type: "CHANGE_ARRAY",
    array: array ? array : randomArray()
  }
};

export const changeAsc = () => {
  return {
    type: "CHANGE_ASC"
  }
}
