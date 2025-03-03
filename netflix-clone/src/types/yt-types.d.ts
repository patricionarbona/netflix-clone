// src/yt-types.d.ts

export interface YouTubePlayerOptions {
    videoId: string;
    playerVars?: YouTubePlayerVars;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }
  
  export interface YouTubePlayerVars {
    autoplay?: 0 | 1; // 0 = no autoplay, 1 = autoplay
    mute?: 0 | 1; // 0 = unmute, 1 = mute
    controls?: 0 | 1 | 2; // 0 = hide controls, 1 = show controls, 2 = show controls but hide video
    disablekb?: 0 | 1; // 0 = keyboard enabled, 1 = disabled
    showinfo?: 0 | 1; // 0 = hide info, 1 = show info
    modestbranding?: 0 | 1; // 0 = use YouTube branding, 1 = no branding
    rel?: 0 | 1; // 0 = no related videos at the end, 1 = related videos at the end
    [key: string]: string | number | boolean | undefined; // Permite valores adicionales de tipo string, number o boolean
  }
  
  export interface YouTubePlayer {
    new (elementId: string | HTMLElement, options: YouTubePlayerOptions): YouTubePlayerInstance;
  }
  
  export interface YouTubePlayerInstance {
    playVideo(): void;
    pauseVideo(): void;
    mute(): void;
    unMute(): void;
    destroy(): void;
  }
  
  export interface PlayerEvent {
    target: YouTubePlayerInstance;
  }
  
  export interface OnStateChangeEvent {
    target: YouTubePlayerInstance;
    data: number;
  }
  
  export enum PlayerState {
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5,
  }
  
  declare global {
    interface Window {
      YT: {
        Player: YouTubePlayer;
        PlayerState: typeof PlayerState;
      };
      onYouTubeIframeAPIReady: () => void;
    }
  }
  
  export {};
  