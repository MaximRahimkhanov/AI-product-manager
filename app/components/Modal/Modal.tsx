import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import style from './Modal.module.scss';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  handleClose: () => void;
  className?: string;
}

const Modal = ({ children, handleClose, className, title }: ModalProps) => {
  const constraintsRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  return createPortal(
    <motion.div
      key="backdrop"
      ref={constraintsRef}
      className={style.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <motion.div
        key="modal-content"
        className={clsx(style.modal, className)}
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        // Налаштування Drag
        drag
        // dragConstraints={constraintsRef} // Тепер модалка не втече за межі екрана
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.1} // Трохи опору на межах

        // Прибираємо whileHover для самої модалки,
        // бо 1.2 — це дуже багато, вона перекриє все.
        // Краще додати це тільки для кнопки закриття.
      >
        {title && <h2 className={style.title}>{title}</h2>}

        <motion.button
          onClick={handleClose}
          className={style.closeButton}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg className={style.closeIcon}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </motion.button>
        {children}
      </motion.div>
    </motion.div>,
    document.body,
  );
};

export default Modal;
