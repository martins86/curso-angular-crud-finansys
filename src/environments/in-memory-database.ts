import { InMemoryDbService } from 'angular-in-memory-web-api';

import { CategoryModel } from './../app/pages/categories/shared/models/category.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories: CategoryModel[] = [
      {id: 1, name: 'Moradia', description: 'contas de casa'},
      {id: 2, name: 'Carro', description: 'contas do carro'}
    ];

    return { categories };
  }
}
