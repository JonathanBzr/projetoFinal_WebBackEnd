import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientesService } from '../../services/clientes-service';
import { Cliente } from '../../cliente';

@Component({
  selector: 'app-clientes-detalhe',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './clientes-detalhe.html',
  styleUrl: './clientes-detalhe.css',
})
export class ClientesDetalhe {
  private route = inject(ActivatedRoute);
  private clientesService = inject(ClientesService);
  private router = inject(Router);

  cliente = signal<Cliente | null>(null);
  emEdicao = signal(false);

  ngOnInit() { this.carregar(); }

  carregar() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clientesService.listarPorId(id).subscribe({
      next: (data) => this.cliente.set(data),
      error: (err) => console.error('Erro ao buscar cliente:', err),
    });
  }

  iniciarEdicao() { this.emEdicao.set(true); }
  cancelarEdicao() { this.emEdicao.set(false); this.carregar(); }

  salvar() {
    const c = this.cliente();
    if (c) {
      this.clientesService.atualizar(c).subscribe({
        next: () => this.router.navigate(['/clientes']),
        error: (err) => console.error('Erro ao atualizar cliente:', err),
      });
    }
  }

  excluir() {
    if (confirm('Excluir este cliente?')) {
      const c = this.cliente();
      if (c) {
        this.clientesService.excluir(c.id).subscribe({
          next: () => this.router.navigate(['/clientes']),
          error: (err) => console.error('Erro ao excluir cliente:', err),
        });
      }
    }
  }

  voltar() { this.router.navigate(['/clientes']); }
}
