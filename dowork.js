function clean_rubbish(str) {
  console.debug('clean_rubbish(str) function start');
  var invalid;

  //extra  remove rubbish before { and after }
  var pattern = /^(.*?)({.*})(.*)/g;

  console.debug('test: ' + !str.match(pattern));
  rubbish = ': ' + str.replace(pattern, '$1 | $3');
  // if invalid
  if (!str.match(pattern)) {
    str = null;
  } else {
    str = str.replace(pattern, '$2');
  }

  return {
    str: str,
    rubbish: rubbish
  }
}

function loop(e) {
  var data = JSON.parse(e.data);

  var i = parseInt(data.i, 10);
  var iterations = parseInt(data.iterations, 10);


  i++;
  if (i <= iterations) {


    var str = rubyhash2json(data.str);

    var data = clean_rubbish(str);

    console.debug('data.str: ' + data.str);
    console.debug('data.rubbish: ' + data.rubbish);

    self.postMessage(JSON.stringify({
      i: i,
      iterations: iterations,
      str: data.rubbish,
      json: data.str
    }));
  }
}

self.onmessage = function(e) {
  importScripts('https://cdn.jsdelivr.net/gh/marolive/rubyhash2json@master/rubyhash2json.js');
  loop(e);
};
