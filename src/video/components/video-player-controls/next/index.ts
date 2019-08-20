import { Component, OnInit } from '@angular/core';
import * as VideoActions from '../../../store/actions/selected-video';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { Video } from '../../../store/models/video';
import { Observable, Subscription } from 'rxjs';
import { getVideoListState, getSelectedVideoState } from '../../../store/reducers';
import * as PlayerActions from '../../../store/actions/player';
import { PlayerStatus } from '../../../store/models/player';

@Component({
  selector: 'video-player-control-next',
  templateUrl: './next.html',
  styleUrls: ['./next.scss']
})
export class NextVideoComponent implements OnInit  {

  videoListState: Observable<Video[]>;
  selectedVideoState: Observable<Video>;
  videoList: Video[];
  selectedVideoIdx: number;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.videoListState = this.store.select(getVideoListState);
    this.selectedVideoState = this.store.select(getSelectedVideoState);
    this.subscription.add(this.videoListState.subscribe(
      (data: Video[]) => this.videoList = data
    ));
    this.subscription.add(this.selectedVideoState.subscribe(
      (data: Video) => this.selectedVideoIdx = data.idx
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextVideo() {
    const nextVideoIdx = this.selectedVideoIdx < (this.videoList.length-1) ? this.selectedVideoIdx+1 : 0;
    this.store.dispatch(new VideoActions.setSelectedVideo(this.videoList[nextVideoIdx]));
  }
}
