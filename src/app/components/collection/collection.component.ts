import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal
} from '@angular/core';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IPhoto } from '@app/interfaces';
import { UnsplashService } from '@app/services';
import { IBreadcrumb } from '@app/shared/components/breadcrumbs/breadcrumbs.component';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit, OnDestroy {
  private readonly unsplashService: UnsplashService = inject(UnsplashService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private translateService: TranslateService = inject(TranslateService);
  private titleService: Title = inject(Title);
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  breadcrumbs: IBreadcrumb[] = [{ label: 'collections', path: '/' }, { label: 'collection' }];
  readonly photos$: BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>([]);
  // toDo Is there another way using new Angular features to replace rjxs - DONE
  //readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  readonly isLoading: WritableSignal<boolean> = signal(false);
  private translateSub$!: Subscription;
  private requestsSub$!: Subscription;
  pageTitle: string | undefined;

  constructor() {
    const routeTitle = this.activatedRoute.snapshot.data['title'];
    this.pageTitle = routeTitle;
    this.translateSub$ = this.translateService.get(routeTitle).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  ngOnInit(): void {
    //this.isLoading$.next(true);
    this.isLoading.set(true);
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];

    const requests = forkJoin({
      collectionPhotos: this.unsplashService.listCollectionPhotos(collectionId),
      collection: this.unsplashService.getCollection(collectionId)
    });

    this.requestsSub$ = requests.subscribe(response => {
      if (response.collection) {
        this.pageTitle = response.collection.response?.title;
        this.cdr.detectChanges();
      }
      if (response.collectionPhotos) {
        this.photos$.next(response.collectionPhotos.response?.results || []);
        this.isLoading.set(false);
        this.cdr.detectChanges();
      }
    });
  }

  handleGotoPhoto(photo: IPhoto) {
    const collectionId = this.activatedRoute.snapshot.params['collectionId'];
    return this.router.navigate(['collection', collectionId, 'photo', photo.id]);
  }

  ngOnDestroy(): void {
    this.translateSub$.unsubscribe();
    this.requestsSub$.unsubscribe();
  }
}
