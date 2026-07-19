import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ServicosService } from '../../services/servicos-service';
import { Servico } from '../../servico';

@Component({
  selector: 'app-servicos-listagem',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './servicos-listagem.html',
  styleUrl: './servicos-listagem.css',
})
export class ServicosListagem {
  private servicosService = inject(ServicosService);
  private router = inject(Router);

  servicos = signal<Servico[]>([]);
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'preco'];

  ngOnInit() {
    this.servicosService.listar().subscribe({
      next: (data) => this.servicos.set(data),
      error: (err) => console.error('Erro ao listar serviços:', err),
    });
  }

  abrir(servico: Servico) {
    this.router.navigate(['/servicos', servico.id]);
  }

  novo() {
    this.router.navigate(['/servicos/novo']);
  }
}
