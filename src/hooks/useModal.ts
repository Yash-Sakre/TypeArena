import { useState, useCallback } from 'react';

type ModalKind = 'result' | 'about';

export const useModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [aboutModal, setAboutModal] = useState(false);

  const openModal = useCallback((type: ModalKind) => {
    if (type === 'result') {
      setModalIsOpen(true);
      return;
    }

    setAboutModal(true);
  }, []);

  const closeModal = useCallback((type: ModalKind) => {
    if (type === 'result') {
      setModalIsOpen(false);
      return;
    }

    setAboutModal(false);
  }, []);

  return { modalIsOpen, aboutModal, openModal, closeModal };
};
