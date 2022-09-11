import {
  PlusIcon,
  HandThumbUpIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
  XMarkIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ReactPlayer from 'react-player/lazy';
import { FaPlay } from 'react-icons/fa';
import {
  collection,
  deleteDoc, doc, DocumentData, onSnapshot, setDoc,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { modalState, movieState } from '../atoms/modalAtom';
import { Genre, Movie, Trailer } from '../typings';
import { fetchMovieTrailer } from '../utils/request';
import useAuth from '../hooks/useAuth';
import { db } from '../lib/firebase';

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const currentMovie = useRecoilValue<Movie | null | DocumentData>(movieState);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [muted, setMuted] = useState(true);
  const [addedToList, setAddedToList] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const { user } = useAuth();

  async function handleList() {
    if (addedToList) {
      // Delete it from myList
      await deleteDoc(doc(db, 'customers', user!.uid, 'myList', currentMovie?.id.toString()!));

      toast(
        `${currentMovie?.title || currentMovie?.original_name} has been removed from My List`,
        { duration: 2000 },
      );
    } else {
      // Add it to myList
      await setDoc(doc(db, 'customers', user!.uid, 'myList', currentMovie?.id.toString()!), { ...currentMovie });

      toast(
        `${currentMovie?.title || currentMovie?.original_name} has been added to My List.`,
        { duration: 2000 },
      );
    }
  }

  function handleClose() {
    setShowModal(false);
  }

  // Find all the movies in the user's list
  useEffect(() => {
    if (user) {
      return onSnapshot(
        collection(db, 'customers', user.uid, 'myList'),
        (snapshot) => setMovies(snapshot.docs),
      );
    }
  }, [db, currentMovie?.id]);

  // Check if the movie is already in the user's list
  useEffect(
    () => setAddedToList(
      movies.findIndex((result) => result.data().id === currentMovie?.id) !== -1,
    ),
    [movies],
  );

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
      className="fixed !top-7 left-0 right-0 mx-auto max-w-6xl overflow-hidden overflow-y-scroll scrollbar-hide !outline-0"
      open={showModal}
      onClose={handleClose}
      disableAutoFocus
    >
      {/* Modal Container */}
      <div className="relative mx-5 overflow-hidden rounded-t-xl">
        {/* CloseButton */}
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none
          bg-[#181818] hover:bg-[#181818]"
        >
          <XMarkIcon className="h-6 w-6" />
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
          {/* Buttons */}
          <div className="absolute bottom-5 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              {/* PlayButton */}
              <button className="font-semibold px-9 py-2 flex items-center gap-x-2 rounded bg-white text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="w-6 h-6" />
                Play
              </button>
              <button
                onClick={handleList}
                className="modalButton"
              >
                {addedToList
                  ? <CheckIcon className="h-7 w-7" />
                  : <PlusIcon className="h-7 w-7" />}
              </button>
              <button className="modalButton">
                <HandThumbUpIcon className="h-7 w-7" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <SpeakerXMarkIcon className="w-7 h-7" />
              ) : (
                <SpeakerWaveIcon className="w-7 hs-7" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie!.vote_average * 10}
                % Match
              </p>
              <p className="font-light">
                {currentMovie?.release_date || currentMovie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>
                  {' '}
                  {genres?.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>
                  {' '}
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>
                  {' '}
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiModal>
  );
}

export default Modal;
