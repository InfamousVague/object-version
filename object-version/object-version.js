'use strict';
var uuid = require('uuid');

const version = function(version, limit) {

  /** @function
  * @name Anonymous
  * @desc Clones version object into an instance.
  */
  return (function (instance) {
    // Check for existing instances in our version object before we clean it up.
    let instances = ( instance.version && instance.version.instances ) ?
      instance.version.instances : [];

    // Clean up the version object from the instances to avoid bulk.
    delete instance.version;

    // Avoid having to define the limit every time by checking for a stashedLimit
    let qlimit = ( limit ) ?
      limit : ( instance.stashedLimit ) ?
        instance.stashedLimit : 5;

    // Push some data to our new instace.
    instances.push({
      instance,
      id: uuid.v1(),
      stashedLimit: limit,
      birth: Date.now()
    });

    // Remove old versions when we hit our limit. We never remove more than one
    // per run, thus changing a limit to 1 or lower will not delete all of your
    // previous entries.
    if( instances.length > qlimit ) {
      instances.shift();
    }

    // The version object houses our ternary expressions as well as other data.
    let version = (function(){

      let keys = [];

      /** @function
      * @name where
      * @param {string|array} k Keys to use later in our ternary operations later.
      * @desc Sets a key or group of keys in the form of an array. To be used later in our ternary operations.
      */
      let where = function(k) {
        keys = (typeof(k) === 'object' && Array.isArray(k)) ? k : [k];
        return this;
      };

      /** @function
      * @name gt
      * @param {number} val Value to expect truthy results from.
      * @desc Checks to see if a key or set of keys are greater than a value.
      */
      let gt = function(val) {

        return this.instances.map(function(instance) {

          let pins = 0;

          keys.map(function(key) {
            if(instance.instance[key] > val){
              pins++;
            }
          });

          if (pins === keys.length) {
            return instance;
          } else {
            return undefined;
          }

        }).filter(function(e){return e});

      };

      /** @function
      * @name lt
      * @param {number} val Value to expect truthy results from.
      * @desc Checks to see if a key or set of keys are less than a value.
      */
      let lt = function(val) {

        return this.instances.map(function(instance) {

          let pins = 0;

          keys.map(function(key) {
            if(instance.instance[key] < val){
              pins++;
            }
          });

          if (pins === keys.length) {
            return instance;
          } else {
            return undefined;
          }

        }).filter(function(e){return e});

      };

      /** @function
      * @name not
      * @param {number|string} val Value to expect falsey results from.
      * @desc Checks to see if a key or set of keys are not equal to a value.
      */
      let not = function(val) {

        return this.instances.map(function(instance) {

          let pins = 0;

          keys.map(function(key) {
            if(!(instance.instance[key] === val)){
              pins++;
            }
          });

          if (pins === keys.length) {
            return instance;
          } else {
            return undefined;
          }

        }).filter(function(e){return e});

      };

      /** @function
      * @name is
      * @param {number|string} val Value to expect truthy results from.
      * @desc Checks to see if a key or set of keys are equal to a value.
      */
      let is = function(val) {

        return this.instances.map(function(instance) {

          let pins = 0;

          keys.map(function(key) {
            if(instance.instance[key] === val){
              pins++;
            }
          });

          if (pins === keys.length) {
            return {
              instance
            };
          } else {
            return undefined;
          }

        }).filter(function(e){return e});

      };

      return {
        where,
        gt,
        lt,
        is,
        not,
        instances
      };

    }());

    return Object.assign({}, instance, {
      version
    });

  })(Object.assign({}, version));

};

/**
 * Creates a searchable versioning system out of an object.
 * @param {object} version An object in which to add versioning.
 * @param {number} limit The count limit to our version storage.
 * @return {object} Returns our newly versioned object.
 */
module.exports = version;
