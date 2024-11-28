import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { IBreadcrumb } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { BehaviorSubject, Observable, map } from 'rxjs';

// toDo Is there a way to improve the rendering strategy in this component?
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnInit {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  readonly photo$: BehaviorSubject<IPhoto | undefined> = new BehaviorSubject<IPhoto | undefined>(undefined);
  readonly isLoading$: Observable<boolean> = this.photo$.pipe(map(p => !p));
  breadcrumbs: IBreadcrumb[] = [];

  ngOnInit(): void {
    this.setBreadcrumbs();
    const photoId = this.activatedRoute.snapshot.params['photoId'];

    this.unsplashService.getPhoto(photoId).subscribe(photo => {
      if (photo.response) console.log(photo.response);

      // toDo Is there a better way to improve this object mapping?
      this.photo$.next(photo.response as unknown as IPhoto);
    });
  }

  /* handleGotoCollection() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId]);
  } */

  setBreadcrumbs() {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];

    this.breadcrumbs = [
      { label: 'Collections', path: '/' },
      { label: 'Collection', path: 'collection', id: collectionId },
      { label: 'Photo' }
    ];
  }
}
