import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AgendamentosService } from '../../services/agendamentos-service';
import { Agendamento } from '../../agendamento';

@Component({
  selector: 'app-agendamentos-detalhe',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './agendamentos-detalhe.html',
  styleUrl: './agendamentos-detalhe.css',
})
export class AgendamentosDetalhe {
  private route = inject(ActivatedRoute);
  private agendamentosService = inject(AgendamentosService);
  private router = inject(Router);

  agendamento = signal<Agendamento | null>(null);
  emEdicao = signal(false);

  ngOnInit() { this.carregar(); }

  carregar() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.agendamentosService.listarPorId(id).subscribe({
      next: (data) => this.agendamento.set(data),
      error: (err) => console.error('Erro ao buscar agendamento:', err),
    });
  }

  iniciarEdicao() { this.emEdicao.set(true); }
  cancelarEdicao() { this.emEdicao.set(false); this.carregar(); }

  salvar() {
    const a = this.agendamento();
    if (a) {
      this.agendamentosService.atualizar(a).subscribe({
        next: () => this.router.navigate(['/agendamentos']),
        error: (err) => console.error('Erro ao atualizar agendamento:', err),
      });
    }
  }

  excluir() {
    if (confirm('Excluir este agendamento?')) {
      const a = this.agendamento();
      if (a) {
        this.agendamentosService.excluir(a.id).subscribe({
          next: () => this.router.navigate(['/agendamentos']),
          error: (err) => console.error('Erro ao excluir agendamento:', err),
        });
      }
    }
  }

  voltar() { this.router.navigate(['/agendamentos']); }
}
