import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClientesService } from '../../services/clientes-service';
import { Cliente } from '../../cliente';

@Component({
  selector: 'app-clientes-listagem',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './clientes-listagem.html',
  styleUrl: './clientes-listagem.css',
})
export class ClientesListagem {
  private clientesService = inject(ClientesService);
  private router = inject(Router);

  clientes = signal<Cliente[]>([]);
  displayedColumns: string[] = ['id', 'nome', 'telefone', 'email'];

  ngOnInit() {
    this.clientesService.listar().subscribe({
      next: (data) => this.clientes.set(data),
      error: (err) => console.error('Erro ao listar clientes:', err),
    });
  }

  abrir(cliente: Cliente) {
    this.router.navigate(['/clientes', cliente.id]);
  }

  novo() {
    this.router.navigate(['/clientes/novo']);
  }
}
