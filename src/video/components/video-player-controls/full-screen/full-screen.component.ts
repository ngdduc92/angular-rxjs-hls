import { Component, OnInit, OnDestroy } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player.action';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { getPlayerState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../../store/models/player.model';

@Component({
  selector: 'app-video-player-control-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit, OnDestroy {

  icon: string;
  fullScreenStatus: boolean;
  playerState: Observable<Player>;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.playerState = this.store.select(getPlayerState);
    this.subscription = this.playerState.subscribe(
      (data: Player) => {
        this.icon = data.fullscreenIcon;
        this.fullScreenStatus = data.fullScreenStatus
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleFullScreen() {
    const newStatus = !this.fullScreenStatus;
    const newIcon = newStatus ? 'fullscreen_exit' : 'fullscreen';
    this.store.dispatch(new PlayerActions.ChangeFullScreenIcon(newIcon));
    this.store.dispatch(new PlayerActions.ChangeFullScreenStatus(newStatus));
  }
}
