import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Video } from '../../store/models/video';
import { VideoPlayerState } from '../../store/state';

@Component({
  selector: 'video-player-container',
  templateUrl: './video-player-container.html',
  styleUrls: ['./video-player-container.scss']
})
export class VideoPlayerContainerComponent {

  state: Observable<any>;
  video: Video;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.state = this.store.select('videoPlayer');
    this.state.subscribe(
      (val:any) => {
        this.video = val.selectedVideo;
      }
    )
  }
}
