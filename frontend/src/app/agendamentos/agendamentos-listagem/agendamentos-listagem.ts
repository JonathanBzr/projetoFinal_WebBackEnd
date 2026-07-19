import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AgendamentosService } from '../../services/agendamentos-service';
import { Agendamento } from '../../agendamento';

@Component({
  selector: 'app-agendamentos-listagem',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './agendamentos-listagem.html',
  styleUrl: './agendamentos-listagem.css',
})
export class AgendamentosListagem {
  private agendamentosService = inject(AgendamentosService);
  private router = inject(Router);

  agendamentos = signal<Agendamento[]>([]);
  displayedColumns: string[] = ['id', 'dataHora', 'animalId', 'servicoId', 'observacoes'];

  ngOnInit() {
    this.agendamentosService.listar().subscribe({
      next: (data) => this.agendamentos.set(data),
      error: (err) => console.error('Erro ao listar agendamentos:', err),
    });
  }

  abrir(agendamento: Agendamento) {
    this.router.navigate(['/agendamentos', agendamento.id]);
  }

  novo() {
    this.router.navigate(['/agendamentos/novo']);
  }
}
