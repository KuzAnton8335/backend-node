

const chalk = require("chalk");
// модель базы данных
const Note = require("./models/Note");


//добавление заметки
async function addNote(title) {
  await Note.create({ title });
  console.log(chalk.bgGreen("Note was added!"));
}
// получение заметок
async function getNotes() {
  const notes = await Note.find();
  return notes;
}

// удаление заметки
async function removeNote(id) {
  await Note.deleteOne({ _id: id });
  console.log(chalk.bgGreen(`Note with id "${id}" was removed!`));
}

//редактирование заметки
async function editNote(id, title) {
  await Note.updateOne({ _id: id }, {title: title});
  console.log(chalk.bgGreen(`Note with id "${id}" was updated!`));
}

module.exports = {
  addNote,
  removeNote,
  getNotes,
  editNote,
};
