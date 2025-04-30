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
