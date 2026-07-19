import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Usuario } from './usuario';
import { UsuarioToken } from './usuario-token';

@Service()
export class AuthService {
  private http = inject(HttpClient);

  login(usuario: Usuario) {
    return this.http.post<UsuarioToken>('http://localhost:5288/api/auth/login', {
      usuario: usuario.login,
      senha: usuario.senha,
    });
  }

  salvarToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.clear();
  }

  estaLogado() {
    return this.getToken() != null;
  }
}
