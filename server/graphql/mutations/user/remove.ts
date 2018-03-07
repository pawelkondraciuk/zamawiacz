import { GraphQLNonNull, GraphQLString } from 'graphql';

import UserModel from '../../../models/user';
import { UserType } from '../../types/user';

const removeUser = {
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removeduser = UserModel.findByIdAndRemove(params.id).exec();
    if (!removeduser) {
      throw new Error('Error');
    }
    return removeduser;
  }
};

export default removeUser;
