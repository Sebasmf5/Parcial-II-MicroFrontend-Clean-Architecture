import { Component, inject } from '@angular/core';
import { ButtonAtom } from '@brejcha13320/design-system-bootstrap';
import { GetAllInternetUsersUseCase } from '../../../core/application/usecases/get-all-internet-users.usecase';
import { GetInternetUserByIdUseCase } from '../../../core/application/usecases/get-internet-user-by-id.usecase';
import { GetInternetUsersByProviderUseCase } from '../../../core/application/usecases/get-internet-users-by-provider.usecase';
import { InternetProvider, InternetUser } from '../../../core/domain/models/internet.model';
import { INTERNET_MODULE_PROVIDERS } from '../../../internet.providers';
import { AlertComponent } from '../../components/alert/alert.component';
import { InternetDetailComponent } from '../../components/internet-detail/internet-detail.component';
import { InternetTableComponent } from '../../components/internet-table/internet-table.component';
import { State } from '../../interfaces/state.interface';

/**
 * Opción del filtro por proveedor de correo.
 */
interface ProviderFilter {
  /** Valor del filtro: un proveedor o 'all' para todos */
  value: InternetProvider | 'all';
  /** Texto del botón */
  text: string;
}

/**
 * Página del Microfrontend de Internet.
 *
 * @remarks
 * Es la página que este microfrontend expone al Host. Usa los tres
 * casos de uso del módulo y no conoce el servicio ni el microservicio.
 * La pantalla tiene una sección por caso de uso:
 *
 * - `GetAllInternetUsersUseCase`: listado inicial y botón "Todos".
 * - `GetInternetUsersByProviderUseCase`: botones de cada proveedor.
 * - `GetInternetUserByIdUseCase`: buscador por id y botón "Ver" de la tabla.
 */
@Component({
  selector: 'app-internet',
  templateUrl: './internet.page.html',
  imports: [InternetTableComponent, InternetDetailComponent, AlertComponent, ButtonAtom],
  providers: [INTERNET_MODULE_PROVIDERS],
})
export class InternetPage {
  /**
   * Cantidad de usuarios que se piden en cada consulta.
   */
  readonly countUsers = 10;

  /**
   * Botones del filtro por proveedor de correo.
   */
  readonly filters: ProviderFilter[] = [
    { value: 'all', text: 'Todos' },
    { value: 'gmail.com', text: 'Gmail' },
    { value: 'outlook.com', text: 'Outlook' },
    { value: 'yahoo.com', text: 'Yahoo' },
    { value: 'hotmail.com', text: 'Hotmail' },
  ];

  /**
   * Filtro seleccionado.
   */
  selectedFilter: InternetProvider | 'all' = 'all';

  /**
   * Listado de usuarios de la tabla.
   */
  users: InternetUser[] = [];

  /**
   * Estado de la carga del listado.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Usuario mostrado en el detalle.
   */
  selectedUser: InternetUser | null = null;

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

  /** Caso de uso para obtener el listado de usuarios. */
  private getAllInternetUsersUseCase = inject(GetAllInternetUsersUseCase);

  /** Caso de uso para obtener un usuario por id. */
  private getInternetUserByIdUseCase = inject(GetInternetUserByIdUseCase);

  /** Caso de uso para obtener usuarios por proveedor. */
  private getInternetUsersByProviderUseCase = inject(GetInternetUsersByProviderUseCase);

  /**
   * Título de la tabla: dice qué caso de uso llenó el listado.
   *
   * @returns "Listar todos los usuarios" o "Filtrar por dominio: <proveedor>"
   */
  get listTitle(): string {
    return this.selectedFilter === 'all'
      ? 'Listar todos los usuarios'
      : `Filtrar por dominio: ${this.selectedFilter}`;
  }

  /**
   * Carga el listado inicial de usuarios.
   */
  ngOnInit(): void {
    this.loadAll();
  }

  /**
   * Carga todos los usuarios con `GetAllInternetUsersUseCase`.
   */
  loadAll(): void {
    this.state = 'loading';
    this.getAllInternetUsersUseCase.execute(this.countUsers).subscribe({
      next: (users) => {
        this.users = users;
        this.state = 'success';
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  /**
   * Carga los usuarios de un proveedor con `GetInternetUsersByProviderUseCase`.
   *
   * @param provider - Proveedor (dominio) del correo
   */
  loadByProvider(provider: InternetProvider): void {
    this.state = 'loading';
    this.getInternetUsersByProviderUseCase.execute(provider, this.countUsers).subscribe({
      next: (users) => {
        this.users = users;
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
   * @param value - Valor del filtro ('all' o un proveedor)
   */
  onFilter(value: string): void {
    this.selectedFilter = value as InternetProvider | 'all';
    this.selectedUser = null;
    this.detailState = 'init';

    if (this.selectedFilter === 'all') {
      this.loadAll();
    } else {
      this.loadByProvider(this.selectedFilter);
    }
  }

  /**
   * Busca un usuario por el id escrito en el buscador.
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
   * Carga el detalle de un usuario con `GetInternetUserByIdUseCase`.
   *
   * @param id - Identificador del usuario
   */
  onSelect(id: number): void {
    this.detailErrorText = 'Error al Cargar el Detalle';
    this.detailState = 'loading';
    this.getInternetUserByIdUseCase.execute(id).subscribe({
      next: (user) => {
        this.selectedUser = user;
        this.detailState = 'success';
      },
      error: () => {
        this.selectedUser = null;
        this.detailState = 'error';
      },
    });
  }
}