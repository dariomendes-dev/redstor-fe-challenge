import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { IBreadcrumb } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';

// toDo Is there a way to improve the rendering strategy in this component?
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoComponent implements OnInit {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private titleService: Title = inject(Title);
  private translateService: TranslateService = inject(TranslateService);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  readonly photo$: BehaviorSubject<IPhoto | undefined> = new BehaviorSubject<IPhoto | undefined>(undefined);
  readonly isLoading$: Observable<boolean> = this.photo$.pipe(map(p => !p));
  private translateSub$!: Subscription;

  breadcrumbs: IBreadcrumb[] = [];
  pageTitle = '';

  constructor() {
    const routeTitle = this.activatedRoute.snapshot.data['title'];
    this.pageTitle = routeTitle;
    this.translateSub$ = this.translateService.get(routeTitle).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

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
      { label: 'collections', path: '/' },
      { label: 'collection', path: 'collection', id: collectionId },
      { label: 'photo' }
    ];
  }
}
