import express from 'express'
import { Logger } from './../structures/logger.js'
import Database from './../structures/db.js'
import fs from 'fs'
import path from 'path'
var data = new Database('user.data',false)
var dataPost = new Database('posts.data',true)
var logs = new Logger();
export const actions = express.Router().post('/api/v3/actions', (req, res) => {
  const body = req.body
  if(body.action==="createAccount") {
    const { username, password, email } = body
    logs.logs({
    status: 200,
    route: req.path, 
    method: req.method,
    message: "account created, new user is called " + username,
    headers: req.headers,
    requester: {
      "by": req.hostname,
      "ip": req.ip
    }
  })
  data.insert(email, {
      "adm": false,
      "accessKey": "",
      "avatar": "user",
      "background": "",
      "verified": false,
      "blockedUsers": [],
      "stars": [],
      "biography": "sou um novo usúario!",
      "createdAt": new Date().getTime(),
      "email": email,
      "follow": [],
      "followers": [],
      "identifier": identifier,
      "notifications": [],
      "password": password,
      "playlists": [],
      "username": username
  })
  return res.json({ status: 200 });
  }
  if(body.action==="database") {
    const { type, collection, path, isPost } = body;
   logs.logs({
    status: "unknow",
    route: req.path, 
    method: req.method,
    body: "resolving request for database...",
    headers: req.headers,
    requester: {
      "by": req.hostname,
      "ip": req.ip
    }
  })
if(Array.isArray(path) && ["update",'updateCertainObject'].includes(type)) {
  const [ path1, path2 ] = path
  const outData = isPost? dataPost[type](collection, path1, path2) : data[type](collection, path1, path2);
  logs.logs({
    status: 200,
    route: req.path, 
    method: req.method,
    body: `function ${type} resolved in database ${isPost? "postData" : "userData"}`,
    headers: req.headers,
    requester: {
      "by": req.hostname,
      "ip": req.ip
    }
  })
  return ["get","all","robustSearch"].includes(type)? res.status(200).json({ status: 200, data: outData }) : res.status(200).json({ status: 200 });
}
const outData = isPost? dataPost[type](collection, path) : data[type](collection, path);
logs.logs({
    status: 200,
    route: req.path, 
    method: req.method,
    body: `function ${type} resolved in database ${isPost? "postData" : "userData"}`,
    headers: req.headers,
    requester: {
      "by": req.hostname,
      "ip": req.ip
    }
  })
 return["get","all","robustSearch"].includes(type)? res.status(200).json({ status: 200, data: outData }) : res.status(200).json({ status: 200 });
}
if(body.action==="unlink") {
 if(Array.isArray(body.id)) {
  const ids = body.id;
  ids.map(x=>{
    if(!fs.existsSync(path.resolve()+"/media/" + x)) return;
fs.unlinkSync("media/" + x)
  }) 
   return res
    .status(200)
}
  if(!fs.existsSync(path.resolve()+"/media/" + body.id)) return;
fs.unlinkSync("media/" + body.id)
  return res
    .status(200)
}
  })