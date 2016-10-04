(function(window, document) {
  "use strict";

  function get(path) {
    var basePath = "/exercises/";
    var xhr = new XMLHttpRequest();
    xhr.open("get", basePath + path, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send();
  }

  function playUrl() {
    var exerciseLinks = document.querySelectorAll('[data-exercise-uri]');

    exerciseLinks.forEach(function(link, i) {
      var exerciseUri = link.getAttribute('data-exercise-uri');
      get(exerciseUri);
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    playUrl();
  });

})(window, document);
