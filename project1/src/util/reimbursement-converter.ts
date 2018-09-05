import { SqlReimbursement } from "../dto/sql-reimbursement";
import { Reimbursement } from "../model/reimbursement";

/**
 * This is used to convert a sql reimbursement into an actual reimbursement
 */
export function reimbursementConverter(reimbursement: SqlReimbursement) {
  return new Reimbursement(reimbursement.reimbursement_id, reimbursement.title, reimbursement.num_blades, reimbursement.year)
}