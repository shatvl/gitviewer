import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrendingPageComponent } from './components/pages/trending-page/trending-page.component';
import { SavedPageComponent } from './components/pages/saved-page/saved-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { RepositoryDetailsPageComponent } from './components/pages/repository-details-page/repository-details-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/trending', pathMatch: 'full' },
  {
    path: 'trending',
    data: { breadcrumb: 'Trending' },
    children: [
      {
        path: '',
        component: TrendingPageComponent
      },
      {
        path: ':name',
        component: RepositoryDetailsPageComponent,
        data: { breadcrumb: 'Repository Details' }
      }
    ]
  },
  {
    path: 'saved',
    component: SavedPageComponent,
    data: {
      breadcrumb: 'Saved Repositories'
    }
  },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
