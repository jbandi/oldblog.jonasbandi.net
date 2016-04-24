---
layout: post
title: JavaScript Tip - Using Gulp with TypeScript   
main_image: https://c6.staticflickr.com/2/1672/26603473125_2eef6ff2cf_z.jpg
thumbnail: https://c6.staticflickr.com/2/1672/26603473125_2eef6ff2cf_q.jpg
---

You can easily write your [Gulp](http://gulpjs.com/) tasks with [TypeScript](https://www.typescriptlang.org/).

This is achieved with [ts-node](https://github.com/TypeStrong/ts-node), the TypeScript environment for node.

The following steps set up a minimal project using Gulp with TypeScript:

```bash
npm install -g typings # the easiest way to have typings available
mkdir ts-gulp-experiment
cd ts-gulp-experiment
npm init -y
npm install --save-dev ts-node typescript gulp
typings install gulp --save
typings install node --ambient --save
touch tsconfig.json
touch gulpfile.ts
```

Next you need to provide the configuration for the TypeScript compiler in `tsconfig.json`:

    {
      "compilerOptions": {
        "noFallthroughCasesInSwitch": true
      },
      "exclude": [
        "node_modules",
        "dist",
        "typings/browser.d.ts",
        "typings/browser",
        "src"
      ]
    }


Now you can write your build-tasks in TypeScript in `gulpfile.ts`:

```JavaScript
import * as gulp from 'gulp';
gulp.task('test', () => {
	  console.log('Gulp is running!');
});
```

Voila, you get type-checking and editor-support by TypeScript while writing your build-tasks.

While this looks nice on the first glance, on second thought I don't see much benefits in using TypeScript in your build-tasks...

I believe your build should be simple enough so that typical arguments for TypeScript (big code base with many execution paths, long-term maintenance, refactoring ...) are not applicable.
If you change your build and your build still runs successfully, you can be confident, that your changes are ok.

On the other hand, changing a build should be possible with the least amount of friction. And TypeScript introduces more friction, the friction comes mostly from providing typings for each 3rd-party plugin you are using (this is optional, but if you don't do it, you don't get the benefits of TypeScript). This adds complexity since most plugins do not provide those typings, so you have to get them from somewhere else (i.e. the [DefinitelyTyped repo](https://github.com/DefinitelyTyped/DefinitelyTyped)). This introduces yet another dependency and for some plugins you don't find any typings at all (i.e. `gulp-jshint`).

In my opinion this is not worth it, so I stay with plain gulp or [gulp with ES6](https://markgoodyear.com/2015/06/using-es6-with-gulp/).

I found out about Gulp with TypeScript while studying the [mgechev/angular2-seed](https://github.com/mgechev/angular2-seed) project.
