import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className='modal fixed inset-0 z-50 flex items-center justify-center'>
      <div
        className='fixed inset-0 backdrop-blur-sm bg-neutral-700/70 flex justify-center'
        onClick={onClose}
      ></div>
      <div className='flex justify-center bg-neutral-700 text-white/90 rounded-xl overflow-hidden md:shadow-lg z-10 max-w-5xl w-full mx-4'>
        <div className='p-4 w-full h-[calc(100dvh-40px)] md:h-[calc(100dvh-130px)] overflow-y-auto'>
          {children}
        </div>
        <button
          className='absolute bg-neutral-600 rounded-full hover:pointer hover:bg-neutral-400 bottom-3 md:top-3 md:bottom-auto
            flex gap-2 p-x-4 p-y-2 items-center shadow-xl shadow-black/30'
          onClick={onClose}
          type='button'
        >
          <IoClose size={40} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
