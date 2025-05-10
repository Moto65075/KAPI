import express from "express";
import path from "path"
import fs from "fs"
var logs = new Logger();

export let data = express.Router().get("/api/v4/get/media/:fileType/:fileId", async(req, res) => {
  /* 
  * categoriza o tipo de arquivo
  * @param fileType tipo do arquivo
  * @param fileId id do arquivo
  * @return <Buffer>
  */
  const [fileType, fileId] = req.query;
  const fileTypes = ["avatar","thumbnail","background","captions","video"];
  const pathFile = `${path.resolve()}/media/${fileType}/${fileId}`;
  if(!fileTypes.includes(fileType) || !fs.existsSync(pathFile)) {
    logs.logs({
      status: 404,
      route: req.path,
      method: req.method,
      body: {
        status: 404,
        messsage: "file type wrong or non-exist"
      },
      headers: req.headers,
      requester: {
        by: req.hostname,
        ip: req.ip
      }
    });
    return res.status(404).json({
       error: "file type wrong or non-exist"
    })
  }
  if(fileType == "video") {
  fs.stat(caminhoDoArquivo, (err, stats) => {
    if (err) {
      console.error('[ API ] erro ao obter informações do arquivo:', err);
      logs.logs({
      status: 500,
      route: req.path,
      method: req.method,
      body: {
        status: 500,
        messsage: "error while reading: " + err
      },
      headers: req.headers,
      requester: {
        by: req.hostname,
        ip: req.ip
      }
    });
    return res.status(500).json({
       error: "error while reading"
    })
    }

     res.writeHead(200, {
      'Content-Type': 'video/mp4', // Ajuste conforme o tipo do seu vídeo
      'Content-Length': stats.size,
    });

    const stream = fs.createReadStream(pathFile);
    stream.pipe(res);
  });
  return res.status(200)
}
  res.status(200).send(fs.readFileSync(pathFile, "Base64"));
  
})