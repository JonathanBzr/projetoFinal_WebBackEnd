import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AnimaisService } from '../../services/animais-service';
import { Animal } from '../../animal';

@Component({
  selector: 'app-animais-listagem',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './animais-listagem.html',
  styleUrl: './animais-listagem.css',
})
export class AnimaisListagem {
  private animaisService = inject(AnimaisService);
  private router = inject(Router);

  animais = signal<Animal[]>([]);
  displayedColumns: string[] = ['id', 'nome', 'especie', 'raca', 'idade'];

  ngOnInit() {
    this.animaisService.listar().subscribe({
      next: (data) => this.animais.set(data),
      error: (err) => console.error('Erro ao listar animais:', err),
    });
  }

  abrir(animal: Animal) {
    this.router.navigate(['/animais', animal.id]);
  }

  novo() {
    this.router.navigate(['/animais/novo']);
  }
}
