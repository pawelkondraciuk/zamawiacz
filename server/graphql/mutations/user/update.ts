import { GraphQLNonNull, GraphQLString } from 'graphql';

import UserModel from '../../../models/user';
import { UserType } from '../../types/user';

const updateUser = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    return UserModel.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      { new: true }
    )
    .catch(err => new Error(err));
  }
};

export default updateUser;
