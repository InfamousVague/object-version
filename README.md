
## Installation:
object-version can be installed via npm.
> npm install object-version

## Usage:


### Basic:

You can prototype the Object, object or simply declare object-version as a global.

> Object.version = require('object-version');

or

> var Version = require('object-version');

To clone an object with versioning use the example below.

```
var obj = {
  x: 56.3234,
  y: 31.593
};

var version1 = Object.version(obj);
```

To set a limit for the amount of instances to store simply pass a limit along with the function.
If a limit is not passed, the default of 5 will be used.

> var version1 = Object.version(obj, 10);

### Searching and Salvaging:

You can search through stashed instances by first declaring the key (or keys) to check
against, then use one of the ternary methods along with a value. An array of instances
matching your search will be returned.

```
version1.version.where('y').gt(10);
```

You can salvage an instance from the search results by simply wrapping it in the salvage method.
The ID of the salvaged instance will be added to your object.

```
version1.version.salvage(
  version1.version.where('x').is(56.3234)[0]
);
```

## Docs:

* * *

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




* * *
