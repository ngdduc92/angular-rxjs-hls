import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { VideoPlayerState } from '../../store/state';
import { getSelectedVideoState } from '../../store/reducers';
import { Video } from '../../store/models/video';

@Component({
  selector: 'video-player-container',
  templateUrl: './video-player-container.html',
  styleUrls: ['./video-player-container.scss']
})
export class VideoPlayerContainerComponent {

  selectedVideoState: Observable<Video>;
  title: string;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.selectedVideoState = this.store.select(getSelectedVideoState);
    this.subscription = this.selectedVideoState.subscribe(
      (data: Video) => this.title = data ? data.title : ''
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
