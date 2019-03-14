// clint script

console.debug('client.js: script start');

function rubyhash2json(str) {
  console.debug('rubyhash2json(str) function start');


  //extra remove

  str = str.replace(/^(.*?) Emitting \w* event: (.*)/g, '$2');


  console.debug(str);
    // replace symbol {:symbol=> to {"symbol"=>
  str = str.replace(/(([{,]\s*)[:]([^>\s\[\]]+)|([{,]\s*)([0-9]+\.?[0-9]*))\s*=>/g, '$2$4"$3$5"=>');
  console.debug(`regex 1`);
  console.debug(str);
  // replace {,'a' to {,"a"
  str = str.replace(/([{,]\s*)'(.+?)'\s*=>/g, '$1"$2"=>');
  console.debug(`regex 2`);
  console.debug(str);
  // replace =>'a' to :"a"
  str = str.replace(/=>\s*'([^,}\s]+\s*)'/g, '=> "$1"');
  console.debug(`regex 3`);
  console.debug(str);
    // replace value {"symbol"=>:value to {"symbol"=>"value"
  str = str.replace(/([{,]\s*)(".+?"|[0-9]+\.?[0-9]*)\s*=>\s*:([^,}\s]+\s*)/g, '$1$2=>"$3"');
  console.debug(`regex 4`);
  console.debug(str);
    // replace array [:a, :b] to ["a","b"]
  str = str.replace(/([\[,]\s*):([^,\]\s]+)/g, '$1"$2"');
  console.debug(`regex 5`);
  console.debug(str);
    // replace nil to null
  str = str.replace(/=>nil/g, '=>null');
  console.debug(`regex 6`);
  console.debug(str);
    // replace => to :
  str = str.replace(/([{,]\s*)(".+?"|[0-9]+\.?[0-9]*)\s*=>/g, "$1$2:");
  console.debug(`regex 7`);
  console.debug(str);

  return str;
}


function write_output2(inp) {
  document.body.appendChild(document.createElement('pre')).innerHTML = inp;
}

function syntaxHighlight(json) {
  console.debug('syntaxHighlight(json) function start');

  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
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


function split_lines(output_text, str) {
  console.debug('split_lines(str) function start');

  var output = [];
  var outputText = [];

  output_text.innerHTML = "";
  var lines = str.split(/\n/);
  console.log('lines:'+lines);

  for (var i = 0; i < lines.length; i++) {
    var str = rubyhash2json(lines[i]);
    str = JSON.parse(str);
    str = JSON.stringify(str, null, 2);

    // only push this line if it contains a non whitespace character.
    // if (/\S/.test(lines[i])) {
    //   outputText.push('">>>>' + $.trim(lines[i]) + '<<<<"');
    //   output.push($.trim(lines[i]));
    // }
    output_text.innerHTML += '\n#################################################\n';
    output_text.innerHTML += '#                       '+i;
    output_text.innerHTML += '\n#################################################\n';
    output_text.innerHTML += syntaxHighlight(str);
  }
  console.log(str);
  return str;
}


function process(input_text, output_text) {
  var outputText = [];
  outputText = split_lines(output_text, input_text.value);

  //$('.alert').removeClass('alert-info').addClass('alert-success').text('Done!')

}

  // event listener to check when the DOM finished loading.
document.addEventListener('DOMContentLoaded', function () {

  function timer() {
    clearTimeout(timer_id), timer_id = setTimeout(function() { process(input_text, output_text) }, 200)
  }

  var timer_id, input_text = document.querySelector("#input");
  var output_text = document.querySelector("#result");

  input_text.addEventListener("input", timer, !1), process(input_text, output_text), input_text.select()
  process(input_text, output_text);
});
