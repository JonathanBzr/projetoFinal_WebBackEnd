import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientesService } from '../../services/clientes-service';
import { Cliente } from '../../cliente';

@Component({
  selector: 'app-clientes-novo',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './clientes-novo.html',
  styleUrl: './clientes-novo.css',
})
export class ClientesNovo {
  private clientesService = inject(ClientesService);
  private router = inject(Router);

  cliente = signal<Cliente>({ id: 0, nome: '', telefone: '', email: '' });

  salvar() {
    this.clientesService.criar(this.cliente()).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: (err) => console.error('Erro ao criar cliente:', err),
    });
  }

  voltar() {
    this.router.navigate(['/clientes']);
  }
}
