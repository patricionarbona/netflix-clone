import { useEffect, useRef, useState } from "react";
import { YouTubePlayerInstance, OnStateChangeEvent } from "./yt-types"; // Asegúrate de importar las interfaces correctamente

const YouTubePlayer = ({
  videoId,
  onEnd,
  onMuted,
}: {
  videoId: string;
  onEnd?: () => void;
  onMuted?: boolean;
}) => {
  const iframeRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const [playerReady, setPlayerReady] = useState(false);

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

      playerRef.current = new window.YT.Player(iframeRef.current!, {
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

    function onPlayerReady() {
      console.log("El video está listo");
      setPlayerReady(true);
    }

    function onPlayerStateChange(event: OnStateChangeEvent) {
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
  }, [onEnd, videoId]);

  useEffect(() => {
    if (playerReady && playerRef.current) {
      if (playerRef.current && typeof playerRef.current.mute === "function") {
        if (onMuted) {
          playerRef.current.mute();
        } else {
          playerRef.current.unMute();
        }
      }
    }
  }, [onMuted, playerReady]);

  return (
    <div>
      <div className="player" ref={iframeRef}></div>
    </div>
  );
};

export default YouTubePlayer;
