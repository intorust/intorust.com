// Based on https://developers.google.com/youtube/iframe_api_reference
var player;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  console.log("onYouTubeIframeAPIReady");
  player = new YT.Player('player', {
    height: HEIGHT,
    width: WIDTH,
    videoId: VIDEO_ID,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
}

window.onload = function() {
  initLink("link1x", 1);
  initLink("link1_5x", 1.5);
  initLink("link2x", 2);

  function initLink(id, speed) {
    var a = document.getElementById(id);
    a.onclick = function() {
      player.setPlaybackRate(speed);
      return false;
    };
  }
};
