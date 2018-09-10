import { connectionPool } from "../util/connection-util";
import { User } from "../model/user";
import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their movies
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_users`);

        /*`SELECT * FROM ers.ers_users
        LEFT JOIN movies.users_movies
        USING (ers.ers_users_id)
        LEFT JOIN movies.movies
        USING(movie_id)`);*/

    // extract the users and their movies from the result set
    const users = [];
    // resp.rows.forEach((user_movie_result) => {


      //const movie = movieConverter(user_movie_result);
      // const exists = users.some( existingUser => {
      //   if(user_movie_result.user_id === existingUser.id) {
    //     movie.id && existingUser.movies.push(movie);
      //     return true;
      //   }
      // })
      // if (!exists) {
        // const newUser = userConverter(user_movie_result);;
        //movie.id && newUser.movies.push(movie);
        // users.push(newUser);
     // }
    // })
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users movies
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
        `SELECT * FROM ers.ers_users u`
     );
        const user = userConverter(resp.rows[0]); // get the user data from first row
      /* `SELECT * FROM movies.app_users u
        LEFT JOIN movies.users_movies
        USING (ers_users_id)
        LEFT JOIN movies.movies
        USING(movie_id)
        WHERE u.user_id = $1`, [id]*/


        // get the movies from all the rows
        /*resp.rows.forEach((movie) => {
          movie.movie_id && user.movies.push(movieConverter(movie));
        })*/
        return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users movies
 * @param id 
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM ers.ers_users u
        WHERE u.ers_username = $1
        AND u.ers_password = $2`, [username, password]);
        if(resp.rows.length !== 0) {
          return userConverter(resp.rows[0]); // get the user data from first row
        }
        return null;
  } finally {
    client.release();
  }
}


/**
 * Add a new user to the DB
 * @param user 
 */
export async function create(user: User): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_users 
        (ers_username, ers_password, user_first_name, user_last_name, user_email, user_role_id)
        VALUES ($1, $2, $3, $4, $5, 0) 
        RETURNING ers_users_id`, [user.username, user.password, user.first_name, user.last_name, user.email]);
    return resp.rows[0].ers_users_id;
  } finally {
    client.release();
  }
}

/**
 * Add a movie to a users list
 * @param reimbId 
 * @param userId 
 */
export async function addReimToUser(reimbId: number, userId: number): Promise<any> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursements 
        (user_id, reimb_id)
        VALUES ($6, $1)`, [userId, reimbId]);
  } finally {
    client.release();
  }
}