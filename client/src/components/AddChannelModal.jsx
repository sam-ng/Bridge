import { motion, AnimatePresence } from 'framer-motion';

const backdrop = {
  visible: { opacity: 0.75, transition: { duration: 0.2 } },
  hidden: { opacity: 0, transition: { duration: 0.2 } },
};

const modal = {
  hidden: {
    y: '-100vh',
    opacity: 0,
    transition: { type: 'tween', duration: 0.5 },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.5 },
  },
};

const AddChannelModal = ({ isOpen, setShowAddChannelModal }) => {
  const handleCloseModal = () => {
    setShowAddChannelModal(false);
  };

  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.div
          className='z-10 fixed inset-0 w-full h-full bg-gray-500'
          variants={backdrop}
          initial='hidden'
          animate='visible'
          exit='hidden'
        >
          <motion.div
            className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
            variants={modal}
          >
            <div className='overflow-auto rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900'>
                      Add Channel
                    </h3>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                <button
                  type='button'
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddChannelModal;
