import { CategoryModel } from './../../../categories/shared/models/category.model';

export class EntryModel {
  constructor(
    public id?: number,
    public name?: string,
    public desciption?: string,
    public type?: string,
    public amount?: string,
    public date?: string,
    public paid?: boolean,
    public categoryId?: number,
    public category?: CategoryModel
  ) {}

    static types = {
      expense: 'Despesa',
      renevue: 'Receita'
    };

    get paidText(): string {
      return this.paid ? 'Pago' : 'Pendente';
    }
}
