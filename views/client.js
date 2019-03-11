
console.log('Client-side code running');

  // event listener to check when the DOM finished loading.
document.addEventListener('DOMContentLoaded', function () {

  function timer() {
    clearTimeout(asd), asd = setTimeout(function() { write_output() }, 200)
  }

  function write_output() {
      output_text.innerHTML = input_text.value;
  }

  var asd, input_text = document.querySelector("#input"),
      output_text = document.querySelector("#result");
  input_text.addEventListener("input", timer, !1), write_output(), input_text.select()



});
