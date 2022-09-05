import {
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ReactPlayer from 'react-player/lazy';
import { FaPlay } from 'react-icons/fa';
import { DocumentData } from 'firebase/firestore';
import { modalState, movieState } from '../atoms/modalAtom';
import { Genre, Movie, Trailer } from '../typings';
import { fetchMovieTrailer } from '../utils/request';

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const currentMovie = useRecoilValue<Movie | null | DocumentData>(movieState);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [muted, setMuted] = useState(true);

  function handleClose() {
    setShowModal(false);
  }

  useEffect(() => {
    if (!currentMovie) return;

    (async () => {
      const data = await fetchMovieTrailer(currentMovie).then((r) => r.json());

      const trailers = data?.videos?.results.filter(
        (t: Trailer) => t.type === 'Trailer',
      );

      setTrailer(trailers.length ? trailers[0] : data?.videos?.results[0]);

      if (data?.genres) setGenres(data.genres);
    })();
  }, [currentMovie]);

  if (!trailer) return null;
  return (
    <MuiModal
      className="fixed !top-7 left-0 right-0 mx-auto max-w-6xl overflow-hidden overflow-y-scroll scrollbar-hide"
      open={showModal}
      onClose={handleClose}
    >
      {/* Modal Container */}
      <div className="relative mx-5 overflow-hidden rounded-xl">
        {/* CloseButton */}
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none
          bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-6" />
        </button>
        {/* Player */}
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer.key}`}
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              pointerEvents: 'none',
            }}
            controls={false}
            playing
            loop
            muted={muted}
          />
        </div>
        {/* Buttons */}
        <div className="absolute bottom-5 flex w-full items-center justify-between px-10">
          <div className="flex space-x-2">
            {/* PlayButton */}
            <button className="font-semibold px-9 py-2 flex items-center gap-x-2 rounded bg-white text-black transition hover:bg-[#e6e6e6]">
              <FaPlay className="w-6 h-6" />
              Play
            </button>
            <button className="modalButton">
              <PlusIcon className="h-7 w-7" />
            </button>
            <button className="modalButton">
              <ThumbUpIcon className="h-7 w-7" />
            </button>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="w-7 h-7" />
              ) : (
                <VolumeUpIcon className="w-7 hs-7" />
              )}
            </button>
          </div>
        </div>
      </div>
    </MuiModal>
  );
}

export default Modal;
