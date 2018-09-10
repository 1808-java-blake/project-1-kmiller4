import { connectionPool } from "../util/connection-util";
import { Reim } from "../model/reim";
import { reimConverter } from "../util/reim-converter";
import { SqlReim } from "../dto/sql-reim";

/**
 * Retreive all reimbursements from the database
 */
export async function findAll(): Promise<Reim[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM ers.ers_reimbursement');
    return resp.rows.map(reimConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a reimbursement by its id
 * @param id 
 */
export async function findById(id: number): Promise<Reim> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM ers.ers_reimbursement WHERE reimb_id = $1', [id]);
    let reim: SqlReim = resp.rows[0];
    if (reim !== undefined) {
      return reimConverter(reim);
    } else {
      return undefined;
    }
  } finally {
    client.release();
  }
}

/**
 * Add a new rembursement to the DB
 * @param reim 
 */
export async function createReim(reim): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO ers.ers_reimbursement 
        (reimb_amount, reimb_submitted, reimb_description, reimb_author, reimb_status_id, reimb_type_id)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING reimb_id`, [reim.amount, `${new Date().toISOString().slice(0, 19).replace('T', ' ')}`, reim.description, reim.author, reim.status, reim.type]);
    return resp.rows[0].reimb_id;
  } finally {
    client.release();
  }
}

  /**
   * Approve or deny a reimbursement in the DB
   * @param reim
   */
  export async function updateReim(reim): Promise<number> {
    const client = await connectionPool.connect();
    console.log("updating");
    try {
      const resp = await client.query(
        `UPDATE ers.ers_reimbursement
        SET reimb_status_id = 1
        WHERE reimb_status_id = 0`, [reim.status]);
      return resp.rows[0].reimb_id; 
    } finally {
      client.release();
    }
  }