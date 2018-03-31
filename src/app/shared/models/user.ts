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

 export interface LoginUserData {
  name: string;
  googleId: string;
  _id: string;
}
