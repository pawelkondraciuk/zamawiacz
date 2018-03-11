import * as mongoose from 'mongoose';
import getConfig from './config';

const env = process.env.NODE_ENV || 'development';
const config = getConfig(env);

function setupDatabase() {
  mongoose.Promise = global.Promise;
  const db = mongoose.connect(config.db);
  mongoose.connection.on('error', function (err) {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
  }).on('open', function () {
    console.log('Connection extablised with MongoDB');
  });
  return db;
}

export default setupDatabase;
