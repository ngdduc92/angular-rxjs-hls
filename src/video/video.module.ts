import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgMaterialModule } from '../ng-material/ng-material.module';
import { reducers } from './store/reducers';
import { VideoEffects } from './store/effects/video.effect';
import { VideoPlayerContainerComponent } from './components/video-player-container/video-player-container.component';
import { VideoPlayerDirective } from './directives/video-player.directive';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { VideoPlayerControlsComponent } from './components/video-player-controls/video-player-controls.component';
import { PlayVideoComponent } from './components/video-player-controls/play/play.component';
import { NextVideoComponent } from './components/video-player-controls/next/next.component';
import { SeekBarComponent } from './components/video-player-controls/seek-bar/seek-bar.component';
import { TimeBoxComponent } from './components/video-player-controls/time-box/time-box.component';
import { VolumeComponent } from './components/video-player-controls/volume/volume.component';
import { FullScreenComponent } from './components/video-player-controls/full-screen/full-screen.component';

@NgModule({
  imports: [
    CommonModule,
    NgMaterialModule,
    StoreModule.forFeature('videoPlayer', reducers),
    EffectsModule.forFeature([VideoEffects])
  ],
  exports: [
    VideoPlayerContainerComponent,
    VideoPlayerComponent,
    VideoPlayerControlsComponent,
    VideoListComponent,
    PlayVideoComponent,
    NextVideoComponent,
    SeekBarComponent,
    TimeBoxComponent,
    VolumeComponent,
    FullScreenComponent
  ],
  declarations: [
    VideoPlayerContainerComponent,
    VideoPlayerComponent,
    VideoPlayerControlsComponent,
    VideoPlayerDirective,
    VideoListComponent,
    PlayVideoComponent,
    NextVideoComponent,
    SeekBarComponent,
    TimeBoxComponent,
    VolumeComponent,
    FullScreenComponent
  ]
})
export class VideoPlayerModule { }
