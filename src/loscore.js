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
        return previousValue;
      } else {
        return previousValue;
      }
    };
  }

  memoize(func) {
    const cache = {};
    return (...val) => {
      const key = JSON.stringify(val);
      if (cache[key]) {
        return cache[key];
      } else {
        cache[key] = func(...val);
        return cache[key];
      }
    };
  }

  invoke(collection, functionOrKey) {
    // YOUR CODE HERE
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
