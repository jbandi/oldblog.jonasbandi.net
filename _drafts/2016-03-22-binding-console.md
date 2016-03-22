---
layout: post
title: JavaScript Tip - binding console methods in IE9
main_image: https://farm2.staticflickr.com/1502/25338298114_7bedb619da_z.jpg
thumbnail: https://c2.staticflickr.com/2/1502/25338298114_7bedb619da_q.jpg
---

One of the slightly strange constructs in JavaScript is to `bind` methods of `console`.

You typically stumble upon that construct in tutorials using [SystemJS](https://github.com/systemjs/systemjs), like the official [Angular 2 quickstart](https://angular.io/docs/ts/latest/quickstart.html):

```html
<script>
      System.config({
        packages: {        
          app: {
            format: 'register',
            defaultExtension: 'js'
          }
        }
      });
      System.import('app/main')
            .then(null, console.error.bind(console));
</script>
```
The construct passes the `error` method of `console` as a callback function. By passing the function to another function, it looses its context. When it is called later in time, the function is no longer a method of console, and does not work correctly.

The above problem is fixed, by using [ES5 bind](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind): A wrapper function is created, which captures the `console` in its scope and then internally passes the `console` to the actual function as context (via `call` or `apply`).

Unfortunately the construct is not working in IE9:

    > console.error.bind(console) 
    "Object doesn't support property or method 'bind'" 

If you dig a little deeper, you find out that `console.error` is not a real function in IE9:

In every modern browser:

    > console.error instanceof Function
    true

But in IE9:

    > console.error instanceof Function 
    false 

To get the construct working in IE9 you have to be slightly more verbose:

```javascript
System.import('app/main')
              .then(null, Function.prototype.bind.call(console.error, console));
```
                
Of course the above is applicable to all methods on console (`console.log`, `console.info` ...)
              
[Thanks goes to Stackoverflow](http://stackoverflow.com/questions/14233258/why-cant-i-bind-directly-console-log-on-ie9-with-developer-tools-open)
