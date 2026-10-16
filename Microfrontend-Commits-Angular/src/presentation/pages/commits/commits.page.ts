import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { map, Observable, timer, zip } from 'rxjs';
import { GetAllCommitsUseCase } from '../../../app/core/application/usecases/get-all-commits.usecase';
import { GetCommitByHashUseCase } from '../../../app/core/application/usecases/get-commit-by-hash.usecase';
import { GetCommitsByAuthorEmailUseCase } from '../../../app/core/application/usecases/get-commits-by-author-email.usecase';
import { Commit } from '../../../app/core/domain/models/commit.model';
import { AlertComponent } from '../../components/alert/alert.component';
import { CommitTable } from '../../components/commit-table/commit-table';
import { State } from '../../interfaces/state.interface';

/**
 * Tiempo mínimo, en milisegundos, que se muestra la alerta "Cargando commits...".
 *
 * @remarks
 * Con el backend en `localhost` o con los mocks locales la respuesta llega
 * en pocos milisegundos y el estado `loading` se reemplazaría tan rápido
 * que no se alcanzaría a ver. Este tiempo garantiza que el usuario
 * perciba la carga antes de ver los resultados.
 */
export const MIN_LOADING_MS = 800;

/**
 * Componente contenedor de commits.
 *
 * Gestiona los tres casos de uso: obtener todos los commits,
 * filtrar por hash y filtrar por email del autor, y muestra el
 * resultado con el componente `CommitTable`.
 *
 * @remarks
 * Consume los casos de uso inyectándolos con `inject()`.
 * Los casos de uso se declaran en `providers` del componente y el
 * repositorio que usan se resuelve desde `app.config.ts`.
 * Forma parte de la capa de presentación de la aplicación.
 *
 * @example
 * ```ts
 * { path: '', loadComponent: () =>
 *     import('./commits.page').then((m) => m.CommitsPage) }
 * ```
 *
 * @architecture Clean Architecture
 * @layer Presentation
 *
 * @see GetAllCommitsUseCase
 * @see GetCommitByHashUseCase
 * @see GetCommitsByAuthorEmailUseCase
 */
@Component({
  selector: 'app-commits',
  templateUrl: './commits.page.html',
  imports: [FormsModule, CommitTable, AlertComponent],
  providers: [GetAllCommitsUseCase, GetCommitByHashUseCase, GetCommitsByAuthorEmailUseCase],
})
export class CommitsPage implements OnInit {
  /** Listado de commits obtenidos desde los casos de uso. */
  commits: Commit[] = [];

  /**
   * Estado actual del componente.
   * @default 'init'
   */
  state: State = 'init';

  /** Valor del filtro por hash. */
  hash = '';

  /** Valor del filtro por email del autor. */
  email = '';

  /** Caso de uso para obtener todos los commits. */
  private getAllCommitsUseCase = inject(GetAllCommitsUseCase);

  /** Caso de uso para filtrar un commit por hash. */
  private getCommitByHashUseCase = inject(GetCommitByHashUseCase);

  /** Caso de uso para filtrar commits por email del autor. */
  private getCommitsByAuthorEmailUseCase = inject(GetCommitsByAuthorEmailUseCase);

  /**
   * Inicializa el componente y carga todos los commits.
   */
  ngOnInit(): void {
    this.loadAll();
  }

  /**
   * Caso de uso 1: obtiene todos los commits y limpia los filtros.
   */
  loadAll(): void {
    this.hash = '';
    this.email = '';
    this.state = 'loading';
    this.withMinimumLoading(this.getAllCommitsUseCase.execute()).subscribe({
      next: (commits) => {
        this.commits = commits;
        this.state = 'success';
      },
      error: () => (this.state = 'error'),
    });
  }

  /**
   * Caso de uso 2: filtra por hash. Si el campo está vacío, carga todos.
   */
  filterByHash(): void {
    if (!this.hash.trim()) return this.loadAll();
    this.state = 'loading';
    this.withMinimumLoading(this.getCommitByHashUseCase.execute(this.hash.trim())).subscribe({
      next: (commit) => {
        this.commits = commit ? [commit] : [];
        this.state = 'success';
      },
      error: () => (this.state = 'error'),
    });
  }

  /**
   * Caso de uso 3: filtra por email del autor. Si el campo está vacío, carga todos.
   */
  filterByEmail(): void {
    if (!this.email.trim()) return this.loadAll();
    this.state = 'loading';
    this.withMinimumLoading(
      this.getCommitsByAuthorEmailUseCase.execute(this.email.trim()),
    ).subscribe({
      next: (commits) => {
        this.commits = commits;
        this.state = 'success';
      },
      error: () => (this.state = 'error'),
    });
  }

  /**
   * Garantiza que el estado `loading` se vea al menos `MIN_LOADING_MS`.
   *
   * @param {Observable<T>} source Observable devuelto por el caso de uso.
   * @returns {Observable<T>}
   * Observable que emite el resultado de `source` cuando han pasado
   * `MIN_LOADING_MS` milisegundos y la respuesta ya llegó. Si `source`
   * falla, el error se propaga de inmediato.
   */
  private withMinimumLoading<T>(source: Observable<T>): Observable<T> {
    return zip(source, timer(MIN_LOADING_MS)).pipe(map(([resultado]) => resultado));
  }
}
