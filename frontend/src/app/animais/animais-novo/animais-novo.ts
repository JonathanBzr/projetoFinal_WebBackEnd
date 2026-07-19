import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AnimaisService } from '../../services/animais-service';
import { Animal } from '../../animal';

@Component({
  selector: 'app-animais-novo',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './animais-novo.html',
  styleUrl: './animais-novo.css',
})
export class AnimaisNovo {
  private animaisService = inject(AnimaisService);
  private router = inject(Router);

  animal = signal<Animal>({ id: 0, nome: '', especie: '', raca: '', idade: 0, clienteId: 0 });

  salvar() {
    this.animaisService.criar(this.animal()).subscribe({
      next: () => this.router.navigate(['/animais']),
      error: (err) => console.error('Erro ao criar animal:', err),
    });
  }

  voltar() {
    this.router.navigate(['/animais']);
  }
}
