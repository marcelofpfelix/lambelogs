
  console.log('Client-side code running');

  // Function to change the content of t2
  function modifyText(new_text) {
    var t2 = document.getElementById("t2");
    t2.firstChild.nodeValue = new_text;
  }

    // event listener to check when the DOM finished loading.
  document.addEventListener('DOMContentLoaded', function () {
    // Add event listener to table with an arrow function
    var el = document.getElementById("outside");
    el.addEventListener("click", () => { modifyText("four"); }, false);

    function e(e) {
      clearTimeout(a), a = setTimeout(function() {
        s()
      }, 200)
    }

    function s() {
        u.innerHTML = l.value;
    }



    var a, l = document.querySelector("#input"),
        u = document.querySelector("#result");
    l.addEventListener("input", e, !1), s(), l.select()



  });
