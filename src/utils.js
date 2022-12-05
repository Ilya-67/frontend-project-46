import _ from 'lodash';

export const getIntersectionObj = (keys, obj1, obj2) => {
  const newObj = {};
  keys.map((key) => {
    if (typeof(obj1[key]) === "object" && typeof(obj2[key]) === "object") {
      const childrenObj1 = obj1[key];
      const childrenObj2 = obj2[key];
      const childrenKey = getJoinKey(childrenObj1, childrenObj2);
      newObj[`${key}`] = getIntersectionObj(childrenKey, childrenObj1, childrenObj2);
      const result = JSON.stringify(newObj); 
      return result; 
    }
    if (obj1[key] === obj2[key]) {
      newObj[`${key}`] = obj1[key];
      return newObj;
    }
    newObj[`- ${key}`] = obj1[key];
    newObj[`+ ${key}`] = obj2[key];
    return newObj;
  });
  return newObj;
};

export const getJoinKey = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const diffKeys1 = _.difference(keys1, keys2);
  const intersectionKeys = _.intersection(keys1, keys2);
  const diffKeys2 = _.difference(keys2, keys1);
  return _.sortBy(_.concat(diffKeys1, intersectionKeys, diffKeys2));
};
