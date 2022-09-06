import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useSocket } from '../context/SocketProvider';
import { addChannel } from '../services/socket';

const overlay = {
  visible: { opacity: 0.75, transition: { duration: 0.2 } },
  hidden: { opacity: 0, transition: { duration: 0.2 } },
};

const modal = {
  hidden: {
    scale: 0,
    transition: { type: 'tween', duration: 0.3 },
  },
  visible: {
    scale: 1,
    transition: { type: 'tween', duration: 0.3 },
  },
};

const AddChannelModal = ({ isOpen, setShowAddChannelModal }) => {
  const modalRef = useRef();
  const socket = useSocket();
  const userId = '630ed7be14c08c76e3183baa';

  const [channelName, setChannelName] = useState('');

  const handleCloseModal = () => {
    setShowAddChannelModal(false);
  };

  const handleCloseModalOnEscape = (e) => {
    if (e.key === 'Escape') setShowAddChannelModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addChannel(socket, channelName, userId);
    setChannelName('');
  };

  useEffect(() => {
    if (isOpen) modalRef.current.focus();
  }, [isOpen]);

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          className='z-10 fixed inset-0 w-full h-full bg-gray-500 flex items-end justify-center p-4 text-center sm:items-center sm:p-0'
          variants={overlay}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <div
            className='absolute inset-0 m-auto'
            onClick={handleCloseModal}
          ></div>
          <motion.form
            className='relative overflow-auto rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg'
            tabIndex='-1'
            ref={modalRef}
            onKeyDown={handleCloseModalOnEscape}
            onSubmit={handleSubmit}
            variants={modal}
          >
            <h3 className='px-4 pt-4 text-lg font-bold text-gray-900'>
              Add Channel
            </h3>
            <div className='bg-white px-4 pt-5 pb-4 mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='channelName'
              >
                Channel name
              </label>
              <input
                className='shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:shadow-outline'
                id='channelName'
                type='text'
                name='channelName'
                placeholder='Channel Name'
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                required
              ></input>
            </div>
            <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
              <button
                type='submit'
                className='inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={handleCloseModal}
              >
                Add
              </button>
              <button
                type='button'
                className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddChannelModal;
