(function (root, factory) {
  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS-like
    exports = module.exports = factory(root, document);
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define('autoplay', factory);
  } else {
    // Browser globals (root is window)
    root.autoplay = factory(root, document);
  }
})(typeof window === 'undefined' ? this : window, function (window, document) {
  'use strict';

  function autoplay() {
    function createPlayer(info) {
      let player = new YT.Player(info.id, {
        videoId: info.videoId,
        events: {
          'onReady': onPlayerReady,
          'onError': onPlayerError
        }
      });

      return player;
    }

    function onPlayerReady(event) {
      console.info('onPlayerReady');
    }

    function onPlayerError(eventError) {
      console.error('onPlayerError:', eventError);
    }

    function applyPlayer() {
      const targets = Array.from(document.querySelectorAll('[data-you-play]'));

      targets.map(item => {
        const id = item.id;
        const videoId = item.getAttribute('data-video-id');
        const player = createPlayer({ id, videoId });

        watchClick('play', item, playTarget => {
          playTarget.onclick = () => {
            player.playVideo()
          }
        });

        watchClick('pause', item, pauseTarget => {
          pauseTarget.onclick = () => {
            player.pauseVideo()
          }
        });

        watchClick('stop', item, stopTarget => {
          stopTarget.onclick = () => {
            player.stopVideo()
          }
        });
      })
    }

    function watchClick(event, item, callback) {
      let eventTarget = item.getAttribute('data-you-' + event);

      eventTarget = document.querySelector(eventTarget);

      if (callback) {
        callback(eventTarget);
      }
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
  window.onYouTubeIframeAPIReady = function() {
    autoplay().applyPlayer();
  }

  autoplay().createScriptElement();
});
