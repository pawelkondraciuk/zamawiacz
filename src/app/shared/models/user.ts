export interface User {
  id: string;
  name: string;
}
export interface UsersQuery {
  users: User[];
}
 export interface MeQuery {
   me: User;
 }
