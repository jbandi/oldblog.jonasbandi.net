---
layout: post
title: JavaScript Tip - Cross-Platform Issues with NPM Scripts    
main_image: https://farm2.staticflickr.com/1502/25338298114_7bedb619da_z.jpg
thumbnail: https://c2.staticflickr.com/2/1502/25338298114_7bedb619da_q.jpg
---

In a current project we are using [npm as our build tool (no Gulp nor Grunt)](http://blog.keithcirkel.co.uk/why-we-should-stop-using-grunt/).

I have very good experiences with the cross-platform story of npm. When I am [teaching my JavaScript & Angular courses](http://www.ivorycode.com/#schulung), many of my demos and examples are based on npm. Typically participants have no issues at all to get the demos and examples running on their machines, independently of the used OS.

In our project however we ran into annoying little cross-platform issue with npm scripts.

We are developing on Windows machines but our continuous build server (Jenkins) is running on Linux.

One of our npm script triggers [eslint](http://eslint.org/) to analyze the JavaScript sources:


    // package.json
    ...
    "scripts": {
      ...
      "analyze": "eslint src/js/**/*",
      ...
    },
    ...

This worked well on Windows (from within WebStorm, from a cmd shell and also from [babun](http://babun.github.io/)).

Unfortunately it **did not work on our Linux** build server (using bash). The worst part about it was that the command did not throw an error but the linting process just never reported any problems ...

I suspect the path was not properly passed to eslint.

The problem could be fixed on Linux by changing the npm script like this:

    // package.json
    ...
    "scripts": {
      ...
      "analyze": "eslint 'src/js/**/*'",
      ...
    },
    ...

_(note the extra single quotes around the path)_


Running the npm script on Linux worked now (eslint found actual problems). With the additional quotes, somehow the path now got correctly passed to eslint ...
Unfortunately the above script **did not work on Windows any more**. Now eslint on Windows did not find any problems any more ... somehow the additional quotes had probably the effect, that eslint did not get the correct path (again the behavior was consistent accross WebStorm, cmd shell and babun).

Bummer!

The **final fix that currently works on Linux and Windows** looks like this:

      // package.json
    ...
    "scripts": {
      ...
      "analyze": "eslint \"src/js/**/*\"",
      ...
    },
    ...

_(note the escaped double quotes around the path)_

Now it seems that the correct path is passed to eslint from npm running on both Windows or Linux ... something on the way between npm and eslint seems to need some escaping-help :-(

We are using npm 2.14.4 and eslint 2.3.0.
