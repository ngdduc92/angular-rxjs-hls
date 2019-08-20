import { Component, OnInit } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { PlayerStatus, Player } from '../../../store/models/player';
import { getPlayerState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'video-player-control-seek-bar',
  templateUrl: './seek-bar.html',
  styleUrls: ['./seek-bar.scss']
})
export class SeekBarComponent implements OnInit {

  currentTime: number;
  duration: number;
  seekRedWidth: number;
  playerStatus: PlayerStatus;
  playerState: Observable<Player>;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.playerState = this.store.select(getPlayerState);
    this.subscription = this.playerState.subscribe(
      (data: Player) => {
        this.currentTime = data.currentTime;
        this.duration = data.duration;
        this.seekRedWidth = 100*data.currentTime/data.duration;
        this.playerStatus = data.status;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  seekTo(event: any) {
    let playerStatus = this.playerStatus;
    this.store.dispatch(new PlayerActions.changePlayerStatus(PlayerStatus.SEEKING));
    this.store.dispatch(new PlayerActions.setCurrentTime(event.target.value));
    if (event.target.value == this.duration) {
      playerStatus = PlayerStatus.PAUSED;
    }
    this.store.dispatch(new PlayerActions.changePlayerStatus(playerStatus));
  }

}
