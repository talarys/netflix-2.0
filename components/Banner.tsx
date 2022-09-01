import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { useSetRecoilState } from 'recoil';
import { Movie } from '../typings';
import { baseUrl } from '../constants/movie';
import { modalState } from '../atoms/modalAtom';

interface Props {
  netflixOriginals: Movie[]
}

function Banner({ netflixOriginals }:Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const setShowModal = useSetRecoilState(modalState);

  useEffect(() => {
    setMovie(netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]);
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-md">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button type="button" className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:w-7" />
          Play
        </button>
        <button onClick={() => setShowModal(true)} type="button" className="bannerButton bg-[gray]/70">
          <InformationCircleIcon className="h-6 w-6" />
          More Info
        </button>
      </div>
    </div>
  );
}

export default Banner;
