import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, CollectionComponent, PhotoComponent } from './components';

// toDo How could we improve this routing?
const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'home_title' } },
  { path: 'collection/:collectionId', component: CollectionComponent, data: { title: 'collection_title' } },
  { path: 'collection/:collectionId/photo/:photoId', component: PhotoComponent, data: { title: 'photo_details_title' } },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
