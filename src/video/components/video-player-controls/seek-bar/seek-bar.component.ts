import { Component, OnInit, OnDestroy } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player.action';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { PlayerStatus, Player } from '../../../store/models/player.model';
import { getPlayerState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player-control-seek-bar',
  templateUrl: './seek-bar.component.html',
  styleUrls: ['./seek-bar.component.scss']
})
export class SeekBarComponent implements OnInit, OnDestroy {

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
        this.seekRedWidth = 100 * data.currentTime / data.duration;
        this.playerStatus = data.status;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  seekTo(event: any) {
    let playerStatus = this.playerStatus;
    this.store.dispatch(new PlayerActions.ChangePlayerStatus(PlayerStatus.SEEKING));
    this.store.dispatch(new PlayerActions.SetCurrentTime(event.target.value));
    if (Number(event.target.value) === this.duration) {
      playerStatus = PlayerStatus.PAUSED;
    }
    this.store.dispatch(new PlayerActions.ChangePlayerStatus(playerStatus));
  }

}
