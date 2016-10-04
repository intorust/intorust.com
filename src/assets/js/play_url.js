// fetch exercises even before user clicks on any link!
(function(window, document) {
  "use strict";

  function get(path) {
    var basePath = "/exercises/";
    var xhr = new XMLHttpRequest();
    xhr.open("get", basePath + path, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        sendToPlay(xhr.responseText);
      }
    };
    xhr.send();
  }

  function sendToPlay(code) {
    var uri = "https://play.rust-lang.org?version=nightly";
    uri += "&code=" + encodeURIComponent(code);
    window.open(uri, "_blank");
  }

  window.playUrl = function playUrl(msg) {
    console.log(msg);
    get(msg);
    // var exerciseLinks = document.querySelectorAll('[data-exercise-uri]');
    //     var exerciseUri = ev.target.getAttribute('data-exercise-uri');
    //     get(exerciseUri);

    // exerciseLinks.forEach(function(link, i) {
    //   link.addEventListener("click", function(ev) {
    //     ev.preventDefault();
    //     var exerciseUri = ev.target.getAttribute('data-exercise-uri');
    //     get(exerciseUri);
    //   });
    // });
  }

  document.addEventListener("DOMContentLoaded", function() {
    // playUrl();
  });

})(window, document);
