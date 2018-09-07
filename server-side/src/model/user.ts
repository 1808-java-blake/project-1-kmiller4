import { Movie } from "./movie";

export class User {
  id = 0;
  username = '';
  password = '';
  first_name = '';
  last_name = '';
  email = '';
  role = 'employee';
  //movies: Movie[] = [];

  constructor(id?: number, username?: string, password?: string, first_name?: string, last_name?: string, email?: string, role?: string) {
    id && (this.id = id);
    username && (this.username = username);
    password && (this.password = password);
    first_name && (this.first_name = first_name);
    last_name && (this.last_name = last_name);
    email && (this.email = email);
    role && (this.role = role);


  }
}