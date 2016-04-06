---
layout: post
title: JavaScript Tip - Binding functions in ES.next  
main_image: https://c2.staticflickr.com/2/1614/25676985953_aa47af3c84.jpg
thumbnail: https://c2.staticflickr.com/2/1614/25676985953_aa47af3c84_q.jpg
---

The **["Function Bind Syntax"](https://github.com/zenparsing/es-function-bind)** is a proposal for a new language feature of ECMAScript which allows you to bind functions to a context in an elegant way:


```javascript
function sayHello(peer) { console.log('Hello to ' + peer.name + ' from ' + this.name)}

let universe = {name: 'universe'};
let world = {name: 'world'};

world::sayHello(universe); // -> Hello to universe from world
universe::sayHello(world); // -> Hello to world from universe
```

Currently the "Function Bind Syntax" proposal is at [stage 0](https://github.com/tc39/ecma262/blob/master/stage0.md) of the specification process.

However [Babel](babeljs.io) already supports that features if you configure the [stage-0 preset](http://babeljs.io/docs/plugins/preset-stage-0/) or the [transform-function-bind plugin](http://babeljs.io/docs/plugins/transform-function-bind/).

You can also try the above code in the online [Babel REPL](http://babeljs.io/repl/).

One of the main advantages of this syntax would be to provide **"extension methods"** like this:

```javascript
import { take } from "trine/iterable/take";
import { to } from "trine/iterable/to";

let evenFilter = function() { return this % 2 === 0; };
let array = [1, 2, 3, 4];

let filtered = array::take(evenFilter);

console.log(filtered::to(Array)); // -> [ 2, 4 ]
```

The above code is using the [trine library](https://www.npmjs.com/package/trine).

The current version of [RxJs seems already to support the function bind syntax](https://github.com/ReactiveX/rxjs)!


I have seen this features for the first time in the presentation ["RxJS Version 5" by Ben Lesh](https://www.youtube.com/watch?v=COviCoUtwx4).

A deeper discussion can be found in this blog post: [JavaScript ES7 Function Bind Syntax](http://blog.jeremyfairbank.com/javascript/javascript-es7-function-bind-syntax/)

[Here is the discussion](https://github.com/Microsoft/TypeScript/issues/3508) about implementing the feature in TypeScript.