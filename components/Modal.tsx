import { XIcon } from '@heroicons/react/outline';
import MuiModal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState, movieState } from '../atoms/modalAtom';
import { Movie } from '../typings';
import { fetchMovieTrailer } from '../utils/request';

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const currentMovie = useRecoilValue<Movie|null>(movieState);
  const [trailer, setTrailer] = useState(null);

  function handleClose() {
    setShowModal(false);
  }

  useEffect(() => {
    if (!currentMovie) return;

    (async () => {
      const data = await fetchMovieTrailer(currentMovie).then((r) => r.json());
      setTrailer(data);
    })();
  }, [currentMovie]);

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <div className="relative h-full bg-[black] mt-7 mx-5 rounded-t-lg p-5">
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none
          bg-[#181818] hover:bg-[#181818]"
        >
          <XIcon className="h-6 w-  6" />
        </button>
        <h1>{currentMovie?.title}</h1>
        <h1>{currentMovie?.original_name}</h1>
        <h1>{trailer?.id}</h1>

      </div>
    </MuiModal>
  );
}

export default Modal;
