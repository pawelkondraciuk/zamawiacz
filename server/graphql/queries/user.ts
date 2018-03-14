import { GraphQLID, GraphQLList } from 'graphql';
import * as mongoose from 'mongoose';

import UserModel from '../../models/user';
import { UserType } from '../types/user';

export default {
  users: {
    type: new GraphQLList(UserType),
    description: 'Get user list',
    resolve: () => {
      const users = UserModel.find().exec();
      if (!users) {
        throw new Error('Error');
      }
      return users;
    }
  },
  user: {
    type: UserType,
    description: 'Get user by ID',
    args: { id: { type: GraphQLID } },
    resolve: (root, {id}) => {
      return UserModel.findById(new mongoose.Types.ObjectId(id));
    }
  },
  me: {
    type: UserType,
    description: 'Get current user',
    resolve: (root, args, {id}) => {
      return UserModel.findById(new mongoose.Types.ObjectId(id));
    }
  },
};
