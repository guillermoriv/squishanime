import { useState, useEffect, RefObject } from 'react';

export function useVideoPlayer(videoElement: RefObject<HTMLVideoElement>) {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    speed: 1,
    isMuted: false,
  });

  function togglePlay() {
    setPlayerState({ ...playerState, isPlaying: !playerState.isPlaying });
  }

  function handleOnTimeUpdate() {
    const progress = (videoElement.current!.currentTime / videoElement.current!.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
    });
  }

  function handleVideoProgress(event: any) {
    const manualChange = Number(event.target.value);
    videoElement.current!.currentTime = (videoElement.current!.duration / 100) * manualChange;
    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  }

  function handleVideoSpeed(event: any) {
    const speed = Number(event.target.value);
    videoElement.current!.playbackRate = speed;
    setPlayerState({
      ...playerState,
      speed,
    });
  }

  function toggleMute() {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  }

  useEffect(() => {
    playerState.isMuted ? (videoElement.current!.muted = true) : (videoElement.current!.muted = false);
  }, [playerState.isMuted, videoElement]);

  useEffect(() => {
    playerState.isPlaying ? videoElement.current!.play() : videoElement.current!.pause();
  }, [playerState.isPlaying, videoElement]);

  return {
    playerState,
    togglePlay,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    toggleMute,
  };
}
