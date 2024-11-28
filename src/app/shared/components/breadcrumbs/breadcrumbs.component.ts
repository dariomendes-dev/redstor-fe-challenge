import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface IBreadcrumb {
  label: string;
  path?: string;
  id?: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  private readonly router: Router = inject(Router);
  @Input() breadcrumbs!: IBreadcrumb[];


  clickBreadcrumb(path: string, id?: string) {
    if (id) {
      return this.router.navigate([path, id]);
    } else {
      return this.router.navigate([path]);
    }
  }
}
