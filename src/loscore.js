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
  extend(obj) {
    // YOUR CODE HERE
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    // YOUR CODE HERE
  }

  memoize(func) {
    // YOUR CODE HERE
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
