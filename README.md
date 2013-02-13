# Reveal REPL

A REPL plugin for [reveal.js](https://github.com/hakimel/reveal.js/).
If you have JavaScript code examples in your slides, you can run them
by pressing F8.

## Instructions

Copy `repl.js` into the folder `plugin/repl/` of your reveal.js
presentation and add the plugin as a dependency in your `index.html`,
like so :

```js
{ src: 'plugin/repl/repl.js', condition: function() { return !!document.querySelector('code.eval'); } },
```

If you have JavaScript code examples like this in your slide, then
press F8 to have the results written in the `echo` code block.

```html
<pre><code class="eval language-javascript" contenteditable>
  var A = { x:2 };
  A.x;
</code></pre>
<pre><code class="echo language-javascript"> </code></pre>
```
