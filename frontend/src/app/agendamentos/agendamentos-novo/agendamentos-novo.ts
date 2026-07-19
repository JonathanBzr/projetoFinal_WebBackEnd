import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgendamentosService } from '../../services/agendamentos-service';
import { Agendamento } from '../../agendamento';

@Component({
  selector: 'app-agendamentos-novo',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './agendamentos-novo.html',
  styleUrl: './agendamentos-novo.css',
})
export class AgendamentosNovo {
  private agendamentosService = inject(AgendamentosService);
  private router = inject(Router);

  agendamento = signal<Agendamento>({
    id: 0,
    dataHora: '',
    observacoes: '',
    animalId: 0,
    servicoId: 0,
  });

  salvar() {
    this.agendamentosService.criar(this.agendamento()).subscribe({
      next: () => this.router.navigate(['/agendamentos']),
      error: (err) => console.error('Erro ao criar agendamento:', err),
    });
  }

  voltar() {
    this.router.navigate(['/agendamentos']);
  }
}
