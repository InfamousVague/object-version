Object.version = require('../module');
Object.assign = require('object-assign');

describe("Returns instance where key is not equal to value", function() {
  it("Returns 2 instances where a city is not named Alaska.", function() {

      var obj = {
        x: 50,
        y: 20,
        city: 'Baltimore'
      };

      var versionedObject = Object.version(obj, 5);
      // add more versions than our limit
      versionedObject = Object.version(versionedObject);
      versionedObject.x = 40;
      versionedObject.city = 'Alaska';
      versionedObject = Object.version(versionedObject);

      // Find the first instance where the city is Alaska.
      var result = versionedObject.version.where('city').not('Alaska');

      expect(result.length).toBe(2);
  });
});
