import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private _collectionPage: number = 1;

  set collectionPage(value: number) {
    if (value > 0) {
      this._collectionPage = value;
    }
  }

  get collectionPage(): number {
    return this._collectionPage;
  }
}
