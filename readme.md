# **class IndexMap**
  A map that is 
## **Constructors**
### `new IndexMap(sortedArrays = [keys[], values[]])`
  - **sortedArrays {`[]`} _OPTIONAL_** An array of two aligned array where the first are the keys and the second are the values. The keys must be aligned to their values and must be sorted in ascending order.
    - **keys {`Key[]`}** An array of keys.
    - **values {`Value[]`}** An array of values.
### **`IndexMap.fromArray(keys, [sorted=false])`**
  Creates an IndexMap from an array of keys.
  - **keys {`Key[]`}** An array of keys to add to the Index.
  - **sorted {`boolean`} _OPTIONAL_** Indicates if the array is sorted in ascending order. Default: false.

### **`IndexMap.fromMap(mapLike, [sorted=false])`**
  Creates an IndexMap from a map like object
  - **mapLike {`Map<Key, Value>`}**
  - **sorted {`boolean`} _OPTIONAL_** Indicates if the map has its keys sorted in ascending order. Default: false.

## **Properties**
### **length {number} _READONLY_**
The number of items in the IndexMap.

## **Methods**
### **`set(key, [value=undefined]): void`**
  Sets a key to a given value.
  - **key {`Key`}** The key to set.
  - **value {`Value|undefined`} _OPTIONAL_** The value to set the key to.

### **`get(key): Value|undefined`**
  Gets the value assigned to the given key.
  - **key {`Key`}** The key to find the value of.

  **Returns {`Value|undefined`}** the value or undefined if no key was found.

### **`delete(key): Value|undefined`**
  Deletes a key from the IndexMap.
  - **key {`Key`}** The key to delete.

  **Returns {`Value|undefined`}** the value of the deleted key or undefined if no key was found/deleted.

### **`getRange(min, max): Value[]`**
  Gets all the values in the given range (inclusive).
  - **min {`Key`}** the smallest allowed key.
  - **max {`Key`}** the largest allowed key.

  **Returns {`Value[]`}** the values that fit within the key range.

### **`size(): number`**
  **Returns {`number`}** the number of items in the IndexMap.

### **`toString(): string`**
  **Returns {`string`}** a string representing the IndexMap

### **`toJSON(): [Key[],Value[]]`**
  **Returns {`[Key[],Value[]]`}** an array of parallel arrays representing the key/value pairs of the IndexMap

## **Iterator**
  The iterator yields an array containing a key:pair. The first value is the key and the second value is its value.
  The iterator is auto updating to changes in the IndexMap however will skip any key pairs where the key is less then or equal to the last returned key.

  Example

  ```
  const sortedArrays = [['a', 'b', 'c', 'd'],
                        [  1,   3,   4,   0]];
  var im = new IndexMap(sortedArrays);
  for (let p of im) {
    console.log('key: ' + p[0]);
    console.log('value: ' + p[1]);
  }
  // prints:
  //key: a
  //value: 1
  //key: b
  //value: 3
  //key: c
  //value: 4
  //key: d
  //value: 0
  ```
