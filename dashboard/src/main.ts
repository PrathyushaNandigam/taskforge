import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Dashboard is up</h1>`,
})
export class RootComponent {}

bootstrapApplication(RootComponent, {
  providers: [provideRouter([])],
}).catch(err => console.error(err));