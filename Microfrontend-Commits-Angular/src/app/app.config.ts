import { ApplicationConfig, Provider, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { CommitRepository } from './core/domain/repositories/commit.repository';
import { CommitLocalRepositoryImpl } from './core/infrastructure/repositories/local/commit-local.repository.impl';
import { CommitSpringBootRepositoryImpl } from './core/infrastructure/repositories/spring/commit-spring-boot.repository.impl';

export const commitsProviders: Provider[] = [
  // Local Providers
  // { provide: CommitRepository, useClass: CommitLocalRepositoryImpl },

  // SpringBoot Providers
  { provide: CommitRepository, useClass: CommitSpringBootRepositoryImpl },
];

export const appConfig: ApplicationConfig = {
  providers: [
    ...commitsProviders,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
};