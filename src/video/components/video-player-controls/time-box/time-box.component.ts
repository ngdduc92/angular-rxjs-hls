import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { getPlayerState } from '../../../store/reducers';
import { Observable, Subscription } from 'rxjs';
import { Player } from '../../../store/models/player.model';

@Component({
  selector: 'app-video-player-control-time-box',
  templateUrl: './time-box.component.html',
  styleUrls: ['time-box.component.scss']
})
export class TimeBoxComponent implements OnInit, OnDestroy {

  currentTime = '00:00';
  duration = '00:00';
  playerState: Observable<Player>;
  private subscription: Subscription;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit() {
    this.playerState = this.store.select(getPlayerState);
    this.subscription = this.playerState.subscribe(
      (data: Player) => {
        this.currentTime = this.timeFormat(data.currentTime);
        this.duration = this.timeFormat(data.duration);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  timeFormat(time) {
      const hrs = Math.floor(time / 3600);
      const mins = Math.floor((time % 3600) / 60);
      const secs = Math.floor(time % 60);
      let ret = '';
      if (hrs > 0) {
          ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
      }
      ret += '' + mins + ':' + (secs < 10 ? '0' : '');
      ret += '' + secs;
      return ret;
  }
}
