import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categories = [
      {id: 1, name: 'Moradia', description: 'contas de casa'},
      {id: 2, name: 'Carro', description: 'contas do carro'}
    ];

    return { categories };
  }
}
