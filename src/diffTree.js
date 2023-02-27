import _ from 'lodash';

const getJoinKey = (obj1, obj2) => _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

const getDiffTree = (obj1, obj2) => {
  const keys = getJoinKey(obj1, obj2);
  const diffTree = keys.map((key) => {
    const value1 = obj1[key];
    const  value2 = obj2[key];
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return ['nested', [key, getDiffTree(value1, value2)]];
    } if (value1 === value2) {
      return ['unchanged', [key, value1]];
    } if (_.has(obj1, key) === false) {
      return ['added', [key, value2]];
    } if (_.has(obj2, key) === false) {
      return ['deleted', [key, value1]];
    }
    return ['changed', [key, value1, value2]];
  });
  return diffTree;
};

export default getDiffTree;
