import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Cliente } from '../cliente';

const API = 'http://localhost:5288/api/clientes';

@Service()
export class ClientesService {
  private http = inject(HttpClient);

  listar() {
    return this.http.get<Cliente[]>(API);
  }

  listarPorId(id: number) {
    return this.http.get<Cliente>(`${API}/${id}`);
  }

  criar(cliente: Cliente) {
    return this.http.post(API, cliente);
  }

  atualizar(cliente: Cliente) {
    return this.http.put(`${API}/${cliente.id}`, cliente);
  }

  excluir(id: number) {
    return this.http.delete(`${API}/${id}`);
  }
}
