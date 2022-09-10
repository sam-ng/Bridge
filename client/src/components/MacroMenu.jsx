import { useState } from 'react';

const MacroMenu = () => {
  const [macroName, setMacroName] = useState('');
  const [macroKeys, setMacroKeys] = useState([]);
  const [macroOutput, setMacroOutput] = useState('');

  const handleAddMacro = () => {};

  return (
    <div className='relative w-0 h-0'>
      <div className='absolute -top-44 h-40 bg-white overflow-y-auto rounded shadow-md px-8 py-8 flex flex-col items-center'>
        <form
          className='flex flex-row w-4/5 p-2 mb-6 border-gray-200 items-center justify-center'
          onSubmit={handleAddMacro}
        >
          <input
            className='p-2 mr-2 rounded-md focus:outline-none focus:placeholder-gray-300 placeholder:text-gray-500 bg-gray-200'
            type='text'
            placeholder='Macro Name'
            value={macroName}
            onChange={(e) => setMacroName(e.target.value)}
          />
          <input
            className='p-2 mr-2 rounded-md focus:outline-none focus:placeholder-gray-300 placeholder:text-gray-500 bg-gray-200'
            type='text'
            placeholder='Macro Key Sequence'
            value={macroKeys}
            onChange={(e) => setMacroKeys(e.target.value)}
          />
          <input
            className='p-2 rounded-md focus:outline-none focus:placeholder-gray-300 placeholder:text-gray-500 bg-gray-200'
            type='text'
            placeholder='Macro Output'
            value={macroOutput}
            onChange={(e) => setMacroOutput(e.target.value)}
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 px-4 py-2 rounded focus:shadow-outline'
            type='submit'
          >
            Add
          </button>
        </form>
        <div className='mb-3 text-md font-bold'>Hold CTRL to use macro.</div>
        <div>TEST</div>
        <div>TEST</div>
      </div>
    </div>
  );
};

export default MacroMenu;
