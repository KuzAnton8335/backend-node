// подключение библиотеки express
const express = require("express");
const chalk = require("chalk");
const path = require("path");

//модуль чтения файла
const fs = require("fs/promises");

//добавления данных в файл базы данных
const { addNote, getNotes, removeNote } = require("./notes.controller.js");

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
  })
);

// обработка get запросов
app.get("/", async (req, res) => {
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

//обработка post запросов
app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: true,
  });
});

// обработка запроса на удаление
app.delete("/:id", async (req, res) => {
  // console.log("req:", req.params.id);
  await removeNote(req.params.id);
  res.render("index", {
    title: "Express App",
    notes: await getNotes(),
    created: false,
  });
});

//запуск сервера на порту 3000
app.listen(PORT, () => {
  console.log(chalk.blue("Server started on port: ", PORT));
});
