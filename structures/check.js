/* doctor v3 */
/*
 enter node structures/check.js to verify structure
 get diagnostic of analysis 
 
 by MOTO
 */
import fs from 'fs'
import path from 'path'

function checkFiles(file) {
  const readedFile = fs.readFileSync(file, 'utf-8')
  let result = {}

  result.fileType = file.split('.')[2];
  result.lines = readedFile.length;
  result.isData = file.includes(['logger.json', 'user.data.json', 'posts.data.json'])
  result.status = 200
  console.log(JSON.stringify(result, null, 2))
  
}

checkFiles(path.join() + '/structures/logger.json')