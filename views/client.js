
console.log('Client-side code running');

  // event listener to check when the DOM finished loading.
document.addEventListener('DOMContentLoaded', function () {

  function timer() {
    clearTimeout(asd), asd = setTimeout(function() { write_output() }, 200)
  }

  function write_output() {
      output_text.innerHTML = input_text.value;


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
