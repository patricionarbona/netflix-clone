import React, { useEffect, useRef } from "react";

const YouTubePlayer = ({ videoId, onEnd, onMuted }) => {
  const iframeRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Verifica si la API de YouTube ya está cargada
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onload = () => {
        window.onYouTubeIframeAPIReady = initPlayer;
      };
      document.body.appendChild(script);
    } else {
      initPlayer();
    }

    function initPlayer() {
      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player(iframeRef.current, {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady(event) {
      console.log("El video está listo");
    }

    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.ENDED) {
        console.log("El video ha terminado");
        if (onEnd) onEnd();
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  useEffect(() => {
    if (playerRef.current) {
      if (onMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
      }
    }
  }, [onMuted]);

  return (
    <div>
      <div id="player" ref={iframeRef}></div>
    </div>
  );
};

export default YouTubePlayer;
