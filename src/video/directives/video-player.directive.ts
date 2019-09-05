import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as HLS from 'hls.js';
import { PlayerStatus, Player } from '../store/models/player.model';
import * as PlayerActions from '../store/actions/player.action';
import * as VideoActions from '../store/actions/selected-video.action';
import { Video } from '../store/models/video.model';
import { VideoPlayerState } from '../store/state';
import { getVideoListState, getSelectedVideoState, getPlayerState } from '../store/reducers';

@Directive({
  selector: '[appVideoPlayer]'
})
export class VideoPlayerDirective implements OnInit, OnDestroy {

  private element: HTMLVideoElement;
  private subscription: Subscription = new Subscription();
  hls: HLS;
  videoListState: Observable<Video[]>;
  selectedVideoState: Observable<Video>;
  playerState: Observable<Player>;
  videoList: Video[];
  selectedVideo: Video;
  status: PlayerStatus;
  muted: boolean;
  volume: number;

  constructor(private store: Store<VideoPlayerState>, el: ElementRef) {
    this.element = el.nativeElement;
    this.element.ondurationchange = () => {
      this.store.dispatch(new PlayerActions.SetDuration(this.element.duration));
    };
    this.element.ontimeupdate = () => {
      this.store.dispatch(new PlayerActions.SetCurrentTime(this.element.currentTime));
    };
    this.element.onended = () => {
      this.nextVideo(this.selectedVideo.idx);
    };
  }

  ngOnInit() {
    this.videoListState = this.store.select(getVideoListState);
    this.selectedVideoState = this.store.select(getSelectedVideoState);
    this.playerState = this.store.select(getPlayerState);

    this.subscription.add(this.videoListState.subscribe(
      (data: Video[]) => {
        this.videoList = data
        if (data.length > 0 && !this.selectedVideo) {
          this.store.dispatch(new VideoActions.SetSelectedVideo(this.videoList[0]));
        }
      }
    ));
    this.subscription.add(this.selectedVideoState.subscribe(
      (data: Video) => {
        this.selectedVideo = data;
        this.status = PlayerStatus.PAUSED;
        if (this.selectedVideo) {
          this.establishHlsVideo(this.selectedVideo);
        }
      }
    ));
    this.subscription.add(this.playerState.subscribe(
      (data: Player) => {
        if (this.muted !== data.muted) {
          this.element.muted = data.muted;
        }
        if (this.volume !== data.volume) {
          this.element.volume = data.volume;
        }
        if (this.status !== data.status) {
          this.status = data.status;
          this.setPlayback(data.status);
        }
        if (data.status === PlayerStatus.SEEKING) {
          this.element.currentTime = data.currentTime;
        }
      }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextVideo(selectedVideoIdx: number) {
    const nextVideoIdx = selectedVideoIdx < (this.videoList.length - 1) ? (selectedVideoIdx + 1) : 0;
    this.store.dispatch(new VideoActions.SetSelectedVideo(this.videoList[nextVideoIdx]));
  }

  setPlayback(status: PlayerStatus) {
    switch (status) {
      case PlayerStatus.PLAYING:
        this.element.play();
        break;
      case PlayerStatus.PAUSED:
        this.element.pause();
        break;
      case PlayerStatus.SEEKING:
        this.element.pause();
        break;
      default:
    }
  }

  establishHlsVideo(video: Video): void {
    if (HLS.isSupported()) {
      if (this.hls) {
        this.hls.destroy();
      }
      this.hls = new HLS({
        startLevel: 2,
        capLevelToPlayerSize: true,
      });
      this.hls.loadSource(video.src);
      this.hls.attachMedia(this.element);
    }
  }
}
