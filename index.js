// подключение библиотеки express
const express = require("express");
const chalk = require("chalk");
const path = require("path");
// подключение библиотеки mongoose
const mongoose = require("mongoose");


//модуль чтения файла
const fs = require("fs/promises");

//добавления данных в файл базы данных
const { addNote, getNotes, removeNote,editNote } = require("./notes.controller.js");

//port
const PORT = 3000;

// инициализация приложения при помощи библиотеки express
const app = express();
// подключение ejs для шаблонизации
app.set("view engine", "ejs");
app.set("views", "pages");
// подключение статических файлов
app.use(express.static(path.resolve(__dirname, "public")));

// настройка express для работы с данными
app.use(
  express.urlencoded({
    extended: true,
  }),
  express.json()
);

// обработка get запросов ( чтение заметок из файла)
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
    edited: false,
  });
});

//обработка post запросов ( добавление заметки в файл)
app.post("/", async (req, res) => {
  try{
    await addNote(req.body.title);
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (error) {
    console.error('Creation error', error);
    res.render("index", {
      title: "Express App",
      notes: await getNotes(),
      created: false,
      error: true,
    });
  }
 
});

// обработка запроса на удаление
app.delete("/:id", async (req, res) => {
  // console.log("req:", req.params.id);
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
    error: false,
  });
});
// обработка запроса на редактирования заметки
app.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    await editNote(id, title);
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update note' });
  }
});
// подключение к базе данных mongodb
mongoose.connect(
  'mongodb://user:mongopass@localhost:27017/testdb?authSource=admin'
).then(() => {
  
  //запуск сервера на порту 3000
  app.listen(PORT, () => {
    console.log(chalk.blue("Server started on port: ", PORT));
  });
})
