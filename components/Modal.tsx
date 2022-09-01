import MuiModal from '@mui/material/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);

  function handleClose() {
    setShowModal(false);
  }

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <div><h1>modal</h1></div>
    </MuiModal>
  );
}

export default Modal;
