import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServicosService } from '../../services/servicos-service';
import { Servico } from '../../servico';

@Component({
  selector: 'app-servicos-novo',
  imports: [CommonModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './servicos-novo.html',
  styleUrl: './servicos-novo.css',
})
export class ServicosNovo {
  private servicosService = inject(ServicosService);
  private router = inject(Router);

  servico = signal<Servico>({ id: 0, nome: '', descricao: '', preco: 0 });

  salvar() {
    this.servicosService.criar(this.servico()).subscribe({
      next: () => this.router.navigate(['/servicos']),
      error: (err) => console.error('Erro ao criar serviço:', err),
    });
  }

  voltar() {
    this.router.navigate(['/servicos']);
  }
}
