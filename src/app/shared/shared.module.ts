import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@app/pipes/pipes.module';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './components/title/title.component';
import { MatToolbar } from '@angular/material/toolbar';
import { TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [BreadcrumbsComponent, TitleComponent],
  imports: [CommonModule, MatToolbar, PipesModule, TranslatePipe],
  exports: [PipesModule, BreadcrumbsComponent, TitleComponent]
})
export class SharedModule {}
