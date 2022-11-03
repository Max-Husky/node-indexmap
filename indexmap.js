/**
 * @template Key, Value
 */
class IndexMap {
  /**
   * The keys for the map
   * @type {Key[]}
   */
  #keys;

  /**
   * The values for the map
   * @type {Value[]}
   */
  #values;

  /**
   * The number of items in the IndexMap
   * @type {number} @readonly
   */
  get length() {return this.#keys.length}

  /**
   * Creates a new IndexMap
   * @param {[Key[], Value[]]} sortedArray
   */
  constructor([keys = [], values = []] = []) {
    this.#keys = keys;
    this.#values = values;
  }

  /**
   * Gets the assumed position of the key
   * @param {Key} key The key to try and find
   * @returns {number}
   */
  #getPos(key) {
    let keys = this.#keys, ceil = keys.length, floor = 0, pos = Math.floor(ceil * 0.5);

    // doing a binary search of the key array
    while (ceil > pos) {
      if (keys[pos] > key) {
        ceil = pos;
      } else if (keys[pos] < key) {
        floor = pos + 1;
      } else {
        break;
      }

      pos = Math.floor((ceil - floor) * 0.5) + floor;
    }

    return pos;
  }

  /**
   * Creates a IndexMap from an array
   * @param {Key[]} keys The keys to add from the array
   * @param {boolean} [sorted] is the array already sorted in ascending order
   * @returns {IndexMap<Key, undefined>}
   */
  static fromArray(keys, sorted = false) {
    let im;
    if (sorted) {
      im = new IndexMap([keys, new Array(keys.length)]);
    } else {
      im = new IndexMap();

      for (let i of keys) {
        im.set(i);
      }
    }

    return im;
  }

  /**
   * Creates a IndexMap from a map like object
   * @param {Map} map The map or map like irratator
   * @param {boolean} sorted is the map sorted in ascending order
   * @returns
   */
  static fromMap(map, sorted = false) {
    let im;
    if (sorted) {
      let k = [], v = [];

      for (let i of map) {
        k.push(i[0]);
        v.push(i[1]);
      }

      im = new IndexMap([k, v]);
    } else {
      im = new IndexMap();

      for (let i of map) {
        im.set(i[0], i[1]);
      }
    }

    return im;
  }

  /**
   * Gets the number of items in the IndexMap
   * @returns {number} The number of items
   */
  size() {
    return this.#keys.length;
  }

  /**
   * Adds or overwrites the key to the given value.
   * @param {Key} key The key to set
   * @param {Value} [value] The value to set the key to
   */
  set(key, value = undefined) {
    let pos = this.#getPos(key);

    // if the key/value exists overwrite it otherwise add it
    if (this.#keys[pos] == key) {
      this.#values[pos] = value;
    } else {
      this.#keys.splice(pos, 0, key);
      this.#values.splice(pos, 0, value);
    }
  }

  /**
   * Gets the value of the given key
   * @param {Key} key The key to get the value of
   * @returns {Value|undefined} returns the value or undefined if the key does not exist
   */
  get(key) {
    let pos = this.#getPos(key);
    return this.#keys[pos] == key ? this.#values[pos]: undefined;
  }

  /**
   * Gets the values for the keys in the given range
   * @param {Key} min The lowest valued key accepted
   * @param {Key} max The highest valued key accepted
   * @returns {[Key[], Value[]]}
   */
  getRange(min, max) {
    let low = this.#getPos(min), high = this.#getPos(max) + 1;
    return [this.#keys.slice(low, high), this.#values.slice(low, high)];
  }

  /**
   * Deletes the key from the function
   * @param {Key} key The key to delete
   * @returns {Value|undefined} The value that was deleted
   */
  delete(key) {
    let pos = this.#getPos(key);
    if (this.#keys[pos] == key) {
      this.#keys.splice(pos, 1);
      return this.#values.splice(pos, 1);
    } else {
      return undefined;
    }
  }

  toJSON() {
    return [[...this.#keys], [...this.#values]];
  }

  toString() {
    return `<IndexMap Keys: ${this.#keys.join(',')} | Values: ${this.#values.join(',')} >`;
  }

  /**
   * @yields {[Key, Value]}
   */
  *[Symbol.iterator]() {
    let pos = -1, lastKey;

    while (pos < this.#keys.length) {
      // get the next value
      if (pos === -1 || this.#keys[pos] == lastKey) {
        lastKey = this.#keys[++pos];
        yield [lastKey, this.#values[pos]];
      } else {
        // if the index was modified move the position to where the value should now be and continue
        pos = this.#getPos(lastKey);
        if (this.#keys[pos] < lastKey) {
          lastKey = this.#keys[pos];
        }
      }
    }
  }
}

module.exports = IndexMap;