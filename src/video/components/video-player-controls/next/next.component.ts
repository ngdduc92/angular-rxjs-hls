import { Component, OnInit, OnDestroy } from '@angular/core';
import * as VideoActions from '../../../store/actions/selected-video.action';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { Video } from '../../../store/models/video.model';
import { Observable, Subscription } from 'rxjs';
import { getVideoListState, getSelectedVideoState } from '../../../store/reducers';

@Component({
  selector: 'app-video-player-control-next',
  templateUrl: './next.component.html',
  styleUrls: ['./next.component.scss']
})
export class NextVideoComponent implements OnInit, OnDestroy {

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
      (data: Video) => this.selectedVideoIdx = data ? data.idx : 0
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  nextVideo() {
    const nextVideoIdx = this.selectedVideoIdx < (this.videoList.length - 1) ? (this.selectedVideoIdx + 1) : 0;
    this.store.dispatch(new VideoActions.SetSelectedVideo(this.videoList[nextVideoIdx]));
  }
}
