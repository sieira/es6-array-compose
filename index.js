/**
Copyright © 2015 Luis Sieira Garcia

This file is part of es6-array-compose.

    es6-array-compose is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    es6-array-compose is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with along with es6-array-compose.  If not, see <http://www.gnu.org/licenses/>.  If not, see <http://www.gnu.org/licenses/>
**/
'use strict';

require('harmony-reflect');
var util = require('util');

var buildHandler = function (arr) {
  return {
    get: function(target, property, receiver) {
      switch (property) {
      case 'length':
        return target.length + arr.length;
      case 'inspect':
        return () => util.inspect(target.concat(arr));
      // Used bu JSON.stringify to retrieve the object
      case 'toJSON':
        return () => target.concat(arr);
      /**
       * Methods that modify the tail of the array
       */
      case 'push':
        return Array.prototype[property].bind(arr);
      /**
      * Methods that modify the tail of the array, if it's not empty
      * and the head otherwise
      */
      case 'pop':
        return arr.length ? Array.prototype[property].bind(arr) : target[property];
      /**
      * Methods that do not modify the array, and afect to its entire length
      */
      case 'concat':
      case 'equals':
      case 'reduce':
      case 'slice':
      case 'toString':
        return Array.prototype[property].bind(target.concat(arr));
      case 'isArray':
        return () => true && Array.isArray(arr);
      case 'compose':
        return this.compose;
      default:
        if(isNaN(property)) {
          return target[property];
        } else {
          if(property > target.length) {
            return arr[property - target.length];
          } else {
            return target[property];
          }
        }
      }
    },
    set: function(target, property, receiver) {
      target[property] = receiver;
    }
  }
};

var buildProxy = (target, arr) => {
  let handler = buildHandler(arr);
  let proxy = new Proxy(target, handler);

  handler.compose = (another) => {
    return new Proxy(proxy, buildHandler(another))
  };

  return proxy;
};

Array.prototype.equals = function (a) {
  return Array.isArray(a) && this.toString() === a.toString();
}

Array.prototype.compose = function (arr) {
  return buildProxy(this, arr);
}
