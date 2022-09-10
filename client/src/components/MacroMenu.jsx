import { useState, useEffect } from 'react';

import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

import { addMacro, deleteMacro } from '../services/keyMacro';

const MacroMenu = () => {
  const [macroName, setMacroName] = useState('');
  const [macroKeys, setMacroKeys] = useState([]);
  const [macroOutput, setMacroOutput] = useState('');
  const [macros, setMacros] = useState([]);

  const { auth } = useAuth();
  const {
    user: { username, macros: initialMacros },
    accessToken,
  } = auth;
  const refresh = useRefreshToken();

  useEffect(() => {
    setMacros(initialMacros);
  }, [initialMacros]);

  const handleAddMacro = async (e) => {
    e.preventDefault();

    try {
      const res = await addMacro(
        { username, macroName, macroKeys, macroOutput },
        accessToken,
        refresh
      );
      setMacros(res.macros);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteMacro = async (e, macro) => {
    e.preventDefault();

    try {
      const res = await deleteMacro(
        { username, macroKeys: macro.macroKeys },
        accessToken,
        refresh
      );
      setMacros(res.macros);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(macros);

  return (
    <div className='relative w-0 h-0'>
      <div className='absolute max-w-screen-80 -top-44 h-40 bg-white overflow-x-auto overflow-y-auto rounded shadow-lg px-8 py-8 flex flex-col items-center'>
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
            onClick={handleAddMacro}
          >
            Add
          </button>
        </form>
        <div className='mb-3 text-md font-bold'>
          Type a key sequence mapped to the output you want.
        </div>
        <table className='table-auto border-collapse text-sm text-left'>
          <thead>
            <tr>
              <th className='mx-2 px-2'>Macro Name</th>
              <th className='mx-2 px-2'>Key Sequence</th>
              <th className='mx-2 px-2'>Output</th>
            </tr>
          </thead>
          <tbody>
            {macros &&
              macros.map((macro) => (
                <tr className=''>
                  <td className='border border-white mx-2 px-2 bg-slate-200'>
                    {macro.macroName}
                  </td>
                  <td className='border border-white mx-2 px-2 bg-slate-200'>
                    {macro.macroKeys}
                  </td>
                  <td className='border border-white mx-2 px-2 bg-slate-200'>
                    {macro.macroOutput}
                  </td>
                  <td className='w-content mx-2 px-2'>
                    <button
                      className='px-4 py-2 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:shadow-outline'
                      type='button'
                      onClick={(e) => handleDeleteMacro(e, macro)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MacroMenu;
