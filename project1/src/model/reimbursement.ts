export class Reimbursement {
    public id = 0;
    public title = '';
    public numBlades = 0;
    public year = 0;
  
    constructor(id?: number, title?: string, numBlades?: number, year?: number) {
      id && (this.id = id);
      title && (this.title = title);
      numBlades && (this.numBlades = numBlades);
      year && (this.year = year);
    }
  }