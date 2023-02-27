import _ from 'lodash';

const getJoinKey = (obj1, obj2) => _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));  

const getDiffTree = (obj1, obj2) => {
  const keys = getJoinKey(obj1, obj2);
  const diffTree = keys.map((key) => {
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      
      return ['nested', [key, getDiffTree(obj1[key], obj2[key])]];
    } if (obj1[key] === obj2[key]) {
      return ['unchanged', [key, obj1[key]]];
    } if (_.has(obj1, key) === false) {
      return ['added', [key, obj2[key]]];
    } if (_.has(obj2, key) === false) {
      return ['deleted', [key, obj1[key]]];
    }
    return ['changed', [key, obj1[key], obj2[key]]];
  });
  return diffTree;
};

export default getDiffTree;