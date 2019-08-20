import { Component, OnInit, OnDestroy } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player.action';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';

@Component({
  selector: 'app-video-player-control-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit, OnDestroy {

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  toogleFullScreen() {
    this.store.dispatch(new PlayerActions.ChangeFullScreenStatus(true));
  }
}
