import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Animal } from '../animal';

const API = 'http://localhost:5288/api/animais';

@Service()
export class AnimaisService {
  private http = inject(HttpClient);

  listar() {
    return this.http.get<Animal[]>(API);
  }

  listarPorId(id: number) {
    return this.http.get<Animal>(`${API}/${id}`);
  }

  criar(animal: Animal) {
    return this.http.post(API, animal);
  }

  atualizar(animal: Animal) {
    return this.http.put(`${API}/${animal.id}`, animal);
  }

  excluir(id: number) {
    return this.http.delete(`${API}/${id}`);
  }
}
