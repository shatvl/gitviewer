import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AntdModule } from './modules/antd/antd.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TrendingPageComponent } from './components/pages/trending-page/trending-page.component';
import { HttpClientModule } from '@angular/common/http';
import { RepositoryComponent } from './components/repository/repository.component';
import { IconsModule } from './modules/icons/icons.module';
import { SavedPageComponent } from './components/pages/saved-page/saved-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { RepositoryDetailsPageComponent } from './components/pages/repository-details-page/repository-details-page.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import effects from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { GitUserComponent } from './components/git-user/git-user.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    TrendingPageComponent,
    RepositoryComponent,
    SavedPageComponent,
    NotFoundPageComponent,
    RepositoryDetailsPageComponent,
    GitUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AntdModule,
    IconsModule,
    ScrollingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule {}
