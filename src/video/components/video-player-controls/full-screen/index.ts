import { Component, OnInit } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';

@Component({
  selector: 'video-player-control-full-screen',
  templateUrl: './full-screen.html',
  styleUrls: ['./full-screen.scss']
})
export class FullScreenComponent implements OnInit  {

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toogleFullScreen() {
    this.store.dispatch(new PlayerActions.changeFullScreenStatus(true));
  }
}
