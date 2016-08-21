function autoplay() {
  function createPlayer(info) {
    let player = new YT.Player(info.id, {
      videoId: info.videoId,
      events: {
        'onReady': onPlayerReady,
        'onError': onPlayerError
      }
    });
  }

  function onPlayerReady(event) {
    event.target.setVolume(100);
    event.target.playVideo();
  }

  function onPlayerError(eventError) {
    console.error(eventError);
  }

  function applyPlayer() {
    const targets = Array.from(document.querySelectorAll('[data-autoplay]'));

    targets.map(item => {
      const id = item.id;
      const videoId = item.getAttribute('data-video-id');

      createPlayer({ id, videoId })
    })
  }

  function createScriptElement() {
    let firstScriptTag;
    let tag = document.createElement('script');
        tag.src = 'http://www.youtube.com/player_api';

    firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  return { applyPlayer, createScriptElement }
}

// Required by youtube API
function onYouTubeIframeAPIReady() {
  autoplay().applyPlayer();
}

autoplay().createScriptElement();
