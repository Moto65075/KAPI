import express from 'express'
import { Logger } from './../structures/logger.js'
import { f } from './../functions.js'
import chd from 'chokidar'
import path from 'path'
const logs = new Logger();
export const traffic = express.Router().get('/api/v3/traffic', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Logs da API com Diff</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://kit.fontawesome.com/28157a8fdb.js" crossorigin="anonymous"></script>
  <style>
    body {
      padding: 5px;
      font-family: Sans-Serif;
      background-color: #fff;
    }
    
    .log-card {
      background-color: #fff;
      box-shadow: 0 2px 5px rgb(0,0,0,0.3);
      padding: 1rem;
      border-radius: 10px;
      margin: 5px
    }
    
    .log-card header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
    }
    
    .log-card header .status {
      margin-left: auto;
      font-weight: bold;
      
      & i {
        color: #ff9b28;
      }
    }
    
    .log-card header span {
      background-color: rgb(21,166,255);
      border-radius: 8px;
      padding: 8px;
      margin-right: 5px;
      color: #fff;
      font-weight: bold;
      
      &.GET {
        background-color: #66ff12;
      }
      &.POST {
        background-color: #1279ff;
      }
      &.DELETE {
        background-color: #ff3715;
      }
    }
    
    .log-card header p {
      margin: 0;
      word-break: break-all
    }
    .log-card .card-diff {
      margin: 5px;
      white-space: pre;
      background-color: #1e1e1e;
      color: rgb(255, 255, 255, 0.5);
      border-radius: 10px;
      padding: 1rem;
      overflow-x: scroll;
      
      & div {
        display: inline-block
      }
      & .added {
        color: #15ff39;
        background-color: rgb(49,255,82,0.3);
      }
      & .removed {
        color: #ff3131;
        background-color: rgb(255,49,49,0.3);
      }
      & .modified {
        color: #ffa431;
        background-color: rgb(255,164,49,0.3);
      }
    }
    
    .log-card h3 {
      margin: 0;
    }
    
    .chart {
  box-shadow: 0 2px 5px rgb(0,0,0,0.3);
  border-radius: 10px;
  margin: 5px;
  color: #fff;
  padding: 1rem;
}
.chart .chartProgress {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.chart .chartProgress .bar {
  height: 30px;
  width: 100%;
  margin-right: 5px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  color: ;
  align-items: center;
  justify-content: center;
  background: #28b9ff
}
.chart .chartProgress .number {
  margin-left: auto;
  color: #000;
}
    
    .json-code .string { color: #6fff73; }
    .json-code .number { color: #ff6fb6; }
    .json-code .boolean { color: #ffa26f; font-weight: bold; }
    .json-code .null { color: #6f91ff; font-style: italic; }
     .json-code .key { color: #dd6fff; }
   .alert {
     box-shadow: 0 2px 3px rgb(0,0,0,0.3);
     padding: 1rem;
     border-radius: 10px;
     
     & h2 {
       margin: 0;
       color: rgb(0, 0, 0, 0.8);
     }
     & i {
        color: #ff9b28;
      }
   }
  </style>
</head>
<body>
  <div class="chart">
  ${logs.chartString()}
  </div>
${logs.showLogs().sort((a, b) =>{
  a = new Date(a.date).getTime()
  b = new Date(b.date).getTime()
  return b - a
    }).map(x=>`
<div class="log-card">
  <header>
  <span class="${x.method}">${x.method}</span> <p>${x.route}</p> <div class="status">${x.status}</div>
  </header>
    <h3>Body</h3>
  <div class="card-diff">
    ${x.body}
  </div>
    <h3>Headers</h3>
  <div class="card-diff">
     {
      "a": true
     }
  </div>
    <h3>Requester</h3>
  <div class="card-diff">
    ${JSON.stringify(x.requester, null, 2)}
  </div>
</div>
      `).join(" ")}
  <script>
    function formatarJSON(jsonString) {
  try {
    const jsonObject = JSON.parse(jsonString);
    const jsonFormatado = JSON.stringify(jsonObject, null, 2); // Indentação com 2 espaços
    return \`<pre style="tab-size:2; font-size: 1em;"><code class="json-code">\${realcarSintaxeJSON(jsonFormatado)}</code></pre>\`;
  } catch (error) {
    return \`:(<pre style="tab-size:2; font-size: 1em;"><code>\${jsonString}</code></pre>\`;
  }
}
    function realcarSintaxeJSON(jsonFormatado) {
    return jsonFormatado.replace(${RegExp(/("(\u[a-fA-F0-9]{4}|\[^u]|[^\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g)}, function (match) {
    let cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return \`<span class="\${cls}">\${match}</span>\`;
  });
}
    setTimeout(()=>[].slice.call(document.getElementsByClassName("card-diff")).map(x=>{
      alert('loaded diff')
      const content = formatarJSON(x.innerHTML)
      x.innerHTML = content
    }),1000)
  </script>
</body>
</html>
`)
})