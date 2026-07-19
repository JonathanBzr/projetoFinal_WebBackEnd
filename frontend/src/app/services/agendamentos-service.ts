import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Agendamento } from '../agendamento';

const API = 'http://localhost:5288/api/agendamentos';

@Service()
export class AgendamentosService {
  private http = inject(HttpClient);

  listar() {
    return this.http.get<Agendamento[]>(API);
  }

  listarPorId(id: number) {
    return this.http.get<Agendamento>(`${API}/${id}`);
  }

  criar(agendamento: Agendamento) {
    return this.http.post(API, agendamento);
  }

  atualizar(agendamento: Agendamento) {
    return this.http.put(`${API}/${agendamento.id}`, agendamento);
  }

  excluir(id: number) {
    return this.http.delete(`${API}/${id}`);
  }
}
