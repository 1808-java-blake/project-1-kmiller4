import { User } from "../model/user";
import { SqlUser } from "../dto/sql-user";

/**
 * This is used to convert a sql reimbursement into an actual reimbursement
 */
export function userConverter(user: SqlUser) {
  return new User(user.user_id, user.username, undefined, user.role);
}