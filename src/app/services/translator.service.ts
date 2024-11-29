import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  constructor(private translate: TranslateService) {}

  setDefaultLanguage(lang: string): void {
    this.translate.setDefaultLang(lang);
  }

  useLanguage(lang: string): void {
    this.translate.use(lang);
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}