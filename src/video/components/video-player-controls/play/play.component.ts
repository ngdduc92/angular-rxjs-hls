import { Component, OnInit, OnDestroy } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player.action';
import { Store } from '@ngrx/store';
import { PlayerStatus, Player } from '../../../store/models/player.model';
import { VideoPlayerState } from '../../../store/state';
import { getPlayerState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-video-player-control-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayVideoComponent implements OnInit, OnDestroy {

  status: PlayerStatus;
  icon: string;
  playerState: Observable<Player>;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.playerState = this.store.select(getPlayerState);
    this.subscription = this.playerState.subscribe(
      (data: Player) => {
        this.status = data.status;
        this.icon = data.playIcon;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleVideo() {
    if (this.status === PlayerStatus.PAUSED) {
      this.store.dispatch(new PlayerActions.ChangePlayIcon('pause'));
      this.store.dispatch(new PlayerActions.ChangePlayerStatus(PlayerStatus.PLAYING));
    } else {
      this.store.dispatch(new PlayerActions.ChangePlayIcon('play_arrow'));
      this.store.dispatch(new PlayerActions.ChangePlayerStatus(PlayerStatus.PAUSED));
    }
  }
}
