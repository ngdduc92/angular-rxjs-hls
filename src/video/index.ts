import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgMaterialModule } from '../ng-material';
import { reducers } from './store/reducers';
import { VideoEffects } from './store/effects/video';
import { VideoPlayerContainerComponent } from './components/video-player-container';
import { VideoPlayerDirective } from './directives/video-player';
import { VideoListComponent } from './components/video-list';
import { VideoPlayerComponent } from './components/video-player';
import { VideoPlayerControlsComponent } from './components/video-player-controls';
import { PlayVideoComponent } from './components/video-player-controls/play';
import { NextVideoComponent } from './components/video-player-controls/next';
import { SeekBarComponent } from './components/video-player-controls/seek-bar';
import { TimeBoxComponent } from './components/video-player-controls/time-box';
import { VolumeComponent } from './components/video-player-controls/volume';
import { FullScreenComponent } from './components/video-player-controls/full-screen';



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
