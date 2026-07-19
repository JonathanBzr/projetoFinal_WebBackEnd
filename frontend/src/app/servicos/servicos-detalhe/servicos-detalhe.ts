import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServicosService } from '../../services/servicos-service';
import { Servico } from '../../servico';

@Component({
  selector: 'app-servicos-detalhe',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './servicos-detalhe.html',
  styleUrl: './servicos-detalhe.css',
})
export class ServicosDetalhe {
  private route = inject(ActivatedRoute);
  private servicosService = inject(ServicosService);
  private router = inject(Router);

  servico = signal<Servico | null>(null);
  emEdicao = signal(false);

  ngOnInit() { this.carregar(); }

  carregar() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicosService.listarPorId(id).subscribe({
      next: (data) => this.servico.set(data),
      error: (err) => console.error('Erro ao buscar serviço:', err),
    });
  }

  iniciarEdicao() { this.emEdicao.set(true); }
  cancelarEdicao() { this.emEdicao.set(false); this.carregar(); }

  salvar() {
    const s = this.servico();
    if (s) {
      this.servicosService.atualizar(s).subscribe({
        next: () => this.router.navigate(['/servicos']),
        error: (err) => console.error('Erro ao atualizar serviço:', err),
      });
    }
  }

  excluir() {
    if (confirm('Excluir este serviço?')) {
      const s = this.servico();
      if (s) {
        this.servicosService.excluir(s.id).subscribe({
          next: () => this.router.navigate(['/servicos']),
          error: (err) => console.error('Erro ao excluir serviço:', err),
        });
      }
    }
  }

  voltar() { this.router.navigate(['/servicos']); }
}
