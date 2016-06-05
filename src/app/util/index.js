// generate a random array
// length between 10 ~ 20
// number between 2 ~ 50

export const randomArray = () => {
  const length = Math.floor((Math.random() * 10 + 10)); // [10, 20)
  let ra = new Array(30).fill(0).map(() => {
    return Math.floor(Math.random() * 48 + 2);
  });
  let exist = {};
  for (let [i, elem] of ra.entries()) {
    if (exist[elem]) {
      ra.splice(i--, 1);
    } else {
      exist[elem] = true;
    }
  }
  return ra.slice(0, length);
};
