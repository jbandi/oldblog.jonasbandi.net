---
layout: post
title: TypeScript - The Myth of the Superset  
main_image: https://c5.staticflickr.com/6/5093/29423877964_ee7fac938b_b.jpg
thumbnail: https://c5.staticflickr.com/6/5093/29423877964_ee7fac938b_q.jpg
---

**Update October 02, 2016:**  
I am surprised how much reaction I got for this post, mainly on Twitter. I am also very happy that I got valuable feedback/corrections in the comments.  
Still I feel the need to clarify some things:

I personally think TypeScript is currently the best language choice for complex web applications. I choose it for any non-trivial project.

The intention of this post is not to diminish the value of TypeScript. I just want to document my experiences with TypeScript.

My understanding of "superset" is not compatible with the actual implementation of TypeScript. I am [not](http://stackoverflow.com/questions/29918324/is-typescript-really-a-superset-of-javascript) [the](https://github.com/Microsoft/TypeScript/issues/2606) [only](https://www.reddit.com/r/javascript/comments/3phz93/is_typescript_really_a_superset_of_javascript/) one who had different expectations from the claim to be a superset.  
However other people have a different understanding of "superset" which is compatible with the implementation of TypeScript. Thanks to the comments this is now clear to me.

I still think this post illustrates some interesting facts about TypeScript but **be sure to read the comments to this post, they are much more insightful!**

----

> I worry about building up a large codebase using TypeScript, only to have the ECMAScript spec introduce conflicting keywords and type features.
> <br/><cite>-- Eric Elliot, [The Shocking Secret About Static Types](https://medium.com/javascript-scene/the-shocking-secret-about-static-types-514d39bf30a3#.i1xembose)</cite>



TL;DR: [TypeScript](http://www.typescriptlang.org/) is no superset of JavaScript. See my [code examples](https://github.com/jbandi/ts-superset-myth) for illustration.


[TypeScript claims to be a superset of JavaScript](http://www.typescriptlang.org/). [Many ](https://www.ng-book.com/2/p/TypeScript/) [TypeScript](https://johnpapa.net/es5-es2015-typescript/) [presentations](https://docs.google.com/presentation/d/1hr2IM-8G-0RzpB-WY8pLHvxqNggKPzUO0KvEv1IKPws/edit#slide=id.g3e58cc2be_311) start with a picture of concentrical circles illustrating that TypeScript is a superset of JavaScript.

This fact is a major value proposition of TypeScript over [other "Compile-to-JavaScript" languages](https://github.com/jashkenas/coffeescript/wiki/list-of-languages-that-compile-to-js). It is the base for a gradual migration of a legacy project to TypeScript and it is the base for a frictionless integration with the JavaScript ecosystem.

Technically the statement was never true. TypeScript constrained the usage of dynamic features of JavaScript since the beginning. And it was easy to write JavaScript code that was not valid TypeScript:

```javascript
var first = {};
first.name = 'Tyler Durden';
```
```
Error TS2339:Property 'name' does not exist on type '{}'.
```

Since it is one of the goals of TypeScript to reduce "dynamic typing", the above error was actually desired. But technically TypeScript never was a superset in the sense that any *valid* JavaScript is also *valid* TypeScript.

With [ES2015](https://babeljs.io/docs/learn-es2015/) the gap to TypeScript widens, and the claim to be a superset starts breaking down ...

The first obvious discrepancy with the "superset claim" are class properties. The following snippet is perfectly valid ES2015:

```javascript
class Car {
    constructor(weight) {
        this.weight = weight;
    }
}
```

But the TypeScript compiler throws the following error:

```
Error TS2339: Property 'weight' does not exist on type 'Car'.
```

The issue [is discussed on GitHub](https://github.com/Microsoft/TypeScript/issues/2606). One of the conclusions there is that TypeScript is not a superset in the sense of compatibility but in the sense of "feature sets".  
I think that is a strange interpretation of "superset", which degrades the value proposition of TypeScript, because any programming language that compiles to JS would be a superset with this interpretation.

For the above issue, there is an easy solution which requires only a small change in the code to make the TypeScript compiler happy:

```javascript
class Car {
    constructor(public weight) {
        this.weight = weight;
    }
}
```
Of course with the `public` qualifier the snippet is not valid JavaScript any more ...

Another approach is to declare the property as class property:

```javascript
class Car {
    weight;
    constructor(weight) {
        this.weight = weight;
    }
}
```
The above snippet is not valid ES2015 either, but there is a proposal for a future version of EcmaScript that [standardizes class properties](https://github.com/jeffmo/es-class-fields-and-static-properties). The proposal is [currently stage 2](https://github.com/tc39/proposals) and [Babel](http://babeljs.io/) supports class properties with the [corresponding plugin](http://babeljs.io/docs/plugins/transform-class-properties/) or the [stage 2 preset](http://babeljs.io/docs/plugins/preset-stage-2/).

More discrepancies between JavaScript/ES2015 and TypeScript show up when using [ES2015 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

Modules in ES2015 are a delicate topic, since the syntax (`import`/`export`) is standardized, but the [loading mechanism](https://whatwg.github.io/loader/) is not yet standardized and not implemented in any browser.

The following example is perfectly valid ES2015 using the [modularized distribution of lodash](https://github.com/lodash/lodash/releases/tag/3.0.0), which allows you to cherry-pick single functions as modules:

```javascript
import map from 'lodash/map';

export function calculate(){
    return map([1,2,3], n => n * 3);
}
```
The above snippet runs without problem in a typical ES2015/WebPack/Babel-Setup.

But when you switch to TypeScript you get the following error:

```
Error TS1192: Module '"lodash/map"' has no default export.
```

I don't fully understand the root of the problem: Basically [lodash](https://www.npmjs.com/package/lodash) exports its modules in the [CommonJS format](https://en.wikipedia.org/wiki/CommonJS). [WebPack](http://webpack.js.org/) can somehow resolve the ES2015 imports to these CommonJS modules of lodash.
The TypeScript compiler also transpiles to CommonJS, however it expects a default export according to the ES2015 module spec. If you inspect the transpiled sources you see something like `map_1.default`. This is according to the common [interpretation of the ES2015 module spec](http://www.2ality.com/2014/09/es6-modules-final.html), where a default export is a *named export* with the name `default`.

The problem seems to be ES2015 (or WebPack?) and TypeScript have their own module system, which is not completely interoperable. Whatever the technical details are, for me as a programmer this means that TypeScript is not a superset of JavaScript. Whenever I use a library that offers a modularized distribution like [lodash](https://www.npmjs.com/package/lodash), [ramda](https://www.npmjs.com/package/ramda) or [react-bootstrap](https://www.npmjs.com/package/react-bootstrap), I can't simply switch to TypeScript.

There is yet another difference between ES2015 and TypeScript regarding destructuring.

The following snippet is valid ES2015:

```javascript
const obj = {three: 3, four: 4 };
const {zero = 0, three = 1, seven = 7} = obj;
```
TypeScript throws:

```
Error TS2459: Type '{ three: number; four: number; }' has no property 'seven' and no string index signature.
```
However interestingly TypeScript allows to destructure the same object to function parameters like this:

```javascript
function processValues({three = 1, seven = 7}){};
processValues(obj);
```

These example illustrate that TypeScript is no superset of JavaScript and that the gap is widening  with modern versions of JavaScript.

This of course raises the question where this will lead in the future and if the original value proposition of TypeScript is still applicable or is TypeScript becoming just another "Compile-to-JavaScript" language?

All the examples are easily reproducible with the code in my Github Repo [ts-superset-myth](https://github.com/jbandi/ts-superset-myth):

- The `master` branch will throw TypeScript errors.
- The `es2015` branch runs the same code without problem with Babel/WebPack.
