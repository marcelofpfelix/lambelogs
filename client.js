// client script

function syntaxHighlight(json) {
  console.debug('syntaxHighlight(json) function start');

  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}

function start(str) {
  console.debug('start(str) function start');

  var output = [];
  var outputText = [];
  var worker = new Worker('dowork.js');
  var output_text = document.querySelector("#result");

  // clean output div
  output_text.innerHTML = "";

  //split string per /\n/
  var lines = str.split(/\n/);
  console.debug('lines:' + lines);

  // worker return
  worker.onmessage = function(e) {
    var data = JSON.parse(e.data);
    var i = parseInt(data.i, 10);
    var iterations = parseInt(data.iterations, 10);

    if (i == iterations) {
      worker.terminate();
    }

    //set the progressbar.set
    progressbar.set(i);

    output_text.innerHTML += '# ' + i + data.str;
    write_result.set(data.json);

    worker.postMessage(JSON.stringify({
      i: i,
      iterations: iterations,
      str: lines[i],
      json: null
    }));
  }

  var iterations = lines.length;

  progressbar.progress_max = iterations;
  worker.postMessage(JSON.stringify({
    i: 0,
    iterations: iterations,
    str: lines[0],
    json: null
  }));

}


console.debug('client.js: script start');

var progressbar = {};
$(function() {
  progressbar = {
    /** initial progress */
    progress: 0,
    /** maximum width of progressbar */
    progress_max: 0,
    /** The inner element of the progressbar (filled box). */
    $progress_bar: $('#progressbar'),

    /** Method to set the progressbar.  */
    set: function(num) {
      if (this.progress_max && num) {
        this.progress = num / this.progress_max * 100;
        console.debug('percent: ' + this.progress + '% - ' + num + '/' + this.progress_max);

        this.$progress_bar.width(String(this.progress) + '%');
      }
    }
  };
});


var write_result = {};
$(function() {
  write_result = {
    output_text: document.querySelector("#result"),

    set: function(str) {
      if (str) {

        try {
          str = JSON.parse(str);
          console.debug('else: ' + str);
          str = JSON.stringify(str, null, 2);
          this.output_text.innerHTML += '\n################################################################################\n';
          this.output_text.innerHTML += syntaxHighlight(str) + '\n';
          this.output_text.innerHTML += '################################################################################\n';
        } catch (e) {
          console.debug('line is invalid: ' + e + str);
          this.output_text.innerHTML += ': ' + e + str + '\n';
        }
      }
    }
  };
});

// detect a fully-loaded page
window.onload = function() {

  function timer() {
    clearTimeout(timer_id), timer_id = setTimeout(function() {
      start(input_text.value)
    }, 2000)
  }

  var timer_id, input_text = document.querySelector("#input");
  var output_text = document.querySelector("#result");

  input_text.addEventListener("input", timer, !1), start(input_text.value), input_text.select()

}
