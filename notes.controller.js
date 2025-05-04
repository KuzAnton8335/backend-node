const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");
//добавление заметки
async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}
// получение заметок
async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}
// сохранение заметок
async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}
// вывод заметок
async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach(note => {
    console.log(chalk.redBright(note.id), chalk.white(note.title));
  });
}
// удаление заметки
async function removeNote(id) {
  const notes = await getNotes();
  const filteredNotes = notes.filter(note => note.id !== id);

  if (notes.length === filteredNotes.length) {
    console.log(chalk.bgRed(`Note with id "${id}" not found!`));
    return;
  }

  await saveNotes(filteredNotes);
  console.log(chalk.bgGreen(`Note with id "${id}" was removed!`));
}

//редактирование заметки
async function editNote(id, title) {
  const notes = await getNotes();
  const index = notes.findIndex(note => note.id === id);
  if (index === -1){
    console.log(chalk.bgRed(`Note with id "${id}" not found!`));
    return;
  }
  notes[index].title = title;
  await saveNotes(notes);
  console.log(chalk.bgGreen(`Note with id "${id}" was updated!`));
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  getNotes,
  editNote,
};
