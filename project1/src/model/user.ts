import { Reimbursement } from "./reimbursement";

export class User {
  public id = 0;
  public username = '';
  public password = '';
  public role = 'customer';
  public reimbursements: reimbursement[] = [];

  constructor(id?: number, username?: string, password?: string, role?: string, reimbursements?: Reimbursement[]) {
    id && (this.id = id);
    username && (this.username = username);
    password && (this.password = password);
    role && (this.role = role);
    reimbursement && (this.reimbursement = rembursement);
  }
}