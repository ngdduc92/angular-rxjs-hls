import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { VideoPlayerState } from '../../store/state';
import * as VideoListActions from '../../store/actions/video-list';
import * as VideoActions from '../../store/actions/selected-video';
import { Video } from '../../store/models/video';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.html',
  styleUrls: ['./video-list.scss']
})

export class VideoListComponent implements OnInit {

  state: Observable<any>;
  videoList: Video[];
  selectedVideo: Video;

  constructor(private store: Store<VideoPlayerState>) {
    this.store.dispatch(new VideoListActions.fetchVideoList());
  }

  ngOnInit() {
    this.state = this.store.select('videoPlayer');
    this.state.subscribe(
      (data: VideoPlayerState) => {
        this.videoList = data.videoList;
        this.selectedVideo = this.videoList[0];
      }
    )
    this.store.dispatch(new VideoActions.setSelectedVideo(this.selectedVideo));
  }

  setSelectedVideo(video: Video) {
    this.store.dispatch(new VideoActions.setSelectedVideo(video));
  }

}
