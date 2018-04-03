'use strict'
const fs = require('fs');
const config = require('../config');

const databasePath =  (process.env.NODE_ENV != 'production')
                      ? config.dev.databasePath
                      : config.prod.databasePath;

if (!fs.existsSync(databasePath)) {
  console.log("Setting up database...");
  
  const FileSync  = require('lowdb/adapters/FileSync');
  const adapter = new FileSync(databasePath);
  const database = require('lowdb')(adapter);

  database.defaults({ users: [] }).write();
  database.get('users').push({ username: 'admin', password: 'secret' }).write();
}
