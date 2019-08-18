import { Component, OnInit } from '@angular/core';
import * as VideoActions from '../../../store/actions/selected-video';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { Video } from '../../../store/models/video';
import { Observable } from 'rxjs';

@Component({
  selector: 'video-player-control-next',
  templateUrl: './next.html',
  styleUrls: ['./next.scss']
})
export class NextVideoComponent implements OnInit  {

  state: Observable<any>;
  videoList: Video[];
  selectedVideo: Video;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit(){
    this.state = this.store.select('videoPlayer');
    this.state.subscribe(
      (data: VideoPlayerState) => {
        this.videoList = data.videoList;
        this.selectedVideo = data.selectedVideo;
      }
    )
  }

  nextVideo() {
    const nextVideoIdx = this.selectedVideo.index < (this.videoList.length-1) ? this.selectedVideo.index+1 : 0;
    this.store.dispatch(new VideoActions.setSelectedVideo(this.videoList[nextVideoIdx]));
  }
}
