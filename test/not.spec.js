Object.version = require('../module');
Object.assign = require('object-assign');

describe("Returns instance where key is not equal to value", function() {
  it("Returns 2 instances where a city is not named Fairbanks.", function() {

      var obj = {
        x: 50,
        y: 20,
        city: 'Baltimore'
      };

      var versionedObject = Object.version(obj, 5);
      // add more versions than our limit
      versionedObject = Object.version(versionedObject);
      versionedObject.x = 40;
      versionedObject.city = 'Fairbanks';
      versionedObject = Object.version(versionedObject);

      // Find the first instance where the city is Fairbanks.
      var result = versionedObject.version.where('city').not('Fairbanks');

      expect(result.length).toBe(2);
  });
});
