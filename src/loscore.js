// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    return Array.from(new Set(array));
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    const array = [];
    this.each(collection, (value) => {
      array.push(iteratee(value));
    });
    return array;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    return this.filter(collection, (val) => {
      return !test(val);
    });
  }

  reduce(collection, iterator, accumulator) {
    let acc;
    if (accumulator === undefined) {
      acc = collection[0];
      const col = collection.slice(1);
      this.each(col, (value) => {
        acc = iterator(acc, value);
      });
    } else {
      acc = accumulator;
      this.each(collection, (value) => {
        acc = iterator(acc, value);
      });
    }
    return acc;
  }

  every(collection, test = (value) => value) {
    return this.reduce(collection, (acc, value) => acc && !!test(value), true);
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(originalObj, ...objects) {
    this.each(objects, (object) => {
      Object.assign(originalObj, object);
    });
    return originalObj;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let count = 0;
    let previousValue;
    return () => {
      if (count === 0) {
        count++;
        previousValue = func();
      }
      return previousValue;
    };
  }

  memoize(func) {
    const cache = {};
    return (...val) => {
      const key = JSON.stringify(val);
      if (!cache[key]) {
        cache[key] = func(...val);
      }
      return cache[key];
    };
  }

  invoke(collection, functionOrKey) {
    const newArray = [];
    if (typeof functionOrKey === "function") {
      this.each(collection, (value) => {
        newArray.push(functionOrKey.apply(value));
      });
    } else {
      this.each(collection, (value) => {
        newArray.push(value[functionOrKey]());
      });
    }
    return newArray;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy(collection, functionOrKey) {
    const obj = {};
    if (typeof functionOrKey === "string") {
      this.each(collection, (value) => {
        obj[value[functionOrKey]] = value;
      });
    } else {
      this.each(collection, (value) => {
        obj[functionOrKey(value)] = value;
      });
    }
    return Object.values(obj);
  }

  zip(array1, array2) {
    const newArray = [];
    for (let i = 0; i < Math.max(array1.length, array2.length); i++) {
      const firstValue = array1[i] === undefined ? "" : array1[i];
      const secondValue = array2[i] === undefined ? "" : array2[i];
      newArray.push(firstValue + secondValue);
    }
    return newArray;
  }

  delay(func, delayTime) {
    return (value) => {
      setTimeout(() => func(value), delayTime);
    };
  }

  defaults(obj1, obj2) {
    this.each(obj2, (value, key) => {
      obj1[key] = obj1[key] === undefined ? obj2[key] : obj1[key];
    });
    return obj1;
  }

  throttle(func, delayTime) {
    let throttled = false;
    return () => {
      if (throttled === false) {
        func();
        throttled = true;
        setTimeout(() => {
          throttled = false;
        }, delayTime);
      }
    };
  }
}

module.exports = new LoScore();
