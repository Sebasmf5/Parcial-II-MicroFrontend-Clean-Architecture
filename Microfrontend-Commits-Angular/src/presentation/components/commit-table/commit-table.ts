import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { Commit, CommitBranch } from '../../../app/core/domain/models/commit.model';

/**
 * Componente de tabla de commits.
 *
 * Se utiliza para mostrar un listado de commits en una tabla,
 * con información como hash, mensaje, autor, rama, fecha y archivos,
 * y un badge visual que indica la rama de cada commit.
 *
 * @remarks
 * Recibe los commits desde un componente padre a través del Input `commits`
 * y utiliza el mapeo `branchMap` para asignar colores a los badges según la rama.
 * Forma parte de la capa de presentación y se considera un **organismo**
 * dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-commit-table [commits]="commitsList"></app-commit-table>
 * ```
 */
@Component({
  selector: 'app-commit-table',
  templateUrl: './commit-table.html',
  imports: [DatePipe, BadgeAtom],
})
export class CommitTable {
  /**
   * Listado de commits que se mostrarán en la tabla.
   * @type {Commit[]}
   * @remarks
   * Cada commit debe cumplir la interfaz `Commit`.
   */
  @Input() commits: Commit[] = [];

  /**
   * Mapeo de ramas a tipos de Badge.
   * @type {Record<CommitBranch, BadgeType>}
   * @remarks
   * - 'main' → 'danger' (rojo)
   * - 'develop' → 'primary' (azul)
   * - 'feature/commits' → 'success' (verde)
   * - 'fix/commit-filter' → 'warning' (amarillo)
   */
  branchMap: Record<CommitBranch, BadgeType> = {
    main: 'danger',
    develop: 'primary',
    'feature/commits': 'success',
    'fix/commit-filter': 'warning',
  };
}