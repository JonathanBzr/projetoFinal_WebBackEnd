import { Routes } from '@angular/router';
import { authGuardGuard } from './auth-guard-guard';

import { AnimaisListagem } from './animais/animais-listagem/animais-listagem';
import { AnimaisNovo } from './animais/animais-novo/animais-novo';
import { AnimaisDetalhe } from './animais/animais-detalhe/animais-detalhe';

import { ClientesListagem } from './clientes/clientes-listagem/clientes-listagem';
import { ClientesNovo } from './clientes/clientes-novo/clientes-novo';
import { ClientesDetalhe } from './clientes/clientes-detalhe/clientes-detalhe';

import { ServicosListagem } from './servicos/servicos-listagem/servicos-listagem';
import { ServicosNovo } from './servicos/servicos-novo/servicos-novo';
import { ServicosDetalhe } from './servicos/servicos-detalhe/servicos-detalhe';

import { AgendamentosListagem } from './agendamentos/agendamentos-listagem/agendamentos-listagem';
import { AgendamentosNovo } from './agendamentos/agendamentos-novo/agendamentos-novo';
import { AgendamentosDetalhe } from './agendamentos/agendamentos-detalhe/agendamentos-detalhe';

import { UsuariosLogin } from './usuarios-login/usuarios-login';

export const routes: Routes = [
  { path: 'login', component: UsuariosLogin },

  { path: '', redirectTo: 'animais', pathMatch: 'full' },

  { path: 'animais', component: AnimaisListagem, canActivate: [authGuardGuard] },
  { path: 'animais/novo', component: AnimaisNovo, canActivate: [authGuardGuard] },
  { path: 'animais/:id', component: AnimaisDetalhe, canActivate: [authGuardGuard] },

  { path: 'clientes', component: ClientesListagem, canActivate: [authGuardGuard] },
  { path: 'clientes/novo', component: ClientesNovo, canActivate: [authGuardGuard] },
  { path: 'clientes/:id', component: ClientesDetalhe, canActivate: [authGuardGuard] },

  { path: 'servicos', component: ServicosListagem, canActivate: [authGuardGuard] },
  { path: 'servicos/novo', component: ServicosNovo, canActivate: [authGuardGuard] },
  { path: 'servicos/:id', component: ServicosDetalhe, canActivate: [authGuardGuard] },

  { path: 'agendamentos', component: AgendamentosListagem, canActivate: [authGuardGuard] },
  { path: 'agendamentos/novo', component: AgendamentosNovo, canActivate: [authGuardGuard] },
  { path: 'agendamentos/:id', component: AgendamentosDetalhe, canActivate: [authGuardGuard] },
];
