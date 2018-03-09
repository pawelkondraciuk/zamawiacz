import { GraphQLNonNull } from 'graphql';

import UserModel from '../../../models/user';
import { UserInputType, UserType } from '../../types/user';

const createUser = {
  type: UserType,
  args: {
    input: {
      type: new GraphQLNonNull(UserInputType),
    }
  },
  resolve: async (root, params) => {
    const uModel = new UserModel(params);
    const newUser = uModel.save();
    if (!newUser) {
      throw new Error('Error');
    }
    return newUser;
  }
};

export default createUser;
