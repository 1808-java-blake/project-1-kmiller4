import { Reim } from "../model/reim";
import { SqlReim } from "../dto/sql-reim";

/**
 * This is used to convert a sql reimbursement into an actual reimbursement
 */
export function reimConverter(reim: SqlReim) {
  return new Reim(reim.reimb_id, reim.reimb_amount, reim.reimb_submitted, reim.reimb_resolved, reim.reimb_description, reim.reimb_author, reim.reimb_resolver, reim.reimb_status_id,  reim.reimb_type_id);
}