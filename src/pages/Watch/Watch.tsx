import { DiscussionEmbed } from 'disqus-react';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaHamburger } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';

import useMoreInfo from '../../hooks/useMoreInfo';
import useServers from '../../hooks/useServers';
// import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { getAnimeLink, getEpisodeNumber, getNextEpisode, getPreviousEpisode } from '../../utils/utils';

export const Watch: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const serverList = useServers(id);
  // const videoElement = useRef<HTMLVideoElement>(null);
  // const { playerState, togglePlay, handleOnTimeUpdate, handleVideoProgress, handleVideoSpeed, toggleMute } =
  //   useVideoPlayer(videoElement);
  const { information } = useMoreInfo(getAnimeLink(id));
  const [serverLink, setServerLink] = useState<string>(serverList.defaultServerUrl);

  useEffect(() => {
    setServerLink(serverList.defaultServerUrl);
  }, [serverList.defaultServerUrl]);

  const disqusShortname = process.env.REACT_APP_SHORTNAME!;

  const disqusConfig = {
    url: `https://squishanime.net${location.pathname}`,
    identifier: id,
    title: `${information.title} ${getEpisodeNumber(id)}`,
  };

  const notWorkingServers = ['fembed'];

  function RenderServers() {
    return serverList.servers.map((item: { url: string; name: string }, index: number) => {
      const { name, url } = item;

      if (!notWorkingServers.includes(name)) {
        return (
          <button
            type="button"
            key={index}
            className="
              px-6
              py-2
              border-2 border-white 
              text-white
              font-medium
              text-xs
              leading-tight
              uppercase
              hover:bg-black hover:bg-opacity-5
              focus:outline-none focus:ring-0
              transition
              duration-150
              ease-in-out
            "
            onClick={() => setServerLink(url)}
          >
            {name}
          </button>
        );
      }
    });
  }

  return (
    <div className="p-6 flex flex-col items-center justify-between">
      <h4 className="text-4xl font-medium leading-tight mt-0 mb-2 text-white">
        {information.title} - {getEpisodeNumber(id)}
      </h4>
      <div className="flex justify-start items-center w-full my-2">
        <div className="inline-flex overflow-auto" role="group">
          {RenderServers()}
        </div>
      </div>
      {/* <div className="video-container">
        <div className="video-wrapper">
          <video src={serverLink} ref={videoElement} onTimeUpdate={handleOnTimeUpdate} />
          <div className="controls">
            <div className="actions">
              <button onClick={togglePlay}>
                {!playerState.isPlaying ? <i className="bx bx-play"></i> : <i className="bx bx-pause"></i>}
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={playerState.progress}
              onChange={(e) => handleVideoProgress(e)}
            />
            <select className="velocity" value={playerState.speed} onChange={(e) => handleVideoSpeed(e)}>
              <option value="0.50">0.50x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="2">2x</option>
            </select>
            <button className="mute-btn" onClick={toggleMute}>
              {!playerState.isMuted ? <i className="bx bxs-volume-full"></i> : <i className="bx bxs-volume-mute"></i>}
            </button>
          </div>
        </div>
      </div> */}
      <iframe
        sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
        width="1000"
        height="600"
        src={serverLink}
        frameBorder="0"
        allow="encrypted-media"
        allowFullScreen
        title={information.title}
      />
      <div className="mx-auto flex">
        {getEpisodeNumber(id) > 1 && (
          <Link to={`../ver/${getPreviousEpisode(id)}`} className="p-2">
            <FaArrowLeft color="#FFFFFF" className="text-3xl" />
          </Link>
        )}{' '}
        <Link to={`../anime/${getAnimeLink(id)}`} className="p-2">
          <FaHamburger color="#FFFFFF" className="text-3xl" />
        </Link>
        {getEpisodeNumber(id) + 1 <= information.totalEpisodes && (
          <Link to={`../ver/${getNextEpisode(id)}`} className="p-2">
            <FaArrowRight color="#FFFFFF" className="text-3xl" />
          </Link>
        )}
      </div>
      <div className="w-full">
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    </div>
  );
};
