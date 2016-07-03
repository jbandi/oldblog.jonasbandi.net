https://docs.google.com/document/d/150lerb1LmNLuau_a_EznPV1I1UHMTbEl61t4hZ7ZpS0
-> July 7, 2014
because of two way data-binding it's not clear what how the data flows because it can flow in all directions (including from child components to parents) - this makes it hard to understand the app and understand of impact of model changes in one part of the app on another (seemingly unrelated) part of it.




https://github.com/emberjs/rfcs/pull/15

We have since realized (with some help from our friends at React), that components want to be able to hand out data to their children without having to be on guard for wayward mutations.

Additionally, communication between components is often most naturally expressed as events or callbacks. This is possible in Ember, but the dominance of two-way data bindings often leads people down a path of using two-way bindings as a communication channel. Experienced Ember developers don't (usually) make this mistake, but it's an easy one to make.


http://programmers.stackexchange.com/questions/225400/pros-and-cons-of-facebooks-react-vs-web-components-polymer/237762#237762