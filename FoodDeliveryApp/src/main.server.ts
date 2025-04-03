import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { AppServerModule } from './app/app.server.module';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(AppServerModule)
    ]
  });
}