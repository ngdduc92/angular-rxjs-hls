import { Component, OnInit, OnDestroy } from '@angular/core';
import * as PlayerActions from '../../store/actions/player.action';
import { Store } from '@ngrx/store';
import { PlayerStatus, Player } from '../../store/models/player.model';
import { VideoPlayerState } from '../../store/state';
import { getPlayerState } from '../../store/reducers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  controlsVisibility = 'visible';
  cursor = 'default';
  status: PlayerStatus;
  playerState: Observable<Player>;
  timer: any;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {
  }

  ngOnInit() {
    this.playerState = this.store.select(getPlayerState);
    this.subscription = this.playerState.subscribe(
      (data: Player) => this.status = data.status);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleVideo() {
    if (this.status === PlayerStatus.PLAYING) {
      this.store.dispatch(new PlayerActions.ChangePlayerStatus(PlayerStatus.PAUSED));
    } else {
      this.store.dispatch(new PlayerActions.ChangePlayerStatus(PlayerStatus.PLAYING));
    }
  }

  showControls() {
    this.controlsVisibility = 'visible';
    this.cursor = 'default';
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.status === PlayerStatus.PLAYING) {
        this.controlsVisibility = 'hidden';
        this.cursor = 'none';
      }
    }, 3000);
  }

  hideControls() {
    if (this.status === PlayerStatus.PLAYING) {
      this.controlsVisibility = 'hidden';
    }
  }
}
