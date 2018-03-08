import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import 'rxjs/add/operator/map';

import * as Query from '../graphql/queries';
import * as Mutations from '../graphql/mutations';
import { UsersQuery, User } from '../models/user';

@Injectable()
export class UserDataService {

  constructor(private apollo: Apollo) { }

  getUsers() {
    return this.apollo.watchQuery<UsersQuery>({ query: Query.Users })
      .valueChanges
      .map((result) => result.data.users);
  }

  createUser(name: string) {
    return this.apollo
      .mutate({
        mutation: Mutations.createUser,
        variables: {
          name
        },
        update: (proxy, { data: { createUser } }) => {
          const data: UsersQuery = proxy.readQuery({ query: Query.Users });

          data.users.push(createUser);

          proxy.writeQuery({ query: Query.Users, data });
        }
      });
  }

  removeUser(user: User) {
    return this.apollo
      .mutate({
        mutation: Mutations.removeUser,
        variables: {
          id: user.id
        },
        update: (proxy, { data: { removeUser } }) => {
          const data: UsersQuery = proxy.readQuery({ query: Query.Users });

          const index = data.users.map(function (x) { return x.id; }).indexOf(user.id);

          data.users.splice(index, 1);

          proxy.writeQuery({ query: Query.Users, data });
        }
      });
  }

  updateUser(user: User, name: string) {
    return this.apollo
      .mutate({
        mutation: Mutations.updateUser,
        variables: {
          id: user.id,
          name
        },
        update: (proxy, { data: { updateUser } }) => {
          const data: UsersQuery = proxy.readQuery({ query: Query.Users });

          const index = data.users.map(function (x) { return x.id; }).indexOf(user.id);

          data.users[index] = updateUser;

          proxy.writeQuery({ query: Query.Users, data });
        }
      });
  }
}
