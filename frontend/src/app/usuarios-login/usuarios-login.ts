import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { Usuario } from '../usuario';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-usuarios-login',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './usuarios-login.html',
  styleUrl: './usuarios-login.css',
})
export class UsuariosLogin {
  private auth = inject(AuthService);
  private router = inject(Router);
  usuario = signal<Usuario>({ login: '', senha: '' });

  entrar() {
    this.auth.login(this.usuario()).subscribe({
      next: (resposta) => {
        this.auth.salvarToken(resposta.token);
        this.router.navigate(['/animais']);
      },
      error: () => alert('Usuário ou senha inválidos'),
    });
  }
}
