import { Component, inject } from '@angular/core';
import { ButtonAtom } from '@brejcha13320/design-system-bootstrap';
import { GetAllSystemFilesUseCase } from '../../../core/application/usecases/get-all-system-files.usecase';
import { GetSystemFileByIdUseCase } from '../../../core/application/usecases/get-system-file-by-id.usecase';
import { GetSystemFilesByMimeFamilyUseCase } from '../../../core/application/usecases/get-system-files-by-mime-family.usecase';
import { SystemMimeFamily, SystemFile } from '../../../core/domain/models/system.model';
import { SYSTEM_MODULE_PROVIDERS } from '../../../system.providers';
import { AlertComponent } from '../../components/alert/alert.component';
import { SystemDetailComponent } from '../../components/system-detail/system-detail.component';
import { SystemTableComponent } from '../../components/system-table/system-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Opción del filtro por familia MIME.
 */
interface ProviderFilter {
  /** Valor del filtro: una familia MIME o 'all' para todos */
  value: SystemMimeFamily | 'all';
  /** Texto del botón */
  text: string;
}

/**
 * Página del Microfrontend de System.
 *
 * @remarks
 * Es la página que este microfrontend expone al Host. Usa los tres
 * casos de uso del módulo y no conoce el servicio ni el microservicio.
 * La pantalla tiene una sección por caso de uso:
 *
 * - `GetAllSystemFilesUseCase`: listado inicial y botón "Todos".
 * - `GetSystemFilesByMimeFamilyUseCase`: botones de cada familia MIME.
 * - `GetSystemFileByIdUseCase`: buscador por id y botón "Ver" de la tabla.
 */
@Component({
  selector: 'app-system',
  templateUrl: './system.page.html',
  imports: [SystemTableComponent, SystemDetailComponent, AlertComponent, ButtonAtom],
  providers: [SYSTEM_MODULE_PROVIDERS],
})
export class SystemPage {
  /**
   * Cantidad de archivos que se piden en cada consulta.
   */
  readonly countFiles = 10;

  /**
   * Botones del filtro por familia MIME.
   */
  readonly filters: ProviderFilter[] = [
    { value: 'all', text: 'Todos' },
    { value: 'image', text: 'Gmail' },
    { value: 'outlook.com', text: 'Outlook' },
    { value: 'yahoo.com', text: 'Yahoo' },
    { value: 'hotmail.com', text: 'Hotmail' },
  ];

  /**
   * Filtro seleccionado.
   */
  selectedFilter: SystemMimeFamily | 'all' = 'all';

  /**
   * Listado de archivos de la tabla.
   */
  files: SystemFile[] = [];

  /**
   * Estado de la carga del listado.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Archivo mostrado en el detalle.
   */
  selectedUser: SystemFile | null = null;

  /**
   * Estado de la carga del detalle.
   *
   * @default 'init'
   */
  detailState: State = 'init';

  /**
   * Mensaje que se muestra cuando el detalle no se puede cargar.
   */
  detailErrorText = 'Error al Cargar el Detalle';

  /** Caso de uso para obtener el listado de archivos. */
  private getAllSystemFilesUseCase = inject(GetAllSystemFilesUseCase);

  /** Caso de uso para obtener un archivo por id. */
  private getSystemFileByIdUseCase = inject(GetSystemFileByIdUseCase);

  /** Caso de uso para obtener archivos por familia MIME. */
  private getSystemFilesByMimeFamilyUseCase = inject(GetSystemFilesByMimeFamilyUseCase);

  /**
   * Título de la tabla: dice qué caso de uso llenó el listado.
   *
   * @returns "Listar todos los archivos" o "Filtrar por dominio: <familia MIME>"
   */
  get listTitle(): string {
    return this.selectedFilter === 'all'
      ? 'Listar todos los archivos'
      : `Filtrar por dominio: ${this.selectedFilter}`;
  }

  /**
   * Carga el listado inicial de archivos.
   */
  ngOnInit(): void {
    this.loadAll();
  }

  /**
   * Carga todos los archivos con `GetAllSystemFilesUseCase`.
   */
  loadAll(): void {
    this.state = 'loading';
    this.getAllSystemFilesUseCase.execute(this.countFiles).subscribe({
      next: (files) => {
        this.files = files;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  /**
   * Carga los archivos de una familia MIME con `GetSystemFilesByMimeFamilyUseCase`.
   *
   * @param family - Familia MIME del archivo (application, audio, image, text o video)
   */
  loadByProvider(family: SystemMimeFamily): void {
    this.state = 'loading';
    this.getSystemFilesByMimeFamilyUseCase.execute(family, this.countFiles).subscribe({
      next: (files) => {
        this.files = files;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  /**
   * Aplica el filtro pulsado.
   *
   * @param value - Valor del filtro ('all' o una familia MIME)
   */
  onFilter(value: string): void {
    this.selectedFilter = value as SystemMimeFamily | 'all';
    this.selectedUser = null;
    this.detailState = 'init';

    if (this.selectedFilter === 'all') {
      this.loadAll();
    } else {
      this.loadByProvider(this.selectedFilter);
    }
  }

  /**
   * Busca un archivo por el id escrito en el buscador.
   *
   * @remarks
   * Valida que el id sea un número entero mayor que 0 antes de llamar
   * al caso de uso. Si no lo es, muestra el mensaje de error sin hacer
   * la petición.
   *
   * @param value - Texto escrito en el campo del id
   */
  onSearch(value: string): void {
    const id = Number(value);

    if (!value || !Number.isInteger(id) || id < 1) {
      this.selectedUser = null;
      this.detailErrorText = 'Escribe un id válido (número entero mayor que 0)';
      this.detailState = 'error';
      return;
    }

    this.onSelect(id);
  }

  /**
   * Carga el detalle de un archivo con `GetSystemFileByIdUseCase`.
   *
   * @param id - Identificador del archivo
   */
  onSelect(id: number): void {
    this.detailErrorText = 'Error al Cargar el Detalle';
    this.detailState = 'loading';
    this.getSystemFileByIdUseCase.execute(id).subscribe({
      next: (file) => {
        this.selectedUser = file;
        this.detailState = 'success';
      },
      error: () => {
        this.selectedUser = null;
        this.detailState = 'error';
      },
    });
  }
}