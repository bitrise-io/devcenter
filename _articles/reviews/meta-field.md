---
title: 'Meta field '
date: 2018-10-09 11:04:33 +0000
redirect_from: []
published: false

---
 You can create your unique customization for any step if you add an the `meta` class to `opts` in your yml. You can customize the yml content of any step input or env var Workflow Editor by adding a `meta` class after `opts` ..

The standard env var yml has looked like this so far:

> KEY: "VALUE",
>
> opts: {
>
>   title: "My env var"
>
>   description: "Description of my env var, which is long."
>
>   summary: "Summary of env var."
>
>   ...
>
> }