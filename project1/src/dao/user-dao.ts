import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { User } from "../model/user";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { userConverter } from "../util/user-converter";

/**
 * Retreive all users from the DB along with all their reimbursements
 */
export async function findAll(): Promise<User[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM reimbursements.app_users
        LEFT JOIN reimbursements.users_reimbursements
        USING (user_id)
        LEFT JOIN reimbursements.reimbursements
        USING(reimbursement_id)`);

    // extract the users and their reimbursements from the result set
    const users = [];
    resp.rows.forEach((user_reimbursement_result) => {
      const reimbursement = reimbursementConverter(user_reimbursement_result);
      const exists = users.some( existingUser => {
        if(user_reimbursement_result.user_id === existingUser.id) {
          reimbursement.id && existingUser.reimbursements.push(reimbursement);
          return true;
        }
      })
      if (!exists) {
        const newUser = userConverter(user_reimbursement_result);
        reimbursement.id && newUser.reimbursements.push(reimbursement);
        users.push(newUser);
      }
    })
    return users;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by id, will also retreive all of that users reimbursements
 * @param id 
 */
export async function findById(id: number): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM reimbursements.app_users u
        LEFT JOIN reimbursements.users_reimbursements
        USING (user_id)
        LEFT JOIN reimbursements.reimbursements
        USING(reimbursement_id)
        WHERE u.user_id = $1`, [id]);
        const user = userConverter(resp.rows[0]); // get the user data from first row

        // get the reimbursements from all the rows
        resp.rows.forEach((reimbursement) => {
          reimbursement.reimbursement_id && user.reimbursements.push(reimbursementConverter(reimbursement));
        })
        return user;
  } finally {
    client.release();
  }
}

/**
 * Retreive a single user by username and password, will also retreive all of that users reimbursements
 * @param id 
 */
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `SELECT * FROM reimbursements.app_users u
        WHERE u.username = $1
        AND u.password = $2`, [username, password]);
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
      `INSERT INTO reimbursements.app_users 
        (username, password, role)
        VALUES ($1, $2, 'customer') 
        RETURNING user_id`, [user.username, user.password]);
    return resp.rows[0].user_id;
  } finally {
    client.release();
  }
}

/**
 * Add a reimbursement to a users list
 * @param reimbursementId 
 * @param userId 
 */
export async function addreimbursementToUser(reimbursementId: number, userId: number): Promise<any> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO reimbursements.users_reimbursements 
        (user_id, reimbursement_id)
        VALUES ($1, $2)`, [userId, reimbursementId]);
  } finally {
    client.release();
  }
}