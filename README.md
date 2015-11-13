# es6-array-compose

This package adds a new method to the array prototype, allowing to chain arrays in a single virtual array.

## Usage

```js
    require('es6-array-compose');

    var arr1 = [1,2];
    var arr2 = [5,6];

    arr = arr1.compose(arr2);

    console.log('(%s) %s', arr.length, arr); // (4) [1,2,5,6]
    arr1.push(3);
    console.log('(%s) %s', arr.length, arr); // (5) [1,2,3,5,6]
    arr2.shift(4);
    console.log('(%s) %s', arr.length, arr); // (5) [1,2,3,4,5,6]
```

## Equality

ES6 proxies are (and there are good reasons for that) opaque. Which means that no matter what:

```js
var arr = arr1.compose(arr2);

arr !== arr1.concat(arr2); //true
arr != arr1.concat(arr2); //true
```
As a workaround, you can check equality this way:

```js
arr.equals(arr1.concat(arr2)) //true
arr.equals(arr1.concat(arr2)) //true
```
Which of course is much slower than the regular equality operation

## Cool stuff you can potentially do with it

These are just examples, it doesn't mean that it's a good idea to do things like this,
but it will give you some ideas, don't hesitate to share with me any use you may find for this.

### Priority queues

```js
  var p1 = [f1,f2,f3];
  var p2 = [f4,f5,f6];

  var p = p1.compose(p2);

  p.reduce((prev, cur) => return prev.push(cur()), []);
  // This will run all the processes, starting from the p1 priority list, and return an array of all the return values
```

### Board games

Please, note that you should not modify the amount of objects from the list,
using push, pop, shift, splice or unshift, since there is no way to know on
which array will the element end.

```js

var deck = [
  'A♥','2♥','3♥','4♥','5♥','6♥','7♥','8♥','9♥','10♥','J♥','Q♥','K♥',
  'A♦','2♦','3♦','4♦','5♦','6♦','7♦','8♦','9♦','10♦','J♦','Q♦','K♦',
  'A♣','2♣','3♣','4♣','5♣','6♣','7♣','8♣','9♣','10♣','J♣','Q♣','K♣',
  'A♠','2♠','3♠','4♠','5♠','6♠','7♠','8♠','9♠','10♠','J♠','Q♠','K♠'
];

var p1, p2, p3, p4, board, deck;

// Two cards for each player, and five in the board
p1.push(deck.pop());
p1.push(deck.pop());
p2.push(deck.pop());
p2.push(deck.pop());
p3.push(deck.pop());
p3.push(deck.pop());
p4.push(deck.pop());
p4.push(deck.pop());
board.push(deck.pop());
board.push(deck.pop());
board.push(deck.pop());
board.push(deck.pop());
board.push(deck.pop());

var game = p1.compose(p2).compose(p3).compose(p4).compose(board).compose(deck);

console.log(game);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

console.log(game);
```
