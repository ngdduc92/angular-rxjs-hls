import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { StoreModule }              from '@ngrx/store';
import { StoreDevtoolsModule }      from '@ngrx/store-devtools';
import { EffectsModule }            from '@ngrx/effects';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { NgMaterialModule } from '../ng-material';
import { VideoPlayerModule } from '../video';

import { AppComponent } from './components/app';
import { AppHeaderComponent } from './components/header';
import { AppFooterComponent } from './components/footer';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    VideoPlayerModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
