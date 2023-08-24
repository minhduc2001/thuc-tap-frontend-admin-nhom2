import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({
  m3u8Url,
  token,
  options,
  onReady,
}: {
  m3u8Url: string;
  token: string;
  options: any;
  onReady: any;
}) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  useEffect(() => {
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      // @ts-ignore
      videoRef.current.appendChild(videoElement);
      // @ts-ignore
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        // @ts-ignore
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      // @ts-ignore
      player.autoplay(options.autoplay);
      // @ts-ignore
      player.src(options.sources);
    }
    // @ts-ignore
    // const player = videojs(videoNode.current);

    // // Tùy chỉnh header request với token
    // player.on('beforeRequest', (options: any) => {
    //   options.headers = {
    //     ...options.headers,
    //     // Authorization: `Bearer ${token}`,
    //   };
    // });

    // player.src({
    //   src: 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8',
    //   type: 'application/x-mpegURL',
    // });

    // player.autoplay();

    // return () => {
    //   if (player) {
    //     player.dispose();
    //   }
    // };
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      // @ts-ignore
      if (player && !player.isDisposed()) {
        // @ts-ignore
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className='video-js'></video>
    </div>
  );
};

export default VideoPlayer;
