import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Servico } from '../servico';

const API = 'http://localhost:5288/api/servicos';

@Service()
export class ServicosService {
  private http = inject(HttpClient);

  listar() {
    return this.http.get<Servico[]>(API);
  }

  listarPorId(id: number) {
    return this.http.get<Servico>(`${API}/${id}`);
  }

  criar(servico: Servico) {
    return this.http.post(API, servico);
  }

  atualizar(servico: Servico) {
    return this.http.put(`${API}/${servico.id}`, servico);
  }

  excluir(id: number) {
    return this.http.delete(`${API}/${id}`);
  }
}
