import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from '../models/video';
import * as VideoListActions from '../actions/video-list';

const videoList: Video[] = [
    {
      index: 0,
      title: 'Video 1',
      src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
    },
    {
      index: 1,
      title: 'Video 2',
      src: 'https://test-streams.mux.dev/test_001/stream.m3u8'
    }
  ];


@Injectable()
export class VideoEffects {
  @Effect()
  fetch$: Observable<Action> = this.actions$.pipe(
    ofType(VideoListActions.FETCH_VIDEO_LIST),
    map(action => ({ type: VideoListActions.SET_VIDEO_LIST, payload: videoList }))
  );

  constructor(private actions$: Actions) {}
}