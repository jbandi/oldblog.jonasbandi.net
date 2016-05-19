---
layout: post
title: JavaScript Tip - QuickLook for TypeScript   
main_image: https://c6.staticflickr.com/2/1672/26603473125_2eef6ff2cf_z.jpg
thumbnail: https://c6.staticflickr.com/2/1672/26603473125_2eef6ff2cf_q.jpg
---

[QuickLook](https://en.wikipedia.org/wiki/Quick_Look) is a very productive feature in OSX for me.

It is very convenient to quickly look into a file from the filesystem without  having to open an editor:

![](http://imgur.com/tfYQHzs.png)

There are a [many QuickLook plugins](https://github.com/sindresorhus/quick-look-plugins) that make my life easier as a developer by providing improved rendering for code files.

Unfortunately QuickLook does not work with [TypeScript](https://www.typescriptlang.org/) files which end with the `.ts` extension.

The `.ts` extension is associated with [MPEG2 transport streams](https://en.wikipedia.org/wiki/MPEG_transport_stream) on OSX. As a consequence QuickLook tries to preview TypeScript files as videos with the corresponding QuickTime plugin.

This is especially unfortunate, since Angular 2 gains momentum and it promotes the usage of TypeScript.

Here is how I got QuickLook working to display TypeScript files as raw text:

Remove the file `Movie.qlgenerator`from the directory `/System/Library/QuickLook`. If you still want QuickLook support for movies, you can put the above file into `~/Library/QuickLook`.

The above step got a bit tricky in OSX El Capitan, since it is not possible to simply remove a file from `/System/Library/QuickLook` (probably because of [System Integrity Protection](https://en.wikipedia.org/wiki/System_Integrity_Protection)).

I managed to remove the `Movie.qlgenerator` with the following steps:

- Back up the file first
- Boot into Recovery Mode: Restart and press-and-hold Cmd-R
- Open a terminal
- disable SIP: `csrutil disable`
- cd `/Volumes/Macintosh HD/System/Library/QuickLook` (your volume name may be different)
- `rm -rf Movie.qlgenerator`
- `csrutil enable`
- `csrutil status` -> Verify SIP is turned on again
- restart

After the above steps I could quick-look my `.ts` files:

![](http://i.imgur.com/KPCgExN.png)


The post is a result of [my answer on StackOverflow](http://stackoverflow.com/questions/30950782/change-custom-extension-type-in-mac/32429068#32429068).
