import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PhotoComponent } from './photo.component';
import { SharedModule } from '@app/shared/shared.module';
import { TranslatePipe } from '@ngx-translate/core';

@NgModule({
  declarations: [PhotoComponent],
  imports: [CommonModule, RouterModule, MatToolbarModule, MatProgressBarModule, MatCardModule, MatIconModule, SharedModule, TranslatePipe],
  exports: [PhotoComponent]
})
export class PhotoModule {}
