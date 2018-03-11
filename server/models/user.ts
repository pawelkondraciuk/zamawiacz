import * as mongoose from 'mongoose';
import * as findOrCreate from 'mongoose-findorcreate';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  }
});

userSchema.plugin(findOrCreate);

const User = mongoose.model('User', userSchema);

export default User;
