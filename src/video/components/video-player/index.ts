import { Component, OnInit } from '@angular/core';
import * as PlayerActions from '../../store/actions/player';
import { Store } from '@ngrx/store';
import { PlayerStatus } from '../../store/models/player';
import { VideoPlayerState } from '../../store/state';
import { getPlayerState } from '../../store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'video-player',
  templateUrl: './video-player.html',
  styleUrls: ['./video-player.scss']
})
export class VideoPlayerComponent implements OnInit  {

  status: PlayerStatus;
  icon: string;
  playerState: Observable<any>;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit(){
    this.playerState = this.store.select(getPlayerState);
    this.playerState.subscribe((data: any) => {
      this.status = data.status;
      this.icon = data.playIcon;
    });
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
