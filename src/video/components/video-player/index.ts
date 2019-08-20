import { Component, OnInit } from '@angular/core';
import * as PlayerActions from '../../store/actions/player';
import { Store } from '@ngrx/store';
import { PlayerStatus, Player } from '../../store/models/player';
import { VideoPlayerState } from '../../store/state';
import { getPlayerState } from '../../store/reducers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.html',
  styleUrls: ['./video-player.scss']
})
export class VideoPlayerComponent implements OnInit  {

  status: PlayerStatus;
  playerState: Observable<Player>;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit(){
    this.playerState = this.store.select(getPlayerState);
    this.subscription = this.playerState.subscribe(
      (data: Player) => this.status = data.status
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleVideo() {
    if (this.status === PlayerStatus.PAUSED) {
      this.store.dispatch(new PlayerActions.changePlayIcon('pause'));
      this.store.dispatch(new PlayerActions.changePlayerStatus(PlayerStatus.PLAYING));
    } else {
      this.store.dispatch(new PlayerActions.changePlayIcon('play_arrow'));
      this.store.dispatch(new PlayerActions.changePlayerStatus(PlayerStatus.PAUSED));
    }
  }
}
