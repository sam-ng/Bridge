const mongoose = require('mongoose');
const User = require('../models/user');

// TODO: may want to change behavior in future
//  currently, adding an existing macro will overwrite it
const addMacro = async (req, res) => {
  const { username, macroName, macroKeys, macroOutput } = req.body;
  if (!username || !macroName || !macroKeys || !macroOutput)
    return res
      .status(400)
      .json({ message: 'Username or a macro field is missing.' });

  try {
    let user = await User.findOne({ username }).exec();
    if (!user) return res.sendStatus(400);

    const existingMacro = user.macros.filter(
      (macro) => macro.macroKeys === macroKeys
    );
    const remaining = user.macros.filter(
      (macro) => macro.macroKeys !== macroKeys
    );

    if (existingMacro.length === 0) {
      user.macros.push({ macroName, macroKeys, macroOutput });
    } else user.macros = [...remaining, { macroName, macroKeys, macroOutput }];
    await user.save();
    user = await User.findOne({ username }).exec();

    return res.status(200).json({ macros: user.macros });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

const deleteMacro = async (req, res) => {
  const { username, macroKeys } = req.body;
  if (!username || !macroKeys)
    return res
      .status(400)
      .json({ message: 'Username or macro key sequence is missing.' });

  try {
    let user = await User.findOne({ username }).exec();
    if (!user) return res.sendStatus(400);

    await User.updateOne(
      { username, 'macros.macroKeys': macroKeys },
      { $pull: { macros: { macroKeys } } }
    );
    user = await User.findOne({ username }).exec();
    return res.status(200).json({ macros: user.macros });
  } catch (err) {
    console.log(err);
    return res.sendStatus(400);
  }
};

module.exports = { addMacro, deleteMacro };
