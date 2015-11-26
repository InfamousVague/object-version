Object.version = require('../module');
Object.assign = require('object-assign');

describe("Salvages an instance where key is equal to value", function() {
  it("Returns 1 instance where a city is named Fairbanks.", function() {

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
      versionedObject.city = 'France';
      versionedObject = Object.version(versionedObject);


      // Find the first instance where the city is Fairbanks.
      var result = versionedObject.version.salvage(
        versionedObject.version.where('city').is('Fairbanks')[0]
      );

      expect(result.city).toBe('Fairbanks');
  });
});
