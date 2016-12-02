function evalCode(slide) {
	var code = slide.querySelector('code.eval');
	var echo = slide.querySelector('code.echo');

	Object.prototype.toString = function() {
		return JSON.stringify(this, null, 2);
	}

	Object.setPrototypeOf = function(obj, proto) {
		obj.__proto__ = proto;
	};

	if (code) {
      var content = code.textContent.split('\n');
      console.log(code.textContent);
      code.textContent = "";
      for(let line of content){
        line = line.split("//")[0].trim();
        var output = "";
        try {
          output = eval(line);
        } catch (error) {
          output = error;
        }
        code.textContent += line;
        code.textContent += output ? " // " + output : "";
        code.textContent += "\n";
      }
      hljs.highlightBlock(code);
      setCaret(code);
	}
}

function setCaret(code) {
  code.focus();
  var caret = code.textContent.length - 1; // insert caret after the 10th character say
  var range = document.createRange();
  range.setStart(code, caret);
  range.setEnd(code, caret);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

document.addEventListener('keydown', function(event) {
	if (event.which == 13) {
		evalCode(Reveal.getCurrentSlide());
    e.preventDefault();
  }

	// Hitting Page Up or Page Down when in a content editable box messes
	// up the layout.  Fix by disabling these keys.
	if (event.which == 33 || event.which == 34)
		event.preventDefault();
});

// eval all code block with class 'preload'
document.addEventListener('DOMContentLoaded', function() {
	var nodes = document.querySelectorAll('code.preload');
	for (var i = 0; i < nodes.length; ++i) {
		evalCode(nodes[i].parentNode.parentNode);
	}
});
