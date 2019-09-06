import { Component, OnInit, OnDestroy } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player.action';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { PlayerStatus, Player } from '../../../store/models/player.model';
import { getPlayerState, getVideoListState, getSelectedVideoState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Video } from '../../../store/models/video.model';
import * as VideoActions from '../../../store/actions/selected-video.action';

@Component({
  selector: 'app-video-player-control-seek-bar',
  templateUrl: './seek-bar.component.html',
  styleUrls: ['./seek-bar.component.scss']
})
export class SeekBarComponent implements OnInit, OnDestroy {

  currentTime: number;
  duration: number;
  seekRedWidth: number;
  seekCircleRedLeft: object;
  playerStatus: PlayerStatus;
  playerState: Observable<Player>;
  preSeekingPlayerStatus: PlayerStatus;
  videoListState: Observable<Video[]>;
  selectedVideoState: Observable<Video>;
  videoList: Video[];
  selectedVideoIdx: number;
  private subscription = new Subscription();

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.videoListState = this.store.select(getVideoListState);
    this.selectedVideoState = this.store.select(getSelectedVideoState);
    this.playerState = this.store.select(getPlayerState);
    this.subscription.add(this.videoListState.subscribe(
      (data: Video[]) => this.videoList = data
    ));
    this.subscription.add(this.selectedVideoState.subscribe(
      (data: Video) => this.selectedVideoIdx = data ? data.idx : 0
    ));
    this.subscription.add(this.playerState.subscribe(
      (data: Player) => {
        const newSeekRedWidth = data.duration > 0 ? 100 * data.currentTime / data.duration : 0;
        this.seekRedWidth = newSeekRedWidth <= 100 ? newSeekRedWidth : 100;
        this.seekCircleRedLeft = { left: `calc(${this.seekRedWidth}% - 4px)`};
        this.currentTime = data.currentTime;
        this.duration = data.duration;
        this.playerStatus = data.status;
      }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startSeek() {
    this.preSeekingPlayerStatus = this.playerStatus;
    this.store.dispatch(new PlayerActions.ChangePlayerStatus(PlayerStatus.SEEKING));
  }

  seekTo(event: any) {
    this.store.dispatch(new PlayerActions.SetCurrentTime(Number(event.target.value)));
  }

  endSeek(event: any) {
    if (this.duration === Number(event.target.value)) {
      const nextVideoIdx = this.selectedVideoIdx < (this.videoList.length - 1) ? (this.selectedVideoIdx + 1) : 0;
      this.store.dispatch(new VideoActions.SetSelectedVideo(this.videoList[nextVideoIdx]));
      this.store.dispatch(new PlayerActions.ChangePlayerStatus(PlayerStatus.PLAYING));
    } else {
      this.store.dispatch(new PlayerActions.ChangePlayerStatus(this.preSeekingPlayerStatus));
    }
  }
}
