import { Component, OnInit, OnDestroy } from '@angular/core';
import * as PlayerActions from '../../../store/actions/player.action';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { getPlayerState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../../store/models/player.model';

@Component({
  selector: 'app-video-player-control-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit, OnDestroy {

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
        this.volume = data.muted ? 0 : data.volume;
        this.volumeRedWidth = data.muted ? 0 : 90 * data.volume;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toogleMute() {
    this.store.dispatch(new PlayerActions.ChangeVolumeStatus(!this.muted));
  }

  setVolume(event: any) {
    this.store.dispatch(new PlayerActions.SetVolume(event.target.value));
    if (event.target.value > 0) {
      this.store.dispatch(new PlayerActions.ChangeVolumeStatus(false));
    } else {
      this.store.dispatch(new PlayerActions.ChangeVolumeStatus(true));
    }
  }
}
