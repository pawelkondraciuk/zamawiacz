import * as mongoose from 'mongoose';
import {
  config
} from './config';

const env = process.env.NODE_ENV || 'development';
const cfg = config[env];

function setupDatabase() {
  mongoose.Promise = global.Promise;
  const db = mongoose.connect(cfg.db);
  mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
  }).on('open', function () {
    console.log('Connection extablised with MongoDB');
  });
  return db;
}

export default setupDatabase;
