let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-background', {
    videoId: 'pbDXHlAuAys', // The YouTube video ID
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 1,
      mute: 1,
      start: 30, // Start the video at 30 seconds
      playlist: 'pbDXHlAuAys'
    },
    events: {
      onReady: function(e) {
        e.target.mute();
        e.target.playVideo();
      },
      onStateChange: function(event) {
        if (event.data === YT.PlayerState.ENDED) {
          event.target.playVideo();
        }
      }
    }
  });
}

function loadYouTubeIframeAPI() {
  let tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  let firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

document.addEventListener('DOMContentLoaded', loadYouTubeIframeAPI);