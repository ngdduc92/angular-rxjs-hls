import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { VideoPlayerModule } from '../video/video.module';
import { AppRootComponent } from './components/root/root.component';
import { AppHeaderComponent } from './components/header/header.component';
import { AppFooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppRootComponent,
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
  bootstrap: [AppRootComponent]
})
export class AppModule {}
