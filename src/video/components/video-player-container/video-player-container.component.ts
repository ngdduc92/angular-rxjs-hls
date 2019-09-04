import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { VideoPlayerState } from '../../store/state';
import { getSelectedVideoState } from '../../store/reducers';
import { Video } from '../../store/models/video.model';

@Component({
  selector: 'app-video-player-container',
  templateUrl: './video-player-container.component.html'
})
export class VideoPlayerContainerComponent implements OnInit, OnDestroy {

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
