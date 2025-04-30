// стандартный модуль http
const http = require("http");
// подключение библиотеки express
const express = require("express");
const chalk = require("chalk");

//модуль чтения файла
const fs = require("fs/promises");
const path = require("path");

//добавления данных в файл базы данных
const { addNote } = require("./notes.controller.js");

//port
const PORT = 3000;

// чтение файла
const basePath = path.join(__dirname, "pages");
// инициализация приложения при помощи библиотеки express
const app = express();
// настройка express для работы с данными
app.use(
  express.urlencoded({
    extended: true,
  })
);

// обработка get запросов
app.get("/", (req, res) => {
  res.sendFile(path.join(basePath, "index.html"));
});

//обработка post запросов
app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.sendFile(path.join(basePath, "index.html"));
});

//запуск сервера на порту 3000
app.listen(PORT, () => {
  console.log(chalk.blue("Server started on port: ", PORT));
});
