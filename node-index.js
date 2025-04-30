// стандартный модуль http
const http = require("http");
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

// создание сервера по стандарту http
const server = http.createServer(async (req, res) => {
  // обработка запроса GET
  if (req.method === "GET") {
    const content = await fs.readFile(path.join(basePath, "index.html"));
    // res.setHeader("Content-Type", "text/html");
    res.writeHead(200, {
      "Content-Type": "text/html",
    });
    res.end(content);
  }
  //обработка запроса POST
  else if (req.method === "POST") {
    // внутренний массив для считки данных
    const body = [];
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
    });
    //получение данных от клиента в буфер обмен
    req.on("data", data => {
      body.push(Buffer.from(data));
    });
    // расшифровка данных в строку
    req.on("end", () => {
      const title = body.toString().split("=")[1].replaceAll("+", " ");
      // добавление данных в файл базы данных при помощи функции addNote
      addNote(title);
      res.end(`Title = ${title}`);
    });
  }
});

//запуск сервера на порту 3000
server.listen(PORT, () => {
  console.log(chalk.blue("Server started on port: ", PORT));
});
