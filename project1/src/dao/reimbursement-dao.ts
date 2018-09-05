import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../model/reimbursement";
import { reimbursementConverter } from "../util/reimbursement-converter";
import { SqlReimbursement } from "../dto/sql-reimbursement";

/**
 * Retreive all reimbursements from the database
 */
export async function findAll(): Promise<reimbursement[]> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM reimbursements.reimbursements');
    return resp.rows.map(reimbursementConverter);
  } finally {
    client.release();
  }
}

/**
 * Retreive a reimbursement by its id
 * @param id 
 */
export async function findById(id: number): Promise<reimbursement> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query('SELECT * FROM reimbursements.reimbursements WHERE reimbursement_id = $1', [id]);
    let reimbursement: Sqlreimbursement = resp.rows[0];
    if (reimbursement !== undefined) {
      return reimbursementConverter(reimbursement);
    } else {
      return undefined;
    }
  } finally {
    client.release();
  }
}

/**
 * Add a new reimbursement to the DB
 * @param reimbursement 
 */
export async function createreimbursement(reimbursement): Promise<number> {
  const client = await connectionPool.connect();
  try {
    const resp = await client.query(
      `INSERT INTO reimbursements.reimbursements 
        (title, num_blades, year)
        VALUES ($1, $2, $3)
        RETURNING reimbursement_id`, [reimbursement.title, reimbursement.numBlades, reimbursement.year]);
    return resp.rows[0].reimbursement_id;
  } finally {
    client.release();
  }
}