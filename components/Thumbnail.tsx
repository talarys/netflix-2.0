import React from 'react';
import Image from 'next/image';
import { useSetRecoilState } from 'recoil';
import { Movie } from '../typings';
import { modalState, movieState } from '../atoms/modalAtom';

interface Props {
  movie: Movie;
}

function Thumbnail({ movie }: Props) {
  const setCurrentMovie = useSetRecoilState(movieState);
  const setShowModal = useSetRecoilState(modalState);
  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        onClick={() => {
          setShowModal(true);
          setCurrentMovie(movie);
        }}
      />
    </div>
  );
}

export default Thumbnail;
