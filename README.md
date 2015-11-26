# object-version [![Build Status](https://travis-ci.org/wski/object-version.svg?branch=master)](https://travis-ci.org/wski/object-version) [![Code Climate](https://codeclimate.com/github/wski/object-version/badges/gpa.svg)](https://codeclimate.com/github/wski/object-version)
 [![tonic](https://i.gyazo.com/a1182f8628b536562b615598ef46fb96.png)](https://tonicdev.com/npm/object-version) [![Dependency Status](https://david-dm.org/wski/object-version.svg)](https://david-dm.org/wski/object-version) [![GitHub version](https://badge.fury.io/gh/wski%2Fobject-version.svg)](https://badge.fury.io/gh/wski%2Fobject-version)

Object version creates clones of your objects and stashes them within that
object as instances. Instances are searchable using ternary logic. Instances
can also be used as a recovery point in the event you'd like to go back to an
earlier version. This can be useful for unexpected NaN, Undefined, and Null
values, in addition to many other applications.


Example use case:

```javascript
// You never know what might happen, let's add versioning to our object.
var versionedObject = Object.version({
  x: 50,
  y: 20,
  city: 'Baltimore'
}, 5);

// Everything is great, I'm searching by cities all over the place!
if( typeof(versionedObject.city) === undefined ) {
  // Holy crap, our city is gone. let's go back to a time where things were better.
  versionedObject = versionedObject.version.salvage(
    versionedObject.version.where('city').is('Alaska');
  );
}
```

## Installation:
object-version can be installed via npm.
> npm install object-version

## Usage:

### Example:

For an example script you can run `npm example`, the code can be seen in `./tonicExample.js`

### Basic:

You can prototype the Object, object or simply declare object-version as a global.

```javascript
Object.version = require('object-version');
```
or

```javascript
var Version = require('object-version');
```
To clone an object with versioning use the example below.

```javascript
var obj = {
  x: 56.3234,
  y: 31.593
};

var version1 = Object.version(obj);
```

To set a limit for the amount of instances to store simply pass a limit along with the function.
If a limit is not passed, the default of 5 will be used.

```javascript
var version1 = Object.version(obj, 10);
```

### Searching and Salvaging:

You can search through stashed instances by first declaring the key (or keys) to check
against, then use one of the ternary methods along with a value. An array of instances
matching your search will be returned.

```javascript
version1.version.where('y').gt(10);
```

You can salvage an instance from the search results by simply wrapping it in the salvage method.
The ID of the salvaged instance will be added to your object.

```javascript
version1.version.salvage(
  version1.version.where('x').is(56.3234)[0]
);
```

## Docs:


### Anonymous()

Clones version object into an instance.



### where(k)

Sets a key or group of keys in the form of an array. To be used later in our ternary operations.

**Parameters**

**k**: `string | array`, Keys to use later in our ternary operations later.



### gt(val)

Checks to see if a key or set of keys are greater than a value.

**Parameters**

**val**: `number`, Value to expect truthy results from.



### lt(val)

Checks to see if a key or set of keys are less than a value.

**Parameters**

**val**: `number`, Value to expect truthy results from.



### not(val)

Checks to see if a key or set of keys are not equal to a value.

**Parameters**

**val**: `number | string`, Value to expect falsey results from.



### is(val)

Checks to see if a key or set of keys are equal to a value.

**Parameters**

**val**: `number | string`, Value to expect truthy results from.



### salvage(instance)

Set our object data to that of a salvaged instance.

**Parameters**

**instance**: `object`, Instance in which we desire to restore from.
