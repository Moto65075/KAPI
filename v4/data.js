import express from "express";
import Database from "./db.js";
import path from "path"
import fs from "fs"
var userData = new Database("user.data", false);
var postsData = new Database("posts.data",true);
var logs = new Logger();
export let data = express.Router().get("/api/v4/data", async(req, res) => {
  const { action } = req.body;
  if(userData.getAuthorizationByAccess(req.header.authorization)) {
    logs.logs({
      status: 500,
      route: req.path,
      method: req.method,
      body: {
        status: 500,
        message: "can use database."
      },
      headers: req.headers,
      requester: {
        by: req.hostname,
        ip: req.ip
      }
    });
    return res.status(500).json({
      error: "authorization non valid"
    })
  }
  switch (action.type) {
    case "userCreate": {
      logs.logs({
        status: 200,
        route: req.path,
        method: req.method,
        body: req.body,
        headers: req.headers,
        requester: {
          by: req.hostname,
          ip: req.ip,
          message: 'new user'
        }
      })
      const {
       email,
       identifier,
       password,
       username
      } = req.body
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
      return res.status(200)
    }
    break;
    case "data": {
      logs.logs({
        status: "resolving",
        message: "resolving request for database...",
        ip: req.ip
      });
      const getDataMethods = ["get","all","robustSearch"];
      if(getDataMethods.includes(action.type)) res.status(200).json({
        status: 200,
        data: outData
      })
    }
    break;
    case "unlink": {
      const { file } = req.body;
    }
    break;
  }
})