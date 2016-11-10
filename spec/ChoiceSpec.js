'use strict';

describe("Choice", function() {
  var choice;

  beforeEach(function() {
    choice = new Choice();
  });

  describe('isValid', function() {

    it("returns true for '=7'", function() {
      expect(choice.isValid('=7')).toBeTruthy();
    });

    it("returns true for '<7'", function() {
      expect(choice.isValid('<7')).toBeTruthy();
    });

    it("returns true for '>7'", function() {
      expect(choice.isValid('<7')).toBeTruthy();
    });

    it("returns false for an invalid choice", function() {
      expect(choice.isValid('1')).toBeFalsy();
    });

  });

  describe('convertsChoiceToInt', function() {

    it("converts =7 to 7", function() {
      expect(choice.convertToInt('=7')).toEqual(7);
    });

    it("converts <7 to 1", function() {
      expect(choice.convertToInt('<7')).toEqual(1);
    });

    it("converts >7 to 12", function() {
      expect(choice.convertToInt('>7')).toEqual(12);
    });

  });

});
