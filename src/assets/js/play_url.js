(function (window, document) {
  "use strict";

  var EXERCISES_PATH = "/exercises";
  var PLAY_HOST = "https://play.rust-lang.org";
  var RUST_VERSION = "nightly";
  var HOME_URL = window.location.protocol + "//" + window.location.host + "/";

  document.addEventListener("DOMContentLoaded", function() {
    playUrl();
  });

  function playUrl() {
    var exerciseLinks = document.querySelectorAll("[data-exercise-uri]");

    exerciseLinks.forEach(function(link) {
      var exerciseUri = link.getAttribute("data-exercise-uri");
      fetchExercise(exerciseUri, function(code) {
        // Replace link's href with Play URL:
        link.href = PLAY_HOST + "?version=" + RUST_VERSION +
          "&code=" + encodeURIComponent(addTransformations(code));
        // Remove class giving a visual cue, that something's changed:
        link.className = link.className.replace(/exercise-link-loading/, "");
      });
    });
  }

  function fetchExercise(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", EXERCISES_PATH + "/" + path, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send();
  }

  function addTransformations(text) {
    var solutionRegex = /\/\/ START SOLUTION\s*(.*)\s*\/\/ END SOLUTION/g;
    var promptRegex = /\/\/\s*PROMPT\s*(.*)/g

    text = text.replace("http://home\.url/", HOME_URL);
    if (/PROMPT/.test(text)) {
      if (promptRegex.test(text)) {
        text = text.replace(promptRegex, "$1");
      } else {
        console.error("PROMPT keyword found but the actual match failed");
      }
    }

    if (/START|END|SOLUTION/.test(text)) {
      if (solutionRegex.test(text)) {
        text = text.replace(solutionRegex, "");
      } else {
        console.error("START|END|SOLUTION keyword(s) found but the actual match failed");
      }
    }

    return text;
  }

})(window, document);
