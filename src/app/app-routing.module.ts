import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, CollectionComponent, PhotoComponent } from './components';

// toDo How could we improve this routing?
const routes: Routes = [
  { path: '', component: HomeComponent, data: {title: 'Photo Collections'} },
  { path: 'collection/:collectionId', component: CollectionComponent, data: {title: 'Photo Collection'} },
  { path: 'collection/:collectionId/photo/:photoId', component: PhotoComponent, data: {title: 'Photo Details'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
