import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { VideoPlayerState } from '../../store/state';
import * as VideoListActions from '../../store/actions/video-list';
import * as VideoActions from '../../store/actions/selected-video';
import { Video } from '../../store/models/video';
import { getVideoListState } from '../../store/reducers';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.html',
  styleUrls: ['./video-list.scss']
})

export class VideoListComponent implements OnInit {

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
    this.store.dispatch(new VideoListActions.fetchVideoList());
    this.store.dispatch(new VideoActions.setSelectedVideo(this.videoList[0]));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setSelectedVideo(video: Video) {
    this.store.dispatch(new VideoActions.setSelectedVideo(video));
  }

}
