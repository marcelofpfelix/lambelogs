
console.log('Client-side code running');

function rubyhash2json(str) {

  //console.log(s);
  console.log(str);

    // replace symbol {:symbol=> to {"symbol"=>
  str = str.replace(/(([{,]\s*)[:]([^>\s\[\]]+)|([{,]\s*)([0-9]+\.?[0-9]*))\s*=>/g, '$2$4"$3$5"=>');
  console.log(`  1##########################################`);
  console.log(str);
  // replace {,'a' to {,"a"
  str = str.replace(/([{,]\s*)'(.+?)'\s*=>/g, '$1"$2"=>');
  console.log(`  7##########################################`);
  console.log(str);
  // replace =>'a' to :"a"
  str = str.replace(/=>\s*'([^,}\s]+\s*)'/g, '=> "$1"');
  console.log(`  8##########################################`);
  console.log(str);
    // replace value {"symbol"=>:value to {"symbol"=>"value"
  str = str.replace(/([{,]\s*)(".+?"|[0-9]+\.?[0-9]*)\s*=>\s*:([^,}\s]+\s*)/g, '$1$2=>"$3"');
  console.log(`  3##########################################`);
  console.log(str);
    // replace array [:a, :b] to ["a","b"]
  str = str.replace(/([\[,]\s*):([^,\]\s]+)/g, '$1"$2"');
  console.log(`  4##########################################`);
  console.log(str);
    // replace nil to null
  str = str.replace(/=>nil/g, '=>null');
  console.log(`  5##########################################`);
  console.log(str);
    // replace => to :
  str = str.replace(/([{,]\s*)(".+?"|[0-9]+\.?[0-9]*)\s*=>/g, "$1$2:");
  console.log(`  6##########################################`);
  console.log(str);

  return str;
}



  // event listener to check when the DOM finished loading.
document.addEventListener('DOMContentLoaded', function () {

  function timer() {
    clearTimeout(asd), asd = setTimeout(function() { write_output() }, 200)
  }

  function write_output() {


    console.log(input_text.value);

    s = rubyhash2json(input_text.value);

    output_text.innerHTML = s;

    var lines = $('#input').val().split(/\n/);
    var output = [];
    var outputText = [];
    for (var i = 0; i < lines.length; i++) {
      // only push this line if it contains a non whitespace character.
      if (/\S/.test(lines[i])) {
        outputText.push('">' + $.trim(lines[i]) + '<"');
        output.push($.trim(lines[i]));
      }
    }
    
    console.log(output);
    output_text2.innerHTML = outputText;
    $('#result2').val('[' + outputText + ']');
    $('.alert').removeClass('alert-info').addClass('alert-success').text('Done!')


  }

  var asd, input_text = document.querySelector("#input"),
     output_text = document.querySelector("#result");
  output_text2 = document.querySelector("#result2");
  input_text.addEventListener("input", timer, !1), write_output(), input_text.select()




});
