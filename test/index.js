'use strict';

require('chai').Should();
require('..'); //require compose

describe('Compose', () => {
    var arr1 = ['a'], arr2 = [1], arr;

    it('Should compose the arrays', () => {
      arr = arr1.compose(arr2);
      arr.toString().should.equal(['a', 1].toString());
    });

    it('Should return the proper length', function () {
      arr.length.should.equal(2);
    });
});

describe('Test all the array methods', function() {
  var arr1 = [],
      arr2 = [],
      arr3 = [],
      arr;

  beforeEach(function() {
    arr1 = [];
    arr2 = [];
    arr3 = [];
    arr = arr1
          .compose(arr2)
          .compose(arr3);
  });

  it('inspect', () => {
    arr.inspect().should.equal('[]');
  });

  it('JSON.stringify', () => {
    arr1.push(3),arr2.push(3),arr3.push(3);

    JSON.stringify(arr).should.equal(JSON.stringify(arr1.concat(arr2).concat(arr3)));
  });

  it('toString', () => {
    arr.toString().should.equal(arr1.concat(arr2).concat(arr3).toString());
  });

  it('equals', () => {
    arr1.push(1,2);
    arr2.push(3);
    arr3.push(7);

    arr1.concat(arr2).concat(arr3).equals(arr).should.be.true;
    arr.equals(arr1.concat(arr2).concat(arr3)).should.be.true;
  });

  it('push', () => {
    arr1.push(1);
    arr2.push(2);
    arr3.push(4, 5);
    arr2.push(3);
    arr.push(6);
    arr.push(7, 8);

    arr.equals([1,2,3,4,5,6,7,8]).should.be.true;
  });

  it('pop', () => {
    arr1.push(1,2);
    arr2.push(3);
    arr3.push(4, 5);

    while(arr.length) {
      arr.pop();
    }

    arr.equals([]).should.be.true;
  });

  it('reduce', () => {
    arr1.push(1);
    arr2.push(2);
    arr3.push(4);
    arr2.push(3);
    arr.push(5);

    arr.reduce((prev, curr) => prev + curr).should.equal(15);
  });

  it('concat', () => {
    arr.concat(1);
    arr1.push(1);
    arr2.push(2);
    arr3.push(4, 5);
    arr2.push(3);
    arr.push(6);
    arr.push(7, 8);

    arr.concat('x').equals([1,2,3,4,5,6,7,8,'x']).should.be.true;

    // THIS ONE FAILS because it's not possible to slice :-(
    ['x'].concat(arr).equals(['x',1,2,3,4,5,6,7,8]).should.be.true;
  });

  it('isArray', () => {
    arr.isArray().should.be.true;
    arr1.push(1);
    arr.isArray().should.be.true;
    arr2.push(2);
    arr.isArray().should.be.true;
    arr3.push(3);
    arr.isArray().should.be.true;
    arr2.pop();
    arr.isArray().should.be.true;
    arr1.pop();
    arr.isArray().should.be.true;
    arr3.pop();
    arr.isArray().should.be.true;
  })
});
