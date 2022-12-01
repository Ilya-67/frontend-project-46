const getIntersectionObj = (keys, obj1, obj2) => {
  const newObj = {};
  keys.map((key) => {
    if (obj1[key] === obj2[key]) {
      newObj[`    ${key}`] = obj1[key];
      return newObj;
    }
    newObj[`  - ${key}`] = obj1[key];
    newObj[`  + ${key}`] = obj2[key];
    return newObj;
  });
  return newObj;
};

export default getIntersectionObj;
