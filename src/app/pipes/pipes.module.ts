import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpperCaseFirstPipe } from './upper-case-first.pipe';



@NgModule({
  declarations: [UpperCaseFirstPipe],
  imports: [
    CommonModule,
  ],
  exports: [UpperCaseFirstPipe]
})
export class PipesModule { }
