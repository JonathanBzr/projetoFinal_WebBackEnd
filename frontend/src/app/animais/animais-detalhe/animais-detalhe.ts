import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnimaisService } from '../../services/animais-service';
import { Animal } from '../../animal';

@Component({
  selector: 'app-animais-detalhe',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './animais-detalhe.html',
  styleUrl: './animais-detalhe.css',
})
export class AnimaisDetalhe {
  private route = inject(ActivatedRoute);
  private animaisService = inject(AnimaisService);
  private router = inject(Router);

  animal = signal<Animal | null>(null);
  emEdicao = signal(false);

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animaisService.listarPorId(id).subscribe({
      next: (data) => this.animal.set(data),
      error: (err) => console.error('Erro ao buscar animal:', err),
    });
  }

  iniciarEdicao() { this.emEdicao.set(true); }

  cancelarEdicao() {
    this.emEdicao.set(false);
    this.carregar();
  }

  salvar() {
    const a = this.animal();
    if (a) {
      this.animaisService.atualizar(a).subscribe({
        next: () => this.router.navigate(['/animais']),
        error: (err) => console.error('Erro ao atualizar animal:', err),
      });
    }
  }

  excluir() {
    if (confirm('Excluir este animal?')) {
      const a = this.animal();
      if (a) {
        this.animaisService.excluir(a.id).subscribe({
          next: () => this.router.navigate(['/animais']),
          error: (err) => console.error('Erro ao excluir animal:', err),
        });
      }
    }
  }

  voltar() { this.router.navigate(['/animais']); }
}
