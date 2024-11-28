import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { ICollection } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { IBreadcrumb } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { SharedModule } from '@app/shared/shared.module';
import { Subscription } from 'rxjs';
import { PaginationService } from '@app/services/pagination.service';
import { Store } from '@ngrx/store';
import { CollectionsFacade } from 'src/app/store/collections/collections.facade';

// toDo Transform this module in a standalone component - DONE
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatCardModule,
    SharedModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule
  ], //needs imports on standalone
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly router: Router = inject(Router);
  readonly unsplashService: UnsplashService = inject(UnsplashService);
  readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  readonly paginationService: PaginationService = inject(PaginationService);
  readonly store: Store = inject(Store);
  readonly collectionsFacade: CollectionsFacade = inject(CollectionsFacade);
  private collectionSub$!: Subscription;

  // toDo Why the changes are not reflected in the UI? DONE - use changeDetectorRef
  isLoading: boolean = false;
  collections: ICollection[] = [];
  breadcrumbs: IBreadcrumb[] = [{ label: 'Collections' }];
  currentPage: number = 1;
  photosPerPage: number = 10;

  constructor() {}

  ngOnInit(): void {
    this.currentPage = this.paginationService.collectionPage;
    this.getCollections();
  }

  getCollections() {
    // toDo Improve this call using the store (ngrx)
    //this.collectionsFacade.loadCollections(this.currentPage, this.photosPerPage); //use for ngrx
    if (this.collectionSub$) {
      this.collectionSub$.unsubscribe();
    }

    this.isLoading = true;
    // toDo What's happening with this subscription in case the component is destroyed? The subscription will persist and can cause memory issues. It should be unsubscribed when the component is destroyed.
    // toDo Is there another way to do this operation? DONE - added unsubscribe
    // toDo Could we add a pagination?  DONE
    this.collectionSub$ = this.unsplashService.listCollections(this.currentPage, this.photosPerPage).subscribe(collections => {
      this.collections = collections?.response?.results || [];
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  previousPage() {
    this.paginationService.collectionPage--;
    this.currentPage = this.paginationService.collectionPage;
    this.getCollections();
  }

  nextPage() {
    this.paginationService.collectionPage++;
    this.currentPage = this.paginationService.collectionPage;
    this.getCollections();
  }

  changedPerPage(event: MatSelectChange) {
    this.photosPerPage = event.value;
    this.getCollections();
  }

  ngOnDestroy(): void {
    this.collectionSub$.unsubscribe();
  }
}
