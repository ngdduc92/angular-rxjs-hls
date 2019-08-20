import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { VideoPlayerState } from '../../store/state';
import * as VideoListActions from '../../store/actions/video-list.action';
import * as VideoActions from '../../store/actions/selected-video.action';
import { Video } from '../../store/models/video.model';
import { getVideoListState } from '../../store/reducers';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})

export class VideoListComponent implements OnInit, OnDestroy {

  videoListState: Observable<Video[]>;
  videoList: Video[];
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {
  }

  ngOnInit() {
    this.videoListState = this.store.select(getVideoListState);
    this.subscription = this.videoListState.subscribe(
      (data: Video[]) => this.videoList = data
    );
    this.store.dispatch(new VideoListActions.FetchVideoList());
    this.store.dispatch(new VideoActions.SetSelectedVideo(this.videoList[0]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setSelectedVideo(video: Video) {
    this.store.dispatch(new VideoActions.SetSelectedVideo(video));
  }

}
