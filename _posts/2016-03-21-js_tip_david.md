---
layout: post
title: JavaScript Tip - Managing npm dependencies with david
main_image: https://farm2.staticflickr.com/1502/25338298114_7bedb619da_z.jpg
thumbnail: https://c2.staticflickr.com/2/1502/25338298114_7bedb619da_q.jpg
---

[David](https://david-dm.org/) is a neat tool to manage your npm dependencies.

To use it conveniently on the commandline you have to [install david globally with npm](https://www.npmjs.com/package/david):

    npm install -g david

Now you can go into you project and get a report on your dependencies:

    david
    
And david gives you a nice report:

    ~/Dev/MyBitbucket/javascriptworkshop-master/32-ReactNative/00-ReactIntro/01-Todo
    ✔ david                                                                                  master 4749ab6
    dependencies
    
    ┌───────────┬─────────┬────────┐
    │ Name      │ Package │ Latest │
    ├───────────┼─────────┼────────┤
    │ react-dom │ 0.14.6  │ 0.14.7 │
    ├───────────┼─────────┼────────┤
    │ react     │ 0.14.6  │ 0.14.7 │
    └───────────┴─────────┴────────┘
    
    npm install --save react-dom@0.14.7 react@0.14.7
    
    devDependencies
    
    ┌──────────────────────┬─────────┬─────────┐
    │ Name                 │ Package │ Latest  │
    ├──────────────────────┼─────────┼─────────┤
    │ babel-preset-stage-0 │ 6.3.13  │ 6.5.0   │
    ├──────────────────────┼─────────┼─────────┤
    │ babel-core           │ 6.3.26  │ 6.7.2   │
    ├──────────────────────┼─────────┼─────────┤
    │ babel-preset-react   │ 6.3.13  │ 6.5.0   │
    ├──────────────────────┼─────────┼─────────┤
    │ babel-preset-es2015  │ 6.3.13  │ 6.6.0   │
    ├──────────────────────┼─────────┼─────────┤
    │ babel-loader         │ 6.2.1   │ 6.2.4   │
    ├──────────────────────┼─────────┼─────────┤
    │ webpack-dev-server   │ 1.14.0  │ 1.14.1  │
    ├──────────────────────┼─────────┼─────────┤
    │ webpack              │ 1.12.10 │ 1.12.14 │
    └──────────────────────┴─────────┴─────────┘
    
    npm install --save-dev babel-preset-stage-0@6.5.0 babel-core@6.7.2 babel-preset-react@6.5.0 babel-preset-es2015@6.6.0 babel-loader@6.2.4 webpack-dev-server@1.14.1 webpack@1.12.14
    
Notice the commands that david prepares for you to copy-paste to actually perform an update to the latest stable versions of each outdated package.

With `david update` you can also update the packages in one shot ...