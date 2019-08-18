import { Directive, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as HLS from 'hls.js';
import { PlayerStatus } from '../store/models/player';
import * as PlayerActions from '../store/actions/player';
import * as VideoActions from '../store/actions/selected-video';
import { Video } from '../store/models/video';
import { VideoPlayerState } from '../store/state';
import { getVideoListState, getSelectedVideoState, getPlayerState } from '../store/reducers';

@Directive({
  selector: '[appVideoPlayer]'
})
export class VideoPlayerDirective {

  private element: HTMLVideoElement;
  hls: any;
  videoListState: Observable<any>;
  selectedVideoState: Observable<any>;
  playerState: Observable<any>;
  videoList: Video[];
  selectedVideo: Video;

  constructor(private store: Store<VideoPlayerState>, el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.videoListState = this.store.select(getVideoListState);
    this.selectedVideoState = this.store.select(getSelectedVideoState);
    this.playerState = this.store.select(getPlayerState);

    this.videoListState.subscribe((data: any) => this.videoList = data);
    this.selectedVideoState.subscribe((data: any) => {
      this.selectedVideo = data;
      this.establishHlsVideo(data);
    });
    this.playerState.subscribe(
      (data: any) => {
        this.setPlayback(data.status);
        this.seekTo(data.status, data.currentTime);
    });
    
    this.element.ondurationchange = () => {
      this.store.dispatch(new PlayerActions.setDuration(this.element.duration));
    };
    this.element.ontimeupdate = () => {
      this.store.dispatch(new PlayerActions.setCurrentTime(this.element.currentTime));
    };
    this.element.onended = () => {
      const nextVideoIdx = this.selectedVideo.index < (this.videoList.length-1) ? this.selectedVideo.index+1 : 0;
      this.store.dispatch(new VideoActions.setSelectedVideo(this.videoList[nextVideoIdx]));
    };
  }

  setPlayback(status: PlayerStatus) {
    switch(status) {
      case PlayerStatus.PLAYING:
        this.element.play();
        break;
      case PlayerStatus.PAUSED:
        this.element.pause();
    }
  }

  seekTo(status: PlayerStatus, currentTime: number) {
    if (status === PlayerStatus.SEEKING) {
      this.element.currentTime = currentTime;
    }
  }

  establishHlsVideo(video: Video): void {
    if (this.hls) {
      this.hls.destroy();
    }
    this.hls = new HLS({
      startLevel: 2,
      capLevelToPlayerSize: true,
    });
    if (HLS.isSupported()) {
      this.hls.attachMedia(this.element);
      this.hls.loadSource(video.src);
        this.hls.on(HLS.Events.MANIFEST_PARSED, (event, data) => {
          this.store.dispatch(new PlayerActions.setAvailableLevels(data.levels));
        });
    }
  }

}
