import { Component, OnInit } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { getPlayerState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../../store/models/player';

@Component({
  selector: 'video-player-control-volume',
  templateUrl: './volume.html',
  styleUrls: ['./volume.scss']
})
export class VolumeComponent implements OnInit  {

  muted: boolean;
  icon: string;
  volume: number;
  volumeRedWidth: number;
  playerState: Observable<Player>;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.playerState = this.store.select(getPlayerState);
    this.subscription = this.playerState.subscribe(
      (data: Player) => {
        this.muted = data.muted;
        this.icon = data.muted ? 'volume_off' : 'volume_up';
        this.volume = data.volume;
        this.volumeRedWidth = 90*data.volume;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleMute() {
    this.store.dispatch(new PlayerActions.changeVolumeStatus(!this.muted));
  }

  setVolume(event: any) {
    this.store.dispatch(new PlayerActions.setVolume(event.target.value));
    if (event.target.value > 0) {
      this.store.dispatch(new PlayerActions.changeVolumeStatus(false));
    } else {
      this.store.dispatch(new PlayerActions.changeVolumeStatus(true));
    }
  }
}
