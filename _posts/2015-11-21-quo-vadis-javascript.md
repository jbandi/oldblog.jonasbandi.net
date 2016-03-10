---
layout: post
title: Quo Vadis JavaScript?
date: '2015-11-21T23:31:00.001+01:00'
author: Jonas Bandi
tags: 
modified_time: '2015-11-23T18:27:02.892+01:00'
thumbnail: https://lh3.googleusercontent.com/-a-0JAXtAE7w/VlDzvsPAoMI/AAAAAAAACgY/StAcm8Wowz8/s72-c-Ic42/JSC.png
blogger_id: tag:blogger.com,1999:blog-5763764290649132593.post-6256342868381414387
blogger_orig_url: http://blog.jonasbandi.net/2015/11/quo-vadis-javascript.html
---

<img class="jb-main-img" property="og:image"  src="https://lh3.googleusercontent.com/-a-0JAXtAE7w/VlDzvsPAoMI/AAAAAAAACgY/StAcm8Wowz8/s912-Ic42/JSC.png" width="600px"/>


JavaScript went through a *makeover extraordinaire* with ES2015 which was [finalized this summer](http://www.ecma-international.org/ecma-262/6.0/).

This is not your grandma's JavaScript any more:

```javascript
    import React from 'react';
    
    export default class Catalog extends React.Component {
        constructor(){
            super();
            ...
        }
        buy(product) {
            ...
        }
        render() {
            ...
        }
    }
```

But it seems this was just the beginning... the metamorphosis is far from done for JavaScript.

For future versions of JavaScript there are many [proposed new language features](https://github.com/tc39/ecma262). Among the most outstanding proposals for me are [decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md), [async functions](https://github.com/tc39/ecmascript-asyncawait) and [private state](https://github.com/wycats/javascript-private-state)

Some years ago nobody would have believed that the following snippets are (will be) valid JavaScript.

**Decorators:**

	@createStore(alt)
	@datasource(CatalogSource)
	export default class CatalogStore {
    
    	...
    
    	@bind(CatalogActions.searchLoaded)
    	onSearchLoaded() {
        	...
    	}
	}



**Async Functions:**

    async function fetchJson(url) {
        try {
            let request = await fetch(url);
            let text = await request.text();
            return JSON.parse(text);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
        }
    } 


**Private State:**

    class DataObj {
      private #data1;
    
      constructor(d) {
        #data1 = d; 
      }
    
      get data() {
        return #data1;
      }
    }


I think its now safe to say that Silverlight and Flex were failed attempts to bring other languages than JavaScript into browsers ... but looking at the snippets above, it might sure look like some C#/Java infiltration squad sneaked into the Ecma building ... 

[Babel](https://babeljs.io/) and [TypeScript](http://www.typescriptlang.org/) both already support decorators and Babel also [supports async functions](http://babeljs.io/docs/plugins/syntax-async-functions/) (TypeScript is [working on it](http://blogs.msdn.com/b/typescript/archive/2015/11/03/what-about-async-await.aspx)). So you can use those language features right now in a modern JavaScript project setup.

Of course the JavaScript ecosystem/community is going through a tremendous development and learning process right now. We are slowly getting the new features piece by piece and figuring out how to use them ... while that slow metamorphosis process can be healthy, it can also be painful... 

In the future, once JavaScript has completed it's metamorphosis, people might legitimately ask why we did not just integrate C# or Java into the browsers ... ?
