import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoPlayerState } from '../../../store/state';
import { getPlayerState } from '../../../store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'video-player-control-time-box',
  templateUrl: './time-box.html',
  styleUrls: ['time-box.scss']
})
export class TimeBoxComponent implements OnInit {

  currentTime: string = '00:00';
  duration: string = '00:00';
  playerState$: Observable<any>;

  constructor(private store: Store<VideoPlayerState>) {}

  ngOnInit(){
    this.playerState$ = this.store.select(getPlayerState);
    this.playerState$.subscribe((data: any) => {
      this.currentTime = this.timeFormat(data.currentTime);
      this.duration = this.timeFormat(data.duration);
    });
  }

  timeFormat(time) {   
      var hrs = ~~(time / 3600);
      var mins = ~~((time % 3600) / 60);
      var secs = ~~time % 60;
      var ret = "";
      if (hrs > 0) {
          ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
      }
      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
  }
}