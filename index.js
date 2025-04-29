// стандартный модуль http
const http = require("http");
const chalk = require("chalk");

//модуль чтения файла
const fs = require("fs/promises");
const path = require("path");

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
    res.end("post succsess");
  }
});

//запуск сервера на порту 3000
server.listen(PORT, () => {
  console.log(chalk.blue("Server started on port: ", PORT));
});
