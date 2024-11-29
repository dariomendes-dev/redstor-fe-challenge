import { Component } from '@angular/core';
import { TranslatorService } from './services/translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private translatorService: TranslatorService) {
    this.translatorService.setDefaultLanguage('en');
  }
  switchToPortuguese() {
    this.translatorService.useLanguage('pt');
  }
  switchToEnglish() {
    this.translatorService.useLanguage('en');
  }
}
